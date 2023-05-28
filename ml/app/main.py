from fastapi import FastAPI
from rate_from_json import get_summary

app = FastAPI()

@app.post("/calculate/")
async def calculate(request: dict):
    return get_summary(request)