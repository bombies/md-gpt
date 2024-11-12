# MD-GPT Backend

# Initializing the API with Uvicorn

This guide will walk you through the steps to initialize the API using Uvicorn with the command `uvicorn app:app --reload`.

## Prerequisites

Before you get started, make sure you have the following prerequisites installed on your system:

- Python 3.x
- Uvicorn
- FastAPI

## Installation

1. **Clone this repository**:

    ```bash
    git clone https://github.com/bombies/md-gpt-backend.git
    cd md-gpt-backend
    ```

2. **Create a virtual environment** (recommended):

    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows, use: venv\Scripts\activate
    ```

3. **Install dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

## Running the API

Now that you have the project set up, you can run the API using Uvicorn:

```bash
uvicorn app:app --reload
