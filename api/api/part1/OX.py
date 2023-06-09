from fastapi import APIRouter

router = APIRouter(prefix="/part1/ox")

@router.get("/")
async def root():
    return {"message": "Hello World"}