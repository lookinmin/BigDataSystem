from fastapi import FastAPI
from part1 import part1_router
from fastapi.middleware.cors import CORSMiddleware
from part2 import part2_router

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(part1_router.router)
app.include_router(part2_router.router)