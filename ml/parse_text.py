import re

# Text for analysis
text = "Пациент Борискин Александр Алексеевич, дата посещения 22.05.2023 диагноз Коклюш анализы на сдачу: КТ легких, анализ крови, анализ мочи, врачи: аллерголог-иммунолог"
def extract(text:str) -> dict:
    info = {}
    # Extracting name using regular expression
    name_match = re.search(r"Пациент\s+([^,]+)", text)
    if name_match:
        name = name_match.group(1)
        info["ФИО пациента:"] = name
        #print("ФИО пациента:", name)

    # Extracting date using regular expression
    date_match = re.search(r"дата посещения\s+(\d{2}.\d{2}.\d{4})", text)
    if date_match:
        date = date_match.group(1)
        info["Дата посещения:"] = date
        #print("Дата посещения:", date)

    # Extracting diagnosis using regular expression
    diagnosis_match = re.search(r"диагноз\s+(.*?)(?:анализы на сдачу|врачи:)", text)
    if diagnosis_match:
        diagnosis = diagnosis_match.group(1)
        info["Диагноз:"] = diagnosis.strip()
        #print("Диагноз:", diagnosis.strip())

    # Extracting analyses using regular expression
    analyses_match = re.search(r"анализы на сдачу:\s+(.*?)(?:врачи:|$)", text)
    if analyses_match:
        analyses = analyses_match.group(1)
        analyses_list = [analysis.strip() for analysis in analyses.split(",")]
        info["Анализы на сдачу:"] = analyses_list
        #print("Анализы на сдачу:", analyses_list)

    # Extracting doctors using regular expression
    doctors_match = re.search(r"врачи:\s+(.*)", text)
    if doctors_match:
        doctors = doctors_match.group(1)
        doctors_list = [doctor.strip() for doctor in doctors.split(",")]
        info["Врачи:"] = doctors_list
        #print("Врачи:", doctors_list)

    return info
