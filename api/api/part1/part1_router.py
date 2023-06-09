from fastapi import APIRouter
from part1 import part1_impl
router = APIRouter(prefix="/part1")

@router.get("/ox")
async def ox(category,level):
    
    return part1_impl.read_ox_task(category,level)


@router.get("/find-title")
async def find_title(category,level,pattern=None):
    
    return part1_impl.read_find_title_task(category,level,pattern)