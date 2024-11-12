from fastapi import FastAPI
from pydantic import BaseModel
from GPTgeneration import get_response


class Message(BaseModel):
    role: str
    content: str

class MessageItem(BaseModel):
    messages: list[dict] | None = None
    prompt: str


app = FastAPI()

@app.post("/prompt")
async def processPrompt(messages: MessageItem):
    prompt = {"role": "user", "content": messages.prompt}
    if messages.messages is None:
        messages.messages = []
    messages.messages.append(prompt)
    return get_response(messages)
