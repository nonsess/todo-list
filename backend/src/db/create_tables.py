# filepath: /Users/aleksandr/VS/CU_Hack/todo-list/backend/src/create_tables.py
from get_connection import engine
from models import Base

Base.metadata.create_all(bind=engine)