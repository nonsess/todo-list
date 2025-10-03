from psycopg import connect
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql+psycopg://sashamac:qwerty@localhost:5432/todo_app")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_connection():
    conn = connect(
        dbname="todo_app",
        user="USERNAME",
        password="PASSWORD",
        host="HOST",
        port="PORT"
    )
    return conn

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
