from fastapi import APIRouter, HTTPException, Body
from backend.api.core.data_store import register_user, authenticate_user

router = APIRouter()

@router.post("/signup")
async def signup(name: str = Body(...), email: str = Body(...), password: str = Body(...)):
    user = register_user(name, email, password)
    if not user:
        raise HTTPException(status_code=400, detail="Account already exists with this identity.")
    return user

@router.post("/login")
async def login(email: str = Body(...), password: str = Body(...)):
    user = authenticate_user(email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials for this node.")
    return user
