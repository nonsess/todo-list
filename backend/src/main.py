from fastapi import FastAPI

from routers import sign_in_up_routers

app = FastAPI()

app.include_router(sign_in_up_routers.router)

