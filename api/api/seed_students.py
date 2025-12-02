# api/seed_students.py
import pandas as pd
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base, Student
import os

DATABASE_URL = os.environ.get("DATABASE_URL")  # ensure this is set
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

def parse_possible_dob(val):
    if not val or (isinstance(val, float) and pd.isna(val)):
        return None
    try:
        # try pandas convenience (handles many formats)
        dt = pd.to_datetime(val, dayfirst=True, errors="coerce")
        if pd.isna(dt):
            # maybe it's just a 4-digit year
            s = str(val).strip()
            if re.fullmatch(r'\d{4}', s):
                y = int(s)
                return datetime(y, 1, 1).date()
            return None
        return dt.date()
    except Exception:
        try:
            s = str(val).strip()
            if len(s) == 4 and s.isdigit():
                y = int(s)
                return datetime(y, 1, 1).date()
        except:
            return None
    return None

def seed(csv_path="data/random_aadhaar_data.csv"):
    Base.metadata.create_all(bind=engine)
    df = pd.read_csv(csv_path)
    # make sure col names:
    if 'Aadhaar_Number' in df.columns:
        df = df.rename(columns={'Aadhaar_Number': 'identification_number'})

    session = SessionLocal()
    added = 0
    for idx, row in df.iterrows():
        aadhaar = str(row.get('identification_number', '')).strip()
        if not aadhaar or aadhaar.lower() in ("nan", ""):
            continue
        aadhaar = re.sub(r'\D', '', aadhaar)
        if len(aadhaar) != 12:
            continue
        name = row.get('Name') or row.get('name') or None
        email = row.get('Email') if 'Email' in row else None
        dob = None
        if 'DOB' in row:
            dob = parse_possible_dob(row['DOB'])
        # skip if already exists
        existing = session.query(Student).filter_by(identification_number=aadhaar).first()
        if existing:
            continue
        student = Student(
            name=name,
            email=email,
            identification_number=aadhaar,
            date_of_birth=dob
        )
        session.add(student)
        added += 1
    session.commit()
    session.close()
    print(f"Seeded {added} students.")

if __name__ == "__main__":
    seed()
