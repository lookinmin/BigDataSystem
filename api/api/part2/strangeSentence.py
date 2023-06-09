from fastapi import APIRouter
from pymongo import MongoClient

router = APIRouter(prefix="/part2/strangeSentence")


@router.get("/")
async def root():
    client = MongoClient("mongodb://localhost:27017")
    db = client["BDS"]
    collection = db["BDS"]
    list_results = []

    query = [
        {
            "$match": {
                "sourceDataInfo.newsCategory": "경제",
                "sourceDataInfo.processLevel": "하",
                "sourceDataInfo.partNum": "P2",
            }
        },
        {"$sample": {"size": 3}},
        {
            "$project": {
                "_id": 0,
                "sourceDataInfo.newsTitle": 1,
                "labeledDataInfo.processSentenceInfo": 1,
            }
        },
    ]

    results = collection.aggregate(query)
    for result in results:
        list_results.append(result)

    return list_results
