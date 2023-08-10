# SQL

## Описание

Необходимо предоставить решения по задачам, используя возможности SQL языков

## Требования

### Технологии:

- SQL;
- PostgreSQL/MySQL/SQLite/Oracle/TSQL.

## Задание

### Задание 1: Формат пользователей

<details>
<summary>Описание</summary>

Имеется таблица пользователей:

```sql
table users
(
  id integer,
  first_name varchar,
  middle_name varchar,
  last_name varchar
)
```

Необходимо получить список в формате: «Иванова — Наталья – Юрьевна». ФИО должно быть прописано в одном столбике, разделение —.

</details>

### Задание 2: Дозвоны

<details>
<summary>Описание</summary>

Имеется таблица звонков:

```sql
table calls
(
  id integer,
  dozv_flag integer,
  duration real,
  start_dttm date,
  end_dttm date
)
```

Вывести %% дозвона для каждого дня. Период с 01.10.2020 по текущий день.

%% дозвона – это доля принятых звонков (dozv_flg=1) от всех поступивших звонков (dozv_flg = 1 or dozv_flg = 0).

Вывести: date, sla (%% дозвона)

</details>

### Задание 3: Активные пользователи

<details>
<summary>Описание</summary>

Имеется таблица пользователей:

```sql
table users
(
  id integer,
  login_at date -- дата последнего входа в систему
)
```

Нужно написать запрос для расчета MAU.

MAU - monthly active users: количество уникальных клиентов, проявляющих активность в приложении в течение месяца.

</details>

### Задание 4: Обновление статуса

<details>
<summary>Описание</summary>

Имеется следующая структура:

```sql
table contracts {
  id int,
  num varchar
}

table contracts_statuses {
  contract_id int,
  ref_status_id int,
  actuality boolean
}

table ref_statuses {
  id int,
  code varchar
}
```
Необходимо:
1. Написать sql, получающий все статусы контракта с id=15;
2. Написать алгоритм добавляющий новый статус к контракту с id=15, только в том случае если текущий статус контракта (actuality = true) равен 3 (id = 3)

</details>
