from fastapi import APIRouter
from search import search_impl

router = APIRouter(prefix="/search")


@router.get("/showResult")
async def showResult(searchWord: str):
    return search_impl.read_showResult_task(searchWord)
