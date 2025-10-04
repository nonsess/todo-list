from fastapi import FastAPI

from src.routers import sign_in_up_routers

app = FastAPI()

app.include_router(sign_in_up_routers.router)

