import "./config/environment.config.js";
import databaseConnection from "./config/database.config.js";
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json({
    extended: true
}));
app.use(express.urlencoded({
	extended: true
}));

databaseConnection()

app.use('/', authRoutes);
app.use('/', postRoutes);

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}/`);
})