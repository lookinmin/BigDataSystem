from fastapi import APIRouter

router = APIRouter(prefix="/part2/문제이름")

@router.get("/")
async def root():
    return {"message": "Hello World"}