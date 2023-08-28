### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)

## Authorization

### POST `https://askpro-backend.onrender.com/api/auth/signup` - Create a new user
- Отримує body у форматі (поля name, email, password обов'язкові з валідацією):
```json
{
  "name": "examplename",
  "email": "example@example.com",
  "password": "examplepassword"
}
```
- При помилці валідації повертається <Помилка від Joi або іншої бібліотеки валідації> і статусом 400 Bad Request.
- Якщо пошта вже використовується кимось іншим, повертається json з ключем {"message": "Such email is already registered"} і статусом 409 Conflict.
- За результатом роботи створюється токен та повертається об'єкт і статус 201 Created:
```json
 {
  "token": "exampletoken",
  "user": {
    "_id": "exampleid",
    "name": "examplename",
    "email": "example@example.com",
    "avatarURL": "",
    "userTheme": "light"
  }
}
```

### POST `https://askpro-backend.onrender.com/api/auth/signin` - Signin user
- Отримує body у форматі (поля email, password обов'язкові з валідацією):
```json
{
  "email": "example@example.com",
  "password": "examplepassword"
}
```
- При помилці валідації повертається <Помилка від Joi або іншої бібліотеки валідації> і статусом 400 Bad Request.
- Якщо пароль або імейл невірний, повертається json з ключем {"message": "Email or password is wrong"} і статусом 401 Unauthorized.
- В іншому випадку, порівнюється пароль для знайденого користувача; якщо паролі збігаються, створюється токен, зберігається в поточного юзера і повертається об'єкт і статус 200 OK:
```json
{
  "token": "exampletoken",
  "user": {
    "_id": "exampleid",
    "name": "examplename",
    "email": "example@example.com",
    "avatarURL": "тут буде посилання на зображення",
    "userTheme": "exampletheme"
  }
}
```

### POST `https://askpro-backend.onrender.com/api/auth/signout` - Signout user
- Не отримує body.
- Обов'язковий заголовок Authorization: "Bearer {{token}}".
- Шукає у моделі User користувача за _id.
- Якщо користувача не існує, повертається json з ключем {"message": "Not authorized"} і статусом 401 Unauthorized.
- В іншому випадку, видаляється токен у поточного юзера і повертається відповідь зі статусом 204 No Content.

### GET `https://askpro-backend.onrender.com/api/auth/current` - Get user data by token
- Не отримує body.
- Обов'язковий заголовок Authorization: "Bearer {{token}}".
- Якщо користувача не існує, повертається json з ключем {"message": "Not authorized"} і статусом 401 Unauthorized.
- В іншому випадку повертається об'єкт і статус 200 OK:
```json
{
  "token": "exampletoken",
  "user": {
    "_id": "exampleid",
    "name": "examplename",
    "email": "example@example.com",
    "avatarURL": "тут буде посилання на зображення",
    "userTheme": "exampletheme"
  }
}
```

### PATCH `https://askpro-backend.onrender.com/api/auth/` - Update userTheme field
- Отримує body у форматі (поле обов'язкове з валідацією, значення має бути з масиву ["light", "dark", "violet"]):
```json
{
  "userTheme": "exampletheme"
}
```
- Обов'язковий заголовок Authorization: "Bearer {{token}}".
- Якщо користувача не існує, повертається повертає json з ключем {"message": "Not authorized"} і статусом 401 Unauthorized.
- При помилці валідації повертається <Помилка від Joi або іншої бібліотеки валідації> і статусом 400 Bad Request.
- В іншому випадку повертається об'єкт і статус 200 OK:
```json
{
  "token": "exampletoken",
  "user": {
    "_id": "exampleid",
    "name": "examplename",
    "email": "example@example.com",
    "avatarURL": "тут буде посилання на зображення",
    "userTheme": "exampletheme"
  }
}
```
### PUT `https://askpro-backend.onrender.com/api/auth/update` - Update user profile
- Отримує body у форматі data-form (поля name, email, password у форматі Text з валідацією, поле avatar у форматі File отримує завантажений файл) 
```json
{
  "name": "examplename",
  "email": "example@example.com",
  "password": "examplepassword",
  "avatar": "тут буде посилання на зображення"
}
```
- Обов'язковий заголовок Authorization: "Bearer {{token}}".
- Якщо користувача не існує, повертається json з ключем {"message": "Not authorized"} і статусом 401 Unauthorized.
- При помилці валідації повертається <Помилка від Joi або іншої бібліотеки валідації> і статусом 400 Bad Request.
- При зміні email або password видаляється токен у поточного юзера.
- Якщо значення полів name, email збігаються з попередніми, повертається json з ключем {"message": "Such data is already in use"} і статусом 400 Bad Request.  
- В іншому випадку повертається об'єкт і статус 200 OK:
```json
{
  "token": "exampletoken",
  "user": {
    "_id": "exampleid",
    "name": "examplename",
    "email": "example@example.com",
    "avatarURL": "тут буде посилання на зображення",
    "userTheme": "exampletheme"
  }
}
```