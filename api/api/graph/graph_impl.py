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
            'fieldN': {
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
    TP_data=[]
    for i in coll.aggregate(query1):
        CL_data.append(i)
    for i in coll.aggregate(query2):
        TP_data.append(i)
    return_data.append({"CL_count":CL_data,"TP_count":TP_data})

    return return_data