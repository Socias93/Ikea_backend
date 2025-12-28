import express from "express";

const app = express();
const PORT = 5555;

export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: "1", name: "Furniture" },
  { id: "2", name: "Lighting" },
  { id: "3", name: "Textiles" },
  { id: "4", name: "Storage" },
  { id: "5", name: "Kitchen" },
  { id: "6", name: "Decor" },
  { id: "7", name: "Outdoor" },
];

export function getCategories() {
  return categories;
}

app.use("/api/categories", (req, res) => res.send(categories));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
