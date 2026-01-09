import express from "express";
import categories from "./routes/categories";
import items from "./routes/items";
import employes from "./routes/employes";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const PORT = 5555;
const CATEGORIES_URL = "/api/categories";
const ITEMS_URL = "/api/items";
const EMPLOYES_URL = "/api/employes";

app.use(CATEGORIES_URL, categories);
app.use(ITEMS_URL, items);
app.use(EMPLOYES_URL, employes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
