from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
class BaseModel:
    id = Column(Integer, primary_key=True, autoincrement=True)

class Task(BaseModel, Base):
    __tablename__ = 'tasks'
    
    title = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='tasks')

class User(BaseModel, Base):
    __tablename__ = 'users'
    
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    access_token = Column(String(255), unique=True, nullable=True)
    refresh_token = Column(String(255), unique=True, nullable=True)
    tasks = relationship('Task', back_populates='user')

