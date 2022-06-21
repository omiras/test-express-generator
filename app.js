/**
 * Paquetes de terceros muy utilizados en la mayoria de aplicaciones de Nodejs/Express
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/**
 * Las rutas de nuestra aplicación
 */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// logger sirve para monitorizar las peticiones que recibe el servidor
app.use(logger('dev'));
// Va a hacer que nuestro server pueda manejar datos codificador como JSON por parte del cliente {}
app.use(express.json());
// Gestionar las peticiones de tipo POST (poder ver lo que hay en en req.body)
app.use(express.urlencoded({ extended: false }));
// Gestionar las cookies. Las cookies son pequeños fragmentos de información para que el servidor 'recuerde' al cliente
app.use(cookieParser());
// hace que todas las peticiones que no esten en un endpoint, vayan a ser buscadas a la carepta public
app.use(express.static(path.join(__dirname, 'public')));

// Enrutamiento. Todas las peticiones que empiecen por / , sean gestionadas en indexRouter
// Todas las  peticiones que empiecen por /users, sean gestionadas por userRouter
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
