from fastapi import FastAPI
from part1 import OX
from part2 import strangeSentence

app = FastAPI()

app.include_router(OX.router)
app.include_router(strangeSentence.router)