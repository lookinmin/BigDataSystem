import pymongo
from pymongo.server_api import ServerApi
from pymongo.collection import Collection


def conn_COLL() -> Collection:
    uri = "mongodb://localhost:27017/"
    client=pymongo.MongoClient(uri, server_api=ServerApi('1'))
    db = client["BDS"]
    coll=db.get_collection("BDS")
    return coll

def read_statistics():

#카테고리 및 난이도 별 개수
    query1=[
    {
        '$sort': {
            'sourceDataInfo.processLevel': 1,
            'sourceDataInfo.newsCategory': 1, 
        }
    }, {
        '$group': {
            '_id': [
                '$sourceDataInfo.newsCategory', '$sourceDataInfo.processLevel'
            ], 
            'count': {
                '$sum': 1
            }
        }
    }, {
        '$sort': {
            '_id': 1
        }
    }
]

    # 유형 및 패턴 별 개수
    query2=[
    {
        '$match': {
            'sourceDataInfo.useType': 0, 
            'sourceDataInfo.processType': 'D'
        }
    }, {
        '$group': {
            '_id': [
                '$sourceDataInfo.partNum', '$sourceDataInfo.processPattern'
            ], 
            'count': {
                '$sum': 1
            }
        }
    }, {
        '$sort': {
            '_id': 1
        }
    }
]
    
    coll=conn_COLL()
    return_data=[]
    CL_data=[]
    temp_dic={}
    for idx,value in enumerate(coll.aggregate(query1),1):
        if idx%3==0:
            temp_dic[value.get("_id")[1]]=value.get("count")
            CL_data.append({"key":value.get("_id")[0],"value":temp_dic})
            temp_dic={}
        else:
            temp_dic[value.get("_id")[1]]=value.get("count")

    temp_dic=[{"key":"제목과 본문의 불일치 기사","value":{}},{"key":"본문의 도메인 일관성 부족 기사","value":{}}]
    for i in coll.aggregate(query2):
        id=i.get("_id")
        if id[0]=="P1":
            if id[1]=="11":
                temp_dic[0]["value"]["의문 유발형(부호)"]=i.get("count")
            elif id[1]=="12":
                temp_dic[0]["value"]["의문 유발형(은닉)"]=i.get("count")
            elif id[1]=="13":
                temp_dic[0]["value"]["선정표현 사용형"]=i.get("count")
            elif id[1]=="14":
                temp_dic[0]["value"]["속어/줄임말 사용형"]=i.get("count")
            elif id[1]=="15":
                temp_dic[0]["value"]["사실 과대 표현형"]=i.get("count")
            elif id[1]=="16":
                temp_dic[0]["value"]["의도적 주어 왜곡형"]=i.get("count")
        else:
            if id[1]=="21":
                temp_dic[1]["value"]["상품 판매정보 노출 광고형"]=i.get("count")
            elif id[1]=="22":
                temp_dic[1]["value"]["부동산 판매정보 노출 광고형"]=i.get("count")
            elif id[1]=="23":
                temp_dic[1]["value"]["서비스 판매정보 노출 광고형"]=i.get("count")
            elif id[1]=="24":
                temp_dic[1]["value"]["의도적 상황 왜곡/전환형"]=i.get("count")
    return_data.append({"CL_count":CL_data,"TP_count":temp_dic})

    return return_data