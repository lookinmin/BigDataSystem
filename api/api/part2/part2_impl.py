import pymongo
from pymongo.server_api import ServerApi
from pymongo.collection import Collection


def conn_COLL() -> Collection:
    uri = "mongodb://localhost:27017/"
    client = pymongo.MongoClient(uri, server_api=ServerApi("1"))
    db = client["BDS"]
    coll = db.get_collection("BDS")
    return coll


def read_strangeSentence_task(category: str, level: str):
    query = [
        {
            "$match": {
                "sourceDataInfo.partNum": "P2",
                "sourceDataInfo.newsCategory": category,
                "sourceDataInfo.processLevel": level,
            }
        },
        {"$sample": {"size": 2}},
        {
            "$project": {
                "_id": 0,
                "sourceDataInfo.newsTitle": 1,
                "sourceDataInfo.newsContent": 1,
                "labeledDataInfo": 1,
            }
        },
    ]

    coll = conn_COLL()
    return_data = []
    for i in coll.aggregate(query):
        temp_answer = []
        for j in i.get("labeledDataInfo").get("processSentenceInfo"):
            if j.get("subjectConsistencyYn") == "N":
                temp_answer.append(j)
        return_data.append(
            {
                "answer_count": len(temp_answer),
                "answer_sentence": temp_answer,
                "task": {
                    "newsTitle": i.get("sourceDataInfo").get("newsTitle"),
                    "newsContent": i.get("sourceDataInfo").get("newsContent"),
                    "choicePassage": i.get("labeledDataInfo").get(
                        "processSentenceInfo"
                    ),
                },
            }
        )

    return return_data


def read_pattern_task(category: str, level: str):
    query = []
    query = [
        {
            "$match": {
                "sourceDataInfo.partNum": "P2",
                "sourceDataInfo.useType": 0,
                "sourceDataInfo.newsCategory": category,
                "sourceDataInfo.processLevel": level,
                "sourceDataInfo.processType": "D",
            }
        },
        {"$sample": {"size": 2}},
        {
            "$project": {
                "_id": 0,
                "sourceDataInfo.newsTitle": 1,
                "sourceDataInfo.newsContent": 1,
                "labeledDataInfo": 1,
            }
        },
    ]

    coll = conn_COLL()
    return_data = []
    for i in coll.aggregate(query):
        return_data.append(
            {
                "task": {
                    "processPattern": i.get("sourceDataInfo").get("processPattern"),
                    "newsTitle": i.get("sourceDataInfo").get("newsTitle"),
                    "newsContent": i.get("sourceDataInfo").get("newsContent"),
                },
            }
        )

    return return_data
