from fastapi import FastAPI
from part1 import OX
from part2 import temp

app = FastAPI()

app.include_router(OX.router)
app.include_router(temp.router)