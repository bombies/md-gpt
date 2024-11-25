from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from kernelmemory import kernelmemory
from dotenv import load_dotenv
import os


class Message(BaseModel):
    role: str
    content: str


class MessageItem(BaseModel):
    messages: list[dict] | None = None
    prompt: str


load_dotenv()

origins = os.environ.get("ALLOWED_ORIGINS", "").split(",")

km = kernelmemory.KernelMemory()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/prompt")
async def processPrompt(messages: MessageItem):
    answer = km.ask({"question": messages.prompt, "minRelevance": 0.5})
    return answer.json()
