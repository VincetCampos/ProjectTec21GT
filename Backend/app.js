var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var productoRouter = require('./routes/productos')
const equipoRouter = require('./routes/equipos')
const usuarioRouter = require('./routes/usuarios')
const loginRouter = require('./routes/authLogin')
const authRequiere = require('./middleware/validarToken')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/login', loginRouter)
app.use('/', indexRouter);
app.use('/productos', authRequiere, productoRouter);
app.use('/equipos', authRequiere, equipoRouter)
app.use('/usuarios', authRequiere, usuarioRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
