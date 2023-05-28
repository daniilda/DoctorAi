import pandas as pd
import json
from sklearn.metrics import fbeta_score
from sklearn.metrics import f1_score

DATA = 'data'
desease = pd.read_csv(f'{DATA}/sintetic_deseases.csv', delimiter=';')  # sasha directory
desease = desease[desease['Column1'] != 'Болезнь']
desease = desease.rename(columns={
    'Column1': 'Диагноз',
    'Column2': 'Направление',
    'Column3': 'Обязательность',
    'Column4': 'Врач'
})
desease = desease[desease['Обязательность'].isin(('Обязательно', 'По показанию'))]


def format_doctor_name(doctor_name):
    if 'Врач-' in doctor_name:
        subsample = doctor_name.split('-')[1]
        subsample = subsample[0].upper() + subsample[1:]
        return subsample
    elif doctor_name == 'ЛОР-врач':
        return 'Отоларинголог'
    else:
        return doctor_name


desease['Врач'] = desease['Врач'].map(format_doctor_name)
doctors_freq = {}
for i in desease['Врач'].unique():
    doctors_freq[i] = {'n': desease[desease['Врач'] == i].shape[0],
                       'ids': []
                       }


def transform_pandas_to_json(visits):
    input_json = {}
    doctor_ids = list(visits['doctor_id'].unique())
    clients_ids = list(visits['client_id'].unique())
    input_json['doctors_ids'] = doctor_ids
    visits['doctors_and_clients'] = visits[['doctor_id', 'client_id']].apply(tuple, axis=1)
    doctors_and_clients = list(visits['doctors_and_clients'])
    input_json['doctors_to_client'] = {}
    for i in doctors_and_clients:
        input_json['doctors_to_client'][i[0]] = i[1]
    input_json['clients'] = {}
    for i in clients_ids:
        input_json['clients'][i] = {}
        desease_name = list(visits[visits['client_id'] == i]['Диагноз'])[0]
        input_json['clients'][i]['desease'] = desease_name
        mandatory_yes = list(visits[visits['client_id'] == i][visits['Обязательность'] == 'Обязательно']['Направление'])
        mandatory_no = list(visits[visits['client_id'] == i][visits['Обязательность'] == 'По показанию']['Направление'])
        input_json['clients'][i]['referrals'] = {}
        input_json['clients'][i]['referrals']['По показанию'] = mandatory_no
        input_json['clients'][i]['referrals']['Обязательно'] = mandatory_yes
    return input_json


def get_summary(input_example: dict) -> dict:
    output_example = {}
    unique_ids = input_example['doctors_ids']
    doctor_stats = {}
    referrals_info = {}
    for doctor_id in unique_ids:
        test_doctor = input_example['clients'][input_example['doctors_to_client'][doctor_id]]
        nesses = test_doctor['referrals']['По показанию']
        unnesses = test_doctor['referrals']['Обязательно']

        y_true_nesses = [0] * len(desease)
        y_pred_nesses = [0] * len(desease)
        y_true_unnesses = [0] * len(desease)
        y_pred_unnesses = [0] * len(desease)

        # заполнение y_true_nesses
        for i in range(len(desease)):
            if test_doctor['desease'] == desease['Диагноз'].iloc[i] and desease['Обязательность'].iloc[
                i] == 'Обязательно':
                y_true_nesses[i] = 1

        # заполнение y_pred_nesses
        for i in range(len(desease)):
            for k in range(len(nesses)):
                if test_doctor['desease'] == desease['Диагноз'].iloc[i] and nesses[k] == desease['Направление'].iloc[i]:
                    # print(desease['Диагноз'].iloc[i], desease['Направление'].iloc[i])
                    y_pred_nesses[i] = 1

        # заполнение y_true_unnesses
        for i in range(len(desease)):
            if test_doctor['desease'] == desease['Диагноз'].iloc[i] and desease['Обязательность'].iloc[
                i] == 'По показанию':
                y_true_unnesses[i] = 1

        # заполнение y_pred_unnesses
        for i in range(len(desease)):
            for k in range(len(unnesses)):
                if test_doctor['desease'] == desease['Диагноз'].iloc[i] and unnesses[k] == desease['Направление'].iloc[
                    i]:
                    # print(desease['Диагноз'].iloc[i], desease['Направление'].iloc[i])
                    y_pred_nesses[i] = 1

        nesses_score = fbeta_score(y_true_nesses, y_pred_nesses, average='macro', beta=2)
        unnesses_score = fbeta_score(y_true_unnesses, y_pred_unnesses, average='micro', beta=0.5)
        SCORE = (5 * nesses_score + unnesses_score) / 6 * 100
        doctor_stats[doctor_id] = SCORE

        cur_info = {1: [], 2: [], 3: []}

        for i in range(len(desease)):
            if ((y_pred_nesses[i] == 1 and y_true_nesses[i] == 1) or (
                    y_pred_unnesses[i] == 1 and y_true_unnesses[i] == 1)):
                cur_info[1].append(desease['Направление'].iloc[i])
            elif y_pred_nesses[i] < y_true_nesses[i] or y_pred_unnesses[i] < y_true_unnesses[i]:
                cur_info[2].append(desease['Направление'].iloc[i])
            elif y_pred_nesses[i] > y_true_nesses[i] or y_pred_unnesses[i] > y_true_unnesses[i]:
                cur_info[3].append(desease['Направление'].iloc[i])

        referrals_info[input_example['doctors_to_client'][doctor_id]] = cur_info

    output = {'ouput_rates': doctor_stats, 'referrals_info': referrals_info}
    return output


