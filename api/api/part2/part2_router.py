from fastapi import APIRouter
from part2 import part2_impl

router = APIRouter(prefix="/part2")


@router.get("/strangeSentence")
async def strangeSentence(category, level):
    return part2_impl.read_strangeSentence_task(category, level)


@router.get("/pattern")
async def pattern(category, level):
    return part2_impl.read_pattern_task(category, level)
