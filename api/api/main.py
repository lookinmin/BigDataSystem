from fastapi import FastAPI
from part1 import part1_router
from part2 import strangeSentence

app = FastAPI()

app.include_router(part1_router.router)
app.include_router(strangeSentence.router)