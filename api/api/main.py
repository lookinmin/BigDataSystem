from fastapi import FastAPI
from part1 import part1_router
from part2 import temp

app = FastAPI()

app.include_router(part1_router.router)
app.include_router(temp.router)