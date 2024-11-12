import jsonlines
import json
import os

jsondatapath = "../data/new_data.jsonl"
data_path = "../data/new_data.json"

def convertor():
    if os.path.isfile(jsondatapath):
        exit(0)
    else:
        with open(data_path, 'r', encoding='utf-8') as f:
            dataset = json.loads(f.read())

        with open("../data/new_data.jsonl", 'wb') as f:
            writer = jsonlines.Writer(f)
            writer.write_all(dataset)
            writer.close
