import pymongo
from pymongo.server_api import ServerApi
from pymongo.collection import Collection


def conn_COLL() -> Collection:
    uri = "mongodb://localhost:27017/"
    client = pymongo.MongoClient(uri, server_api=ServerApi("1"))
    db = client["BDS"]
    coll = db.get_collection("BDS")
    return coll


def read_showResult_task(searchWord: str):
    query = [
        {
            "$match": {
                "sourceDataInfo.newsContent": {"$regex": searchWord},
            }
        },
        {"$sample": {"size": 1}},
        {
            "$project": {
                "_id": 0,
                "sourceDataInfo.newsTitle": 1,
                "sourceDataInfo.newsContent": 1,
                "sourceDataInfo.useType": 1,
            }
        },
    ]

    coll = conn_COLL()
    return_data = []
    for i in coll.aggregate(query):
        temp_answer = i.get("sourceDataInfo").get("useType")
        return_data.append(
            {
                "answer_sentence": temp_answer,
                "task": {
                    "newsTitle": i.get("sourceDataInfo").get("newsTitle"),
                    "newsContent": i.get("sourceDataInfo").get("newsContent"),
                },
            }
        )

    return return_data
