from fastapi import APIRouter
from graph import graph_impl
router = APIRouter(prefix="/graph")

@router.get("/statistics")
async def read_statistics():
    return graph_impl.read_statistics()