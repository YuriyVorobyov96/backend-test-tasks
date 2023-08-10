# Микросервисная архитектура

## Описание

Необходимо реализовать несколько архитектурных паттернов в рамках одного микросервисного приложения. При разработке требуется задействовать различные способы общения: HTTP/RPC/брокеры сообщений. 

## Требования

### Паттерны:

- [MVC](https://habr.com/ru/post/181772/);
- [CQRS](https://habr.com/ru/company/simbirsoft/blog/329970/);
- [Event Sourcing](https://microservices.io/patterns/data/event-sourcing.html);
- [Clean Architecture](https://www.freecodecamp.org/news/a-quick-introduction-to-clean-architecture-990c014448d2/);
- [DDD](https://docs.microsoft.com/ru-ru/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice);
- [BFF](https://blog.bitsrc.io/bff-pattern-backend-for-frontend-an-introduction-e4fa965128bf);
- [Peer-to-Peer](https://develpreneur.com/peer-to-peer-an-architecture-pattern-where-everyone-shares-the-work/).

### Технологии:

- Node.js/C#/Go;
- NestJS/ExpressJS/.NET;
- PostgreSQL/MongoDB;
- RabbitMQ/Apache Kafka/NATS;
- HTTP/gRPC;
- Kubernetes/Docker.

## Задание

Необходимо реализовать микросервисы для работы с балансом пользователей определенной системы (зачисление средств, списание средств, перевод средств от пользователя к пользователю, а также метод получения баланса пользователя).

Плюсом будет:
- Покрытие тестами;
- Задеплоенная версия приложения;
- Скорость ответа от сервера <100ms;
- Сбор метрик о работоспособности приложения.

### Возможные сценарии для проверки

Сервис биллинга с помощью внешних мерчантов (например, visa/mastercard) обработал зачисление денег на наш счет. Теперь биллингу нужно добавить эти деньги на баланс пользователя;
Пользователь хочет купить у нас какую-то услугу. Для этого у нас есть специальный сервис управления услугами, который перед применением услуги проверяет баланс и потом списывает необходимую сумму.

