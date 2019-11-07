from pymongo import MongoClient
from bson.objectid import ObjectId


mongo = MongoClient().dariah

crit = {
    "_id": {
        "$in": [
            ObjectId("5a1690a32179c013250d932a"),
            ObjectId("000000001aca857b5500011f"),
        ]
    }
}
# crit = {}

result = mongo.contrib.aggregate(
    [
        {"$match": crit},
        {
            "$lookup": {
                "from": "workflow",
                "localField": "_id",
                "foreignField": "_id",
                "as": "workflow",
            }
        },
        {
            "$project": {
                "title": True,
                "score": {"$arrayElemAt": ["$workflow.assessment.score.overall", 0]},
                "cStage": {"$arrayElemAt": ["$workflow.stage", 0]},
                "aStage": {"$arrayElemAt": ["$workflow.assessment.stage", 0]},
                "rStage": {
                    "$arrayElemAt": ["$workflow.assessment.reviews.final.stage", 0]
                },
            }
        },
    ]
)

for r in result:
    print(r)
