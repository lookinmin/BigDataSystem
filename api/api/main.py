from fastapi import FastAPI
from part1 import OX

app = FastAPI()

app.include_router(OX.router)