const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://api.super.students.nomoredomains.club',
  'http://api.super.students.nomoredomains.club',
  'https://super.nomoredomains.club',
  'http://super.nomoredomains.club',
];

const cors = (req, res, next) => {
  // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const { method } = req;

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }

  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);

    // завершаем обработку запроса и возвращаем результат клиенту
    res.end();
  }

  // Сохраняем источник запроса в переменную origin
  const { origin } = req.headers;

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};

module.exports = cors;
