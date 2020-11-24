import path from 'path';
import rootDir from './util/path';
import express from 'express';
import bodyParser from 'body-parser';
import { get404 } from './controllers/error';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.listen(3000);
