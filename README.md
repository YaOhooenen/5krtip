Простой погодный виджет

http://localhost:3000

# Функционал
- GET /api/weather — получить список прогнозов; поддерживает query: `city`, `minTemp`, `maxTemp`, `limit`.
- GET /api/weather/:id — получить запись по id (параметры через `req.params`).
- POST /api/weather — создать запись (требуется x-api-key header или ?apiKey=).
- PUT /api/weather/:id — обновить запись (требуется ключ).
- DELETE /api/weather/:id — удалить запись (требуется ключ).
- Static files served from `/public` (виджет).
- Собственный middleware `middleware/logger.js`.
- Структура: `routes/` + `controllers/`.


![добавить новый город](image-1.png) - добавить новый город

![пример_1](image.png) - пример 1

![пример_2](image-2.png) - пример 2

![пример_3](image-3.png) - пример 3