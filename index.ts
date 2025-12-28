import express from "express";
import categories from "./routes/categories";
import items from "./routes/items";

const app = express();
const PORT = 5555;
const CATEGORY_URL = "/api/categories";
const ITEMS_URL = "/api/items";

app.use(CATEGORY_URL, categories);
app.use(ITEMS_URL, items);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
