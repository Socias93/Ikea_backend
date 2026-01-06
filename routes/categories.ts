import express from "express";
import { validate } from "./schemas/Categories";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

const CATEGORY_API = "/";
const CATEGORY_API_ID = "/:id";
const NOT_FOUND = "Category not found";
const IS_USED = "Category must be empty to be able to delte it";

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

router.post(CATEGORY_API, async (req, res) => {
  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const newCategory = await prisma.category.create({
    data: {
      name: req.body.name,
    },
  });

  return res.send(newCategory);
});

router.put(CATEGORY_API_ID, async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { id: req.params.id },
  });
  if (!category) return res.status(400).send(NOT_FOUND);

  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const updatedCategory = await prisma.category.update({
    where: { id: req.params.id },
    data: { name: req.body.name },
  });

  return res.send(updatedCategory);
});

router.delete(CATEGORY_API_ID, async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { id: req.params.id },
  });
  if (!category) return res.status(400).send(NOT_FOUND);

  const used = await prisma.item.findFirst({
    where: { categoryId: category.id },
  });
  if (used) {
    return res.status(400).send(IS_USED);
  }

  const deletedCategory = await prisma.category.delete({
    where: { id: req.params.id },
  });

  return res.send(deletedCategory);
});

export default router;
