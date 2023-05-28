# DocTracker Документация

## Демо доступы
* Demo user: `housemd` / `housemd`
* API Demo Swagger: http://api.doctracker.txcd.xyz/swagger/index.html
* UI Demo: https://doctracker.txcd.xyz/dashboard
* Analytics API Demo: http://analytics.doctracker.txcd.xyz/

## Single Deploy
1. Необходимо предварительно установить [Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04) и [Docker Compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)
2. Произвести клонирование репозитория на машину `git clone https://github.com/daniilda/DoctorAi.git`
3. Заполнить [.env файл](.env) (решению необходимо облачное хранилище, которое невозможно поднять локально)
   1. `S3_ADDRESS` Адрес S3 провайдера
   2. `S3_BUCKET` Имя бакета в S3 хранилище
   3. `S3_ACCESS` Ключ доступа
   4. `S3_SECRET` "Секретный ключ"
4. `docker-compose up -d`

## Scale Deploy (3 Хост Машины)
### Analytics API Deploy
1. Необходимо предварительно установить [Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
2. Произвести клонирование репозитория на машину `git clone https://github.com/daniilda/DoctorAi.git`
3. TBD