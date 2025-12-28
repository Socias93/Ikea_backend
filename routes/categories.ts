import express from "express";

const router = express.Router();

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

router.get("/", (req, res) => {
  return res.send(categories);
});

export default router;
