# html-to-pdf-converter

Сервис для конвертации html документов в pdf формат

## Использование

Для конвертации документа нужно обратиться к эндпоинту 

```bash
/api/upload
```
​
Эндпоинт принимает на вход zip-файл содержащий index.html и прилигающие ресурсы к нему.

Сервис обрабатывает файлы до 2гб

## Установка

### Установка зависимостей

```bash
npm install
```

### wkhtmltopdf

Для конвертации, сервис использует библиотеку wkhtmltopdf. 

Чтобы её использовать необходимо установить wkhtmltopdf инструмент командной строки в вашей системе.

Сделать это можно по ссылке: https://wkhtmltopdf.org/downloads.html#stable
Документация библиотеки: https://www.npmjs.com/package/wkhtmltopdf?activeTab=readme

### .env переменные

Создайте в корне проекта файл .development.env. Заполните его используя пример .example.env.
В переменной WKHTMLTOPPDF_PATH_DRIVER, нужно указать полный путь к wkhtmltopdf в вашей системе. 

### Запуск

```bash
npm run start
```
