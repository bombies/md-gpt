from fastapi import FastAPI
from pydantic import BaseModel
from lib.kernelmemory import KernelMemory


class Message(BaseModel):
    role: str
    content: str


class MessageItem(BaseModel):
    messages: list[dict] | None = None
    prompt: str


km = KernelMemory()
app = FastAPI()


@app.post("/prompt")
async def processPrompt(messages: MessageItem):
    answer = km.ask({"question": messages.prompt, "minRelevance": 0.5})
    return answer.json()
