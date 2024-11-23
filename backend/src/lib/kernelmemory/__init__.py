import os
from typing import Dict, Any
from dotenv import load_dotenv
import requests


load_dotenv()


class KernelMemory:
    API_ENDPOINT: str

    def __init__(self) -> None:
        self.API_ENDPOINT = os.environ.get(
            "KERNEL_MEMORY_API_ENDPOINT", "https://localhost:9001"
        )

    def ask(self, body: Dict[str, Any]) -> requests.Response:
        return requests.post(f"{self.API_ENDPOINT}/ask", json=body)
