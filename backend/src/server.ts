import express from 'express';
import connectDB from 'infra/config/database';
import appRouter from 'web/routes/index.routes';
import path from 'path';
import helmet from "helmet";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/downloads', express.static(path.join(__dirname, '../downloads')));

app.use(appRouter);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});