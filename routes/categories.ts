import express from "express";
import { validate } from "./schemas/Categories";
import { items } from "./items";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

const CATEGORY_API = "/";
const CATEGORY_API_ID = "/:id";
const NOT_FOUND = "Category not found";
const IS_USED = "Category must be empty to be able to delte it";

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

router.get(CATEGORY_API, async (req, res) => {
  const categories = await prisma.category.findMany();
  return res.send(categories);
});

router.get(CATEGORY_API_ID, async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { id: req.params.id },
  });
  if (!category) return res.status(400).send(NOT_FOUND);

  return res.send(category);
});

router.post(CATEGORY_API, (req, res) => {
  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const category: Category = {
    id: Date.now().toString(),
    name: req.body.name,
  };
  categories.push(category);

  return res.send(category);
});

router.put(CATEGORY_API_ID, (req, res) => {
  const category = categories.find((c) => c.id === req.params.id);
  if (!category) return res.status(400).send(NOT_FOUND);

  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  category.name = req.body.name;

  return res.send(category);
});

router.delete(CATEGORY_API_ID, (req, res) => {
  const category = categories.find((c) => c.id === req.params.id);
  if (!category) return res.status(400).send(NOT_FOUND);

  const used = items.some((i) => i.category.id === category.id);
  if (used) {
    return res.status(400).send(IS_USED);
  }

  const index = categories.indexOf(category);
  const deletedCategory = categories.splice(index, 1);

  return res.send(deletedCategory);
});

export default router;
