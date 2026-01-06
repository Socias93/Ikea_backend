import { Category } from "./categories";
import { validate } from "./schemas/Items";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();
const ITEM_API = "/";
const ITEM_API_ID = "/:id";
const ITEM_NOT_FOUND = "item not found";
const CATEGORY_NOT_FOUND = "Category not found";

export interface Item {
  id: string;
  name: string;
  category: Category;
  numberInStock: number;
  price: number;
}

router.get(ITEM_API, async (req, res) => {
  const items = await prisma.item.findMany();
  return res.send(items);
});

router.get(ITEM_API_ID, async (req, res) => {
  const item = await prisma.item.findFirst({ where: { id: req.params.id } });
  if (!item) return res.status(400).send(ITEM_NOT_FOUND);

  return res.send(item);
});

router.post(ITEM_API, async (req, res) => {
  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });
  if (!category) return res.status(400).send(CATEGORY_NOT_FOUND);

  const newItem = await prisma.item.create({
    data: {
      name: req.body.name,
      categoryId: req.body.categoryId,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    },
  });

  return res.send(newItem);
});

router.put(ITEM_API_ID, async (req, res) => {
  const item = await prisma.item.findFirst({ where: { id: req.params.id } });
  if (!item) return res.status(400).send(ITEM_NOT_FOUND);

  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });
  if (!category) return res.status(400).send(CATEGORY_NOT_FOUND);

  const updatedItem = await prisma.item.update({
    where: { id: req.params.id },
    data: {
      name: req.body.name,
      categoryId: req.body.categoryId,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    },
  });

  return res.send(updatedItem);
});

router.delete(ITEM_API_ID, async (req, res) => {
  const item = await prisma.item.findFirst({ where: { id: req.params.id } });
  if (!item) return res.status(400).send(ITEM_NOT_FOUND);

  const deletedItem = await prisma.item.delete({
    where: { id: req.params.id },
  });

  return res.send(deletedItem);
});

export default router;
