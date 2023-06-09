from fastapi import FastAPI
from rate_from_json import get_summary_new

app = FastAPI()

@app.post("/calculate")
async def calculate(request: dict):
    return get_summary_new(request)