import express from "express";
import logger from "morgan";
import cors from "cors";

import authRouter from "./routes/api/auth-router.js";
import boardsRouter from "./routes/api/boards-router.js";
import columnsRouter from "./routes/api/columns-router.js";
import cardsRouter from "./routes/api/cards-router.js";

const app = express();

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert {type: "json"};

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRouter)
app.use('/api/boards', boardsRouter);
app.use('/api/columns', columnsRouter);
app.use('/api/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;