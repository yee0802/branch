import express from "express";
import cors from "cors";
import morgan from "morgan";

const PORT = 3000;

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`\n Server is running on http://localhost:${PORT}\n`);
});
