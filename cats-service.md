# Cats Service

## Описание



## Требования

- Для выполнения задания нужен PostgreSQL.
- Стартовые данные взять [тут](./cats-service-init.sql).

### Технологии:

- Node.js/C#/Go;
- NestJS/.NET;
- PostgreSQL;
- Docker.

### Ссылки:

- Документация PostgreSQL: https://postgrespro.ru/docs/postgresql/11/index.


## Задание

Подключившись к базе, вы можете изучить имеющиеся там таблицы и данные:

<details>
<summary>Данные</summary>

```bash
wg_forge_backend=# \d
              List of relations
 Schema |      Name       | Type  |  Owner
--------+-----------------+-------+----------
 public | cat_colors_info | table | postgres
 public | cats            | table | postgres
 public | cats_stat       | table | postgres
(3 rows)

wg_forge_backend=# select * from cats limit 2;
 name  |     color     | tail_length | whiskers_length
-------+---------------+-------------+-----------------
 Tihon | red & white   |          15 |              12
 Marfa | black & white |          13 |              11
(2 rows)
```

</details>

### 1. Наполнение cat_colors_info

<details>
<summary>Описание</summary>

В базе данных есть таблица **cats** с такой схемой:
```bash
Table "public.cats"
     Column      |       Type
-----------------+-------------------
 name            | character varying
 color           | cat_color
 tail_length     | integer
 whiskers_length | integer
```

И она заполнена некоторыми данными, примерно такими:
```bash
 name  |     color     | tail_length | whiskers_length
-------+---------------+-------------+-----------------
 Tihon | red & white   |          15 |              12
 Marfa | black & white |          13 |              11
```

Про котов мы знаем некоторую важную информацию, например имя, цвет, длину хвоста и усов.

Цвет котов определен как перечисляемый тип данных:
```sql
CREATE TYPE cat_color AS ENUM (
    'black',
    'white',
    'black & white',
    'red',
    'red & white',
    'red & black & white'
);
```

Нужно выяснить, сколько котов каждого цвета есть в базe и записать эту информацию в таблицу **cat_colors_info**:
```bash
Table "public.cat_colors_info"
 Column |   Type
--------+-----------
 color  | cat_color
 count  | integer
Indexes:
    "cat_colors_info_color_key" UNIQUE CONSTRAINT, btree (color)
```

Должно получиться примерно так:
```bash
        color        | count
---------------------+-------
 black & white       |    1
 red & white         |    1
```

</details>

### 2. Вычисление статистических данных

<details>
<summary>Описание</summary>

Продолжим анализ наших котов.

Нужно вычислить некоторые статистические данные о котах:
- средняя длина хвоста;
- медиана длин хвостов;
- мода длин хвостов;
- средняя длина усов;
- медиана длин усов;
- мода длин усов.

И сохранить эту информацию в таблицу **cats_stat**:
```bash
Table "public.cats_stat"
         Column         |   Type
------------------------+-----------
 tail_length_mean       | numeric
 tail_length_median     | numeric
 tail_length_mode       | integer[]
 whiskers_length_mean   | numeric
 whiskers_length_median | numeric
 whiskers_length_mode   | integer[]
```

Должно получиться примерно так:
```bash
 tail_length_mean | tail_length_median | tail_length_mode
------------------+--------------------+------------------
             14.0 |               14.0 | {13,15}
 whiskers_length_mean | whiskers_length_median | whiskers_length_mode
----------------------+------------------------+----------------------
                 11.5 |                   11.5 | {11,12}
```

Если вы не знаете, что такое среднее значение (mean), медиана (median) и мода (mode), вы без труда найдете информацию об этих базовых величинах статистики в интернете.

</details>

### 3. HTTP Сервис

<details>
<summary>Описание</summary>

Хорошо иметь данные, но еще лучше иметь сервис, который с этими данными работает. Нам понадобится HTTP API.

Для начала нужно реализовать метод ping.

Напишите программу, которая будет работать как веб-сервер на порту 3000. И на запрос:
```bash
curl -X GET http://localhost:3000/ping
```

будет отвечать строкой:
```bash
"Cats Service. Version 0.1"
```

</details>

### 4. HTTP Сервис | Получение данных

<details>
<summary>Описание</summary>

Теперь нужен метод для получения списка котов. На запрос:
```bash
curl -X GET http://localhost:3000/cats
```

Должен возвращаться список котов в формате JSON:
```bash
[
  {"name": "Tihon", "color": "red & white", "tail_length": 15, "whiskers_length": 12},
  {"name": "Marfa", "color": "black & white", "tail_length": 13, "whiskers_length": 11}
]
```

Должна работать сортировка по заданному атрибуту, по возрастанию или убыванию:
```bash
curl -X GET http://localhost:3000/cats?attribute=name&order=asc
curl -X GET http://localhost:3000/cats?attribute=tail_length&order=desc
```

Так же клиент должен иметь возможность запросить подмножество данных, указав offset и limit:
```bash
curl -X GET http://localhost:3000/cats?offset=10&limit=10
```

Разумеется, клиент может указать и сортировку, и лимит одновременно:
```bash
curl -X GET http://localhost:3000/cats?attribute=color&order=asc&offset=5&limit=2
```

Подумайте, что должен возвращать сервер, если указан несуществующий атрибут? Неправильный order? Offset больший, чем имеется данных в базе? Какие еще могут быть варианты невалидных запросов?

Обработайте такие запросы так, как считаете правильным.

В этом задании не лишними будут юнит-тесты, проверяющие, что ваша программа корректно обрабатывает валидные и невалидные входящие данные.

</details>

### 5. HTTP Сервис | Прием данных

<details>
<summary>Описание</summary>

Конечно, наш сервис должен поддерживать добавление новых котов.

Запрос на добавление выглядит так:
```bash
curl -X POST http://localhost:3000/cat \
-d "{\"name\": \"Tihon\", \"color\": \"red & white\", \"tail_length\": 15, \"whiskers_length\": 12}"
```

Получив такой запрос сервис должен сохранить в базе нового кота.

Здесь тоже может быть много интересных ситуаций. Что, если кот с указнным именем уже есть в базе? А если длина хвоста задана как отрицательное число? Или это вообще не число? А если данные не являются валидным JSON-объектом?

Подумайте, какие еще возможны ситуации. Обработайте их так, как считаете правильным. Не забудьте про юнит-тесты.

</details>

### 6. HTTP Сервис | Обслуживание

<details>
<summary>Описание</summary>

Хороший сервис должен быть готов к нештатным ситуациям. Допустим, некая группа клиентов случайно или намеренно посылает больше запросов к сервису, чем сервис может обслужить.

Если сервис будет пытаться обслужить все запросы, то в какой-то момент он упадет. Но умный сервис знает свои возможности и работает в их пределах. Лишние запросы сервис должен отвергать.

У сервиса должна быть настройка, какое количество запросов он может обслужить. Допустим, это будет 600 запросов в минуту. Если количество запросов от клиентов превышает этот лимит, то часть запросов сервер должен отвергнуть с HTTP-статусом "429 Too Many Requests".

```bash
curl -X GET http://localhost:3000/cats
429 Too Many Requests
```

</details>
