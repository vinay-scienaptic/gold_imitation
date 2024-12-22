import pymongo


conn_details = {
    "mongo_host": "mongodb+srv://vstirumalaarts:vstirumalaarts@vstirumalaarts.9sztb.mongodb.net/",
    "db_name": "vstirumalaarts",
    "collection_name": "bracelets"
}



def mongo_fetch_record_one(conn_details):
    client = pymongo.MongoClient(conn_details['mongo_host'])
    db = client[conn_details['db_name']]
    col = db[conn_details['collection_name']]
    first_rec = col.find_one()
    

    return first_rec

record = mongo_fetch_record_one(conn_details)

file_loc= record['FileLocation']

# print(record['FileLocation'])