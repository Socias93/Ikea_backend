import express from "express";

const router = express.Router();
const CATEGORY_API = "/";
const CATEGORY_API_ID = "/:id";
const NOT_FOUND = "Category not found";

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

router.get(CATEGORY_API, (req, res) => {
  return res.send(categories);
});

router.get(CATEGORY_API_ID, (req, res) => {
  const category = categories.find((c) => c.id === req.params.id);
  if (!category) return res.status(400).send(NOT_FOUND);

  return res.send(category);
});

export default router;