from sklearn.metrics import fbeta_score


def get_summary_new(input_example: dict) -> dict:
    output_example = {}
    unique_ids = input_example['doctors_ids']
    doctor_stats = {}
    referrals_info = {}

    print('test')
    for doctor_id in unique_ids:
        test_doctors = input_example['doctors_to_client'][doctor_id]
        cur_info = {1: [], 2: [], 3: []}
        y_true_nesses = [0] * len(desease)
        y_pred_nesses = [0] * len(desease)
        y_true_unnesses = [0] * len(desease)
        y_pred_unnesses = [0] * len(desease)

        for client_id in test_doctors:
            client = input_example['clients'][client_id]
            nesses = client['referrals']['По показанию']
            unnesses = client['referrals']['Обязательно']

            # Заполнение y_true_nesses
            for i in range(len(desease)):
                if client['desease'] == desease['Диагноз'].iloc[i] and desease['Обязательность'].iloc[
                    i] == 'Обязательно':
                    y_true_nesses[i] = 1

            # Заполнение y_pred_nesses
            for i in range(len(desease)):
                for k in range(len(nesses)):
                    if client['desease'] == desease['Диагноз'].iloc[i] and nesses[k] == desease['Направление'].iloc[i]:
                        y_pred_nesses[i] = 1

            # Заполнение y_true_unnesses
            for i in range(len(desease)):
                if client['desease'] == desease['Диагноз'].iloc[i] and desease['Обязательность'].iloc[
                    i] == 'По показанию':
                    y_true_unnesses[i] = 1

            # Заполнение y_pred_unnesses
            for i in range(len(desease)):
                for k in range(len(unnesses)):
                    if client['desease'] == desease['Диагноз'].iloc[i] and unnesses[k] == desease['Направление'].iloc[
                        i]:
                        y_pred_nesses[i] = 1

        nesses_score = fbeta_score(y_true_nesses, y_pred_nesses, average='macro', beta=2)
        unnesses_score = fbeta_score(y_true_unnesses, y_pred_unnesses, average='micro', beta=0.5)
        SCORE = (5 * nesses_score + unnesses_score) / 6 * 100
        doctor_stats[doctor_id] = SCORE

        for i in range(len(desease)):
            if (y_pred_nesses[i] == 1 and y_true_nesses[i] == 1) or (
                    y_pred_unnesses[i] == 1 and y_true_unnesses[i] == 1):
                cur_info[1].append(desease['Направление'].iloc[i])
            elif y_pred_nesses[i] < y_true_nesses[i] or y_pred_unnesses[i] < y_true_unnesses[i]:
                cur_info[2].append(desease['Направление'].iloc[i])
            elif y_pred_nesses[i] > y_true_nesses[i] or y_pred_unnesses[i] > y_true_unnesses[i]:
                cur_info[3].append(desease['Направление'].iloc[i])

        referrals_info[doctor_id] = cur_info

    output = {'output_rates': doctor_stats, 'referrals_info': referrals_info}
    return output
