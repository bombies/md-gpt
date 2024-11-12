import json

def transform():
	path = "data.json"
	file = open(path, "rb")
	json_file = json.load(file)
	file.close()

	new_data = []
	for object in json_file:
		messages = []
		
		system_msg = {
			"role": "system",
			"content": object["instruction"],
		}
		user_msg = {
			"role": "user",
			"content": object["input"]
		}
		assistant_msg = {
			"role": "assistant",
			"content": object["output"]
		}
		messages.append(system_msg)
		messages.append(user_msg)
		messages.append(assistant_msg)

		new_data.append({"messages": messages})
	
	new_data_json = json.dumps(new_data)
	new_data_file = open("new_data.json", "w")
	new_data_file.write(new_data_json)


def __main__():
	transform()

__main__()
