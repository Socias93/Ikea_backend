import express from "express";
import categories from "./routes/categories";

const app = express();
const PORT = 5555;
const CATEGORY_URL = "/api/categories";

app.use(CATEGORY_URL, categories);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
