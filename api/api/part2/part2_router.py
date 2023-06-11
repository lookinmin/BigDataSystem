from fastapi import APIRouter
from part2 import part2_impl

router = APIRouter(prefix="/part2")


@router.get("/strangeSentence")
async def strangeSentence(category: int, level: int):
    temp_category = ""
    if category == 1:
        temp_category = "경제"
    elif category == 2:
        temp_category = "연예"
    elif category == 3:
        temp_category = "세계"
    elif category == 4:
        temp_category = "IT&과학"
    elif category == 5:
        temp_category = "생활&문화"
    elif category == 6:
        temp_category = "정치"
    elif category == 7:
        temp_category = "사회"

    temp_level = ""
    if level == 1:
        temp_level = "하"
    elif level == 2:
        temp_level = "중"
    elif level == 3:
        temp_level = "상"
    return part2_impl.read_strangeSentence_task(temp_category, temp_level)


@router.get("/pattern")
async def pattern(category: int, level: int):
    temp_category = ""
    if category == 1:
        temp_category = "경제"
    elif category == 2:
        temp_category = "연예"
    elif category == 3:
        temp_category = "세계"
    elif category == 4:
        temp_category = "IT&과학"
    elif category == 5:
        temp_category = "생활&문화"
    elif category == 6:
        temp_category = "정치"
    elif category == 7:
        temp_category = "사회"

    temp_level = ""
    if level == 1:
        temp_level = "하"
    elif level == 2:
        temp_level = "중"
    elif level == 3:
        temp_level = "상"
    return part2_impl.read_pattern_task(temp_category, temp_level)
