import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/index.js';
import session from 'express-session';
import flash from 'connect-flash';

const app = express();
const PORT = 5000;

// __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine: EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Public
app.use(express.static(path.join(__dirname, 'public')))

// Middlewares
app.use(express.urlencoded({ extended: true })); // para req.body de forms
app.use(express.json()); // para req.body de JSON
app.use('/bootstrap',  express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use(session({
  secret : 'pawii',
  resave : false,
  saveUninitialized : false
}));

app.use(flash());

app.use((req,res,next) => {
  res.locals.req_status = req.flash('req_status');
  res.locals.req_message = req.flash('req_message');
  next();
});

// Rotas
app.use('/', router);

// Sobe o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
