import pymongo, os, json
from pymongo.server_api import ServerApi
from pymongo.collection import Collection
import random


def conn_COLL() -> Collection:
    uri = "mongodb://localhost:27017/"
    client=pymongo.MongoClient(uri, server_api=ServerApi('1'))
    db = client["BDS"]
    coll=db.get_collection("BDS")
    return coll

def read_ox_task(category:str, level:str, keyword=None):
    O_count=random.randint(0,3)
    X_count=3-O_count
    X_query=[
        {
            '$match': {
                'sourceDataInfo.partNum': 'P1',
                'sourceDataInfo.useType': 0, 
                'sourceDataInfo.newsCategory': category, 
                'sourceDataInfo.processLevel': level, 
                'sourceDataInfo.processType': 'A', 
            }
        }, {
            '$sample': {
                'size': X_count
            }
        }, {
            '$project': {
                '_id': 0,  
                'labeledDataInfo.newTitle': 1,
                'sourceDataInfo.newsContent': 1,
            }
        }
    ]
    O_query=[
        {
            '$match': {
                'sourceDataInfo.partNum': 'P1',
                'sourceDataInfo.useType': 1, 
                'sourceDataInfo.newsCategory': category, 
                'sourceDataInfo.processLevel': level, 
            }
        }, {
            '$sample': {
                'size': O_count
            }
        }, {
            '$project': {
                '_id': 0, 
                'labeledDataInfo.newTitle': 1,
                'sourceDataInfo.newsContent': 1,
            }
        }
    ]
    coll=conn_COLL()
    return_data=[]
    for i in coll.aggregate(X_query):
        return_data.append({"answer":"X","task":i})
    for i in coll.aggregate(O_query):
        return_data.append({"answer":"O","task":i})

    return return_data

def read_find_title_task(category:str, level:str, process_pattern:int=None):
    query=[]
    if process_pattern:
        query=[
            {
                '$match': {
                    'sourceDataInfo.partNum': 'P1',
                    'sourceDataInfo.useType': 0, 
                    'sourceDataInfo.newsCategory': category, 
                    'sourceDataInfo.processLevel': level, 
                    'sourceDataInfo.processType': 'D', 
                    'sourceDataInfo.processPattern': str(process_pattern), 
                }
            }, {
                '$sample': {
                    'size': 3
                }
            }, {
                '$project': {
                    '_id': 0,  
                    'sourceDataInfo.newsTitle': 1, 
                    'sourceDataInfo.sentenceCount': 1, 
                    'sourceDataInfo.sentenceInfo': 1, 
                    'labeledDataInfo': 1,
                }
            }
        ]
    else:
        query=[
            {
                '$match': {
                    'sourceDataInfo.partNum': 'P1',
                    'sourceDataInfo.useType': 0, 
                    'sourceDataInfo.newsCategory': category, 
                    'sourceDataInfo.processLevel': level, 
                    'sourceDataInfo.processType': 'D', 
                }
            }, {
                '$sample': {
                    'size': 3
                }
            }, {
                '$project': {
                    '_id': 0,  
                    'sourceDataInfo.newsTitle': 1, 
                    'sourceDataInfo.sentenceCount': 1, 
                    'sourceDataInfo.sentenceInfo': 1, 
                    'labeledDataInfo': 1,
                }
            }
        ]

    coll=conn_COLL()

    return_data=[]
    for i in coll.aggregate(query):
        temp_answer=[]
        for j in i.get("labeledDataInfo").get("referSentenceInfo"):
            if j.get("referSentenceyn")=="Y":
                temp_answer.append(j.get("sentenceNo"))
        return_data.append({"answer":temp_answer,"task":{"sourceDataInfo":i.get("sourceDataInfo"),"newTitle":i.get("labeledDataInfo").get("newTitle")}})

    return return_data