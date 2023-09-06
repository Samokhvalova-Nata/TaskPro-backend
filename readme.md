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
- За результатом роботи створюється пара токенів (refreshToken та accessToken) та повертається об'єкт і статус 201 Created:
```json
 {
  "accessToken": "exampleaccessToken",
  "refreshToken": "examplerefreshToken",
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
- В іншому випадку, порівнюється пароль для знайденого користувача; якщо паролі збігаються, створюється пара токенів (refreshToken та accessToken), зберігається в поточного юзера і повертається об'єкт і статус 200 OK:
```json
{
  "accessToken": "exampleaccessToken",
  "refreshToken": "examplerefreshToken",
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
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Шукає у моделі User користувача за _id.
- Якщо користувача не існує, повертається json з ключем {"message": "Not authorized"} і статусом 401 Unauthorized.
- В іншому випадку, видаляється пара токенів (refreshToken та accessToken) у поточного юзера і повертається відповідь зі статусом 204 No Content.

### GET `https://askpro-backend.onrender.com/api/auth/current` - Get user data by accessToken
- Не отримує body.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Якщо користувача не існує, повертається json з ключем {"message": "Not authorized"} і статусом 401 Unauthorized.
- В іншому випадку повертається об'єкт і статус 200 OK:
```json
{
  "accessToken": "exampleaccessToken",
  "refreshToken": "examplerefreshToken",
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
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Якщо користувача не існує, повертається повертає json з ключем {"message": "Not authorized"} і статусом 401 Unauthorized.
- При помилці валідації повертається <Помилка від Joi або іншої бібліотеки валідації> і статусом 400 Bad Request.
- В іншому випадку повертається об'єкт і статус 200 OK:
```json
{
  "accessToken": "exampleaccessToken",
  "refreshToken": "examplerefreshToken",
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
  "avatar": "file.jpg"
}
```
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Якщо користувача не існує, повертається json з ключем {"message": "Not authorized"} і статусом 401 Unauthorized.
- При помилці валідації повертається <Помилка від Joi або іншої бібліотеки валідації> і статусом 400 Bad Request.
- При зміні email або password видаляється пара токенів (refreshToken та accessToken) у поточного юзера.
- Якщо значення полів name, email збігаються з попередніми, повертається json з ключем {"message": "Such data is already in use"} і статусом 400 Bad Request.  
- В іншому випадку повертається об'єкт і статус 200 OK:
```json
{
  "accessToken": "exampleaccessToken",
  "refreshToken": "examplerefreshToken",
  "user": {
    "_id": "exampleid",
    "name": "examplename",
    "email": "example@example.com",
    "avatarURL": "тут буде посилання на зображення",
    "userTheme": "exampletheme"
  }
}
```

### POST `https://askpro-backend.onrender.com/api/auth/support` - Send request help letter
- Отримує body у форматі (поля email, comment обов'язкові з валідацією):
```json
{
  "email": "example@example.com",
  "comment": "examplecomment"
}
```
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Якщо користувача не існує, повертається json з ключем {"message": "Not authorized"} і статусом 401 Unauthorized.
- При помилці валідації повертається <Помилка від Joi або іншої бібліотеки валідації> і статусом 400 Bad Request.
- Якщо з body все добре, виконується відправка листа з коментарем юзера на імейл служби підтримки (taskpro.project@gmail.com) та листа зі сповіщенням про отримання запиту про допомогу на імейл користувача.
- За результатом успішної роботи повертається json з ключем {"message": "Reply email has been sent"} зі статусом 200 OK.

### POST `https://askpro-backend.onrender.com/api/auth/refresh` - Refresh user token
- Отримує body у форматі з обов'язковим полем refreshToken з валідацією:
```json
{
  "refreshToken": "examplerefreshToken"
}
```
- При помилці валідації повертається <Помилка від Joi або іншої бібліотеки валідації> і статусом 400 Bad Request.
- Якщо з body все добре, перевіряється чи існує юзер з таким refreshToken.
- Якщо не існує, повертається json з ключем {"message": "Invalid token"} і статусом 403 Forbidden.
- Якщо існує, створюється пара токенів (refreshToken та accessToken), зберігається в поточного юзера і повертається об'єкт і статус 200 OK:
```json
{
  "accessToken": "exampleaccessToken", 
  "refreshToken": "examplerefreshToken"
}
``` 

## Boards

### GET `https://askpro-backend.onrender.com/api/boards` - Get all user boards
- Не отримує body.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Повертається масив об'єктів всіх дошок в json-форматі зі статусом 200 OK:
```json
{
  [
    {
      "_id": "exampleid",
      "title": "exampletitle",
      "icon": "exampleicon",
      "background": "examplebackground",
      "backgroundURL": {},
      "owner": {
        "_id": "exampleid",
        "name": "examplename",
        "email": "example@example.com",
        "avatarURL": "тут буде посилання на зображення",
        "userTheme": "exampletheme"
      },
    }
  ]
}
```

### GET `https://askpro-backend.onrender.com/api/boards/:id` - Get user board by id
- Не отримує body.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Отримує параметр id.
- Якщо такого id немає, повертається json з ключем "message": "Board with id not found" і статусом 404 Not Found.
- Якщо такий id є, повертається об'єкт дошки (містить об'єкт користувача (owner), масив об'єктів колонок (columns) з масивом об'єктів карток (cards)) в json-форматі зі статусом 200 OK:
```json
{
  "_id": "exampleid",
  "title": "exampletitle",
  "icon": "exampleicon",
  "background": "examplebackground",
  "backgroundURL": {},
  "owner": {
    "_id": "exampleid",
    "name": "examplename",
    "email": "example@example.com",
    "avatarURL": "тут буде посилання на зображення",
    "userTheme": "exampletheme"
    },
  "columns": [
    {
      "_id": "exampleid",
      "title": "exampletitle",
      "cards": [
        {
          "_id": "exampleid",
          "title": "exampletitle",
          "description": "exampledescription",
          "priority": "examplepriority",
          "deadline": "DD-MM-YYYY"
        }
      ]
    }
  ]
}
```

### POST `https://askpro-backend.onrender.com/api/boards` - Add new board
- Отримує body у форматі:
```json
{
  "title": "exampletitle",
  "icon": "exampleicon",
  "background": "examplebackground"
}
```
- Усі поля з валідацією, поле title обов'язкове, значення полів icon та background мають бути з відповідних масивів:
```json
{
 "iconList": [
    "project",
    "star",
    "loading",
    "puzzle-piece",
    "container",
    "lightning",
    "colors",
    "hexagon",
  ],
  "backgroundList": [
    "no-background",
    "magnolia",
    "starry-sky",
    "sakura",
    "half-moon",
    "palm-leaves",
    "clouds",
    "rocky-beach",
    "violet-circle",
    "full-moon",
    "yacht",
    "baloon",
    "mountains",
    "sea",
    "cappodocia",
    "night-trailer",
]
}
```
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Якщо в body немає обов'язкового поля, повертається json з ключем {"message": "missing required title field"} і статусом 400 Bad Request.
- Якщо з body все добре, додається унікальний ідентифікатор в об'єкт дошки і повертається об'єкт з доданим id та статусом 201 Created у форматі:
```json
{
  "_id": "exampleid",
  "title": "exampletitle",
  "icon": "exampleicon",
  "background": "examplebackground",
  "backgroundURL": {},
  "owner": "exampleid"
}
```
- Якщо поле background не передане або передане значення "no-background", в об'єкті дошки в полі backgroundURL повертаєтся пустий об'єкт {}.
- Якщо в поле background передане інше значення, в об'єкті дошки в полі backgroundURL повертаєтся об'єкт у форматі:
```json
{
  "backgroundURL": {
    "mobile_1x": "посилання на зображення для мобільної версії 1x",
    "mobile_2x": "посилання на зображення для мобільної версії 2x",
    "tablet_1x": "посилання на зображення для планшетної версії 1x",
    "tablet_2x": "посилання на зображення для планшетної версії 2x",
    "desktop_1x": "посилання на зображення для десктопної версії 1x",
    "desktop_2x": "посилання на зображення для десктопної версії 2x",
  }
}
```

### DELETE `https://askpro-backend.onrender.com/api/boards/:id` - Delete board
- Не отримує body.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Отримує параметр id.
- Якщо такий id є, дошка видаляється і повертається об'єкт зі статусом 200 OK:
```json
{
  "message": "Board deleted",
  "deletedId": "exampleid"
}
```
- Якщо такого id немає, повертається json з ключем "message": "Board with id not found" і статусом 404 Not Found.

### PUT `https://askpro-backend.onrender.com/api/boards/:id` - Update board by id
- Отримує параметр id.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Отримує body в json-форматі c оновленням будь-яких полів title, icon та background.
- Якщо body немає, повертається json з ключем {"message": "missing fields"} і статусом 400 Bad Request.
- Якщо такого id немає, повертається json з ключем "message": "Board with id not found" і статусом 404 Not Found
- Якщо такий id і з body все добре, є повертається оновлений об'єкт дошки зі статусом 200 OK:
```json
{
  "_id": "exampleid",
  "title": "exampletitle",
  "icon": "exampleicon",
  "background": "examplebackground",
  "backgroundURL": {},
  "owner": "exampleid"
}
```
- Якщо поле background передане значення "no-background", в об'єкті дошки в полі backgroundURL повертаєтся пустий об'єкт {}.
- Якщо в поле background передане інше значення, в об'єкті дошки в полі backgroundURL повертаєтся об'єкт у форматі:
```json
{
  "backgroundURL": {
    "mobile_1x": "посилання на зображення для мобільної версії 1x",
    "mobile_2x": "посилання на зображення для мобільної версії 2x",
    "tablet_1x": "посилання на зображення для планшетної версії 1x",
    "tablet_2x": "посилання на зображення для планшетної версії 2x",
    "desktop_1x": "посилання на зображення для десктопної версії 1x",
    "desktop_2x": "посилання на зображення для десктопної версії 2x",
  }
}
``` 

## Columns

### POST `https://askpro-backend.onrender.com/api/columns` - Add new column
- Отримує body у форматі:
```json
{
  "title": "exampletitle",
  "board": "exampleid"
}
```
- Усі поля обов'язкові з валідацією.
- В полі board отримує id дошки, в яку додається колонка. Якщо дошки з таким id немає, повертається json з ключем "message": "Such board with id does not exist" і статусом 404 Not Found.
- Якщо в базі є дошка з колонкою з такою назвою, повертається json з ключем {"message": "Such column with title has already been added to this Board"} і статусом 409 Conflict.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Якщо в body немає обов'язкового поля, повертається json з ключем {"message": "missing required field"} і статусом 400 Bad Request.
- Якщо з body все добре, додається унікальний ідентифікатор в об'єкт картки і повертається об'єкт з доданим id та статусом 201 Created:
```json
{
  "_id": "exampleid",
  "title": "exampletitle",
  "board": "exampleid"
}
```

### DELETE `https://askpro-backend.onrender.com/api/columns/:id` - Delete column
- Не отримує body.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Отримує параметр id.
- Якщо такий id є, колонка видаляється і повертається об'єкт зі статусом 200 OK:
```json
{
  "message": "Column successfully deleted",
  "deletedId": "exampleid"
}
```
- Якщо такого id немає, повертається json з ключем "message": "Column with id not found" і статусом 404 Not Found.

### PUT `https://askpro-backend.onrender.com/api/columns/:id` - Update column by id
- Отримує параметр id.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Отримує body в json-форматі c оновленням поля title:
```json
{
  "title": "exampletitle",
  "board": "exampleid"
}
```
- Якщо body немає, повертається json з ключем {"message": "missing fields"} і статусом 400 Bad Request.
- Якщо такого id немає, повертається json з ключем "message": "Column with id not found" і статусом 404 Not Found.
- Якщо в базі є дошка з колонкою з такою назвою, повертається json з ключем {"message": "Such column with title has already been added to this Board"} і статусом 409 Conflict.
- Якщо такий id і з body все добре, є повертається оновлений об'єкт картки зі статусом 200 OK:
```json
{
  "_id": "exampleid",
  "title": "exampletitle",
  "board": "exampleid"
}
```

## Cards

### POST `https://askpro-backend.onrender.com/api/cards` - Add new card
- Отримує body у форматі:
```json
{
  "title": "exampletitle",
  "description": "exampledescription",
  "priority": "examplepriority",
  "deadline": "DD-MM-YYYY",
  "column": "exampleid"
}
```
- Усі поля з валідацією, поля title та column обов'язкові, значення поля priority має бути з масиву:
```json
{
  "priorityList": ["without priority", "low", "medium", "high"]
}
```
- В полі column отримує id колонки, в яку додається картка. Якщо колонки з таким id немає, повертається json з ключем "message": "Column with id not found" і статусом 404 Not Found.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Якщо в body немає обов'язкового поля, повертається json з ключем {"message": "missing required field"} і статусом 400 Bad Request.
- Якщо з body все добре, додається унікальний ідентифікатор в об'єкт картки і повертається об'єкт з доданим id та статусом 201 Created:
```json
{
  "_id": "exampleid",
  "title": "exampletitle",
  "description": "exampledescription",
  "priority": "examplepriority",
  "deadline": "DD-MM-YYYY",
  "column": "exampleid"
}
```

### DELETE `https://askpro-backend.onrender.com/api/cards/:id` - Delete card
- Не отримує body.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Отримує параметр id.
- Якщо такий id є, картка видаляється і повертається об'єкт видаленоъ картки зі статусом 200 OK:
```json
{
  "_id": "exampleid",
  "title": "exampletitle",
  "description": "exampledescription",
  "priority": "examplepriority",
  "deadline": "DD-MM-YYYY",
  "column": "exampleid"
}
```
- Якщо такого id немає, повертається json з ключем "message": "Card with id not found" і статусом 404 Not Found.

### PUT `https://askpro-backend.onrender.com/api/cards/:id` - Update card by id
- Отримує параметр id.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Отримує body в json-форматі c оновленням будь-яких полів title, description, priority, deadline:
```json
{
  "title": "exampletitle",
  "description": "exampledescription",
  "priority": "examplepriority",
  "deadline": "DD-MM-YYYY",
}
```
- Якщо body немає, повертається json з ключем {"message": "missing fields"} і статусом 400 Bad Request.
- Якщо такого id немає, повертається json з ключем "message": "Card with id not found" і статусом 404 Not Found
- Якщо такий id є і з body все добре, повертається оновлений об'єкт картки зі статусом 200 OK:
```json
{
  "_id": "exampleid",
  "title": "exampletitle",
  "description": "exampledescription",
  "priority": "examplepriority",
  "deadline": "DD-MM-YYYY",
  "column": "exampleid"
}
```

### PUTCH `https://askpro-backend.onrender.com/api/cards:id/transport` - Transport card between columns
- Отримує параметр id.
- Якщо такого id немає, повертається json з ключем "message": "Card with id not found" і статусом 404 Not Found
- Отримує body (поля обов'язкові з валідацією) у форматі:
```json
{
  "source": "exampleid",
  "destination": "exampleid",
}
```
- У полі source отримує id колонки, з якої переноситься картка; у полі destination отримує id колонки, в яку переноситься картка.
- Обов'язковий заголовок Authorization: "Bearer {{accessToken}}".
- Якщо body немає, повертається json з ключем {"message": "missing fields"} і статусом 400 Bad Request.
- Якщо з body все добре, повертається оновлений об'єкт картки зі статусом 200 OK:
```json
{
  "_id": "exampleid",
  "title": "exampletitle",
  "description": "exampledescription",
  "priority": "examplepriority",
  "deadline": "DD-MM-YYYY",
  "column": "exampleid"
}
```
