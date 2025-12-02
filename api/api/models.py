# api/models.py
import uuid
from datetime import datetime, date
from sqlalchemy import (
    Column, String, DateTime, Date, func, ForeignKey, Boolean
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Student(Base):
    __tablename__ = "students"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    identification_number = Column(String(12), unique=True, nullable=False)  # Aadhaar 12-digit
    date_of_birth = Column(Date, nullable=True)  # new column
    extra = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # if you want relationships to other tables, add here


class User(Base):
    """
    Portal user model — adapt fields to your auth system.
    """
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id"), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", backref="users")

