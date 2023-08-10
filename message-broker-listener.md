# Message Broker Listener

## Описание

Требуется реализовать 2 сервиса и связать их через брокер сообщений.

## Требования

### Технологии:

- Node.js/C#/Go;
- NestJS/ExpressJS/.NET;
- RabbitMQ/Apache Kafka/NATS;
- Docker.

## Задание

Реализовать 2 сервиса Provider и Listener.

Сервисы должны быть объединены одним docker-compose файлом, в нем же должен быть запуск контейнера с брокером.

### Сервисы

#### 1. Provider

<details>
<summary>Описание</summary>

REST API сервис, состоящий из 2-х методов:

##### Методы

|URL|Method|Body|Response|STATUS|
|:-----|:--------|:------|:----------|:----------|
|/tasks|POST|`{"taskId": "id1234", "description": "тестовая задача", "params": {"key1": "123",	"key2": "1234"}}`|\-|201 OK или 400 BAD REQUEST|
|/tasks|GET|\-|`{"tasks": 420}`|200 OK|

###### POST /tasks

Принимает JSON объект. Значения должны быть строго провалидированы.

Метод складывает полученное сообщение в очередь в брокер.

|VALUE|TYPE|RESTRICTIONS|
|:----|:---|:-----------|
|taskId|String|Length <= 60|
|description|String|Length <= 100|
|params\[value\]|String|Length <= 25|

###### GET /tasks

Возвращает единственное число — количество успешно обработанных вызовов `POST /tasks` с момента старта сервиса.

</details>

#### 2. Listener

<details>
<summary>Описание</summary>

Сервис представляет из себя слушателя очереди из первого сервиса. Вычитывая сообщения он выводит их в `stdout`.

</details>
