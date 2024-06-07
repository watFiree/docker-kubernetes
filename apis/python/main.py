from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)

mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017/')
mongo_db_name = os.getenv('DB_NAME', 'database')
port_number = os.getenv('PORT_NUMBER', 80)

# Connect to MongoDB
client = MongoClient(mongo_url)
db = client[mongo_db_name]
collection = db["products"]

@app.route('/create', methods=['POST'])
def create():
    data = request.json
    result = collection.insert_one(data)

    return jsonify(str(result.inserted_id)), 201

@app.route('/read_all', methods=['GET'])
def get_all_products():
    products = collection.find({})
    result = []

    for product in products:
        product['_id'] = str(product['_id'])
        result.append(product)

    return jsonify(result), 200

@app.route('/read/<id>', methods=['GET'])
def read(id):
    product = collection.find_one({"_id": ObjectId(id)})
    if product:
        product["_id"] = str(product["_id"])
        return jsonify(product)
    else:
        return jsonify({"error": "Document not found"}), 404

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    result = collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count > 0:
        return jsonify({"success": True}), 200
    else:
        return jsonify({"error": "No document deleted"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
