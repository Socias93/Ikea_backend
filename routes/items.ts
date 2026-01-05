import { categories, Category } from "./categories";
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

export const items: Item[] = [
  {
    id: "i1",
    name: "BILLY Bookcase",
    category: { id: "1", name: "Furniture" },
    numberInStock: 10,
    price: 120,
  },
  {
    id: "i2",
    name: "MALM Bed Frame",
    category: { id: "1", name: "Furniture" },
    numberInStock: 5,
    price: 250,
  },
  {
    id: "i3",
    name: "POÄNG Armchair",
    category: { id: "1", name: "Furniture" },
    numberInStock: 8,
    price: 80,
  },
  {
    id: "i4",
    name: "LACK Side Table",
    category: { id: "1", name: "Furniture" },
    numberInStock: 12,
    price: 50,
  },

  // Lighting
  {
    id: "i5",
    name: "FADO Table Lamp",
    category: { id: "2", name: "Lighting" },
    numberInStock: 15,
    price: 40,
  },
  {
    id: "i6",
    name: "RANARP Work Lamp",
    category: { id: "2", name: "Lighting" },
    numberInStock: 7,
    price: 60,
  },
  {
    id: "i7",
    name: "SINNERLIG Pendant Lamp",
    category: { id: "2", name: "Lighting" },
    numberInStock: 5,
    price: 70,
  },
  {
    id: "i8",
    name: "MASKROS Pendant Lamp",
    category: { id: "2", name: "Lighting" },
    numberInStock: 3,
    price: 90,
  },

  // Textiles
  {
    id: "i9",
    name: "GULLKLOCKA Curtains",
    category: { id: "3", name: "Textiles" },
    numberInStock: 20,
    price: 25,
  },
  {
    id: "i10",
    name: "VÄRNAMO Rug",
    category: { id: "3", name: "Textiles" },
    numberInStock: 10,
    price: 70,
  },
  {
    id: "i11",
    name: "DVALA Bedspread",
    category: { id: "3", name: "Textiles" },
    numberInStock: 15,
    price: 35,
  },
  {
    id: "i12",
    name: "TÅSTRUP Cushion Cover",
    category: { id: "3", name: "Textiles" },
    numberInStock: 25,
    price: 15,
  },

  // Storage
  {
    id: "i13",
    name: "KALLAX Shelf Unit",
    category: { id: "4", name: "Storage" },
    numberInStock: 10,
    price: 60,
  },
  {
    id: "i14",
    name: "SKUBB Storage Box",
    category: { id: "4", name: "Storage" },
    numberInStock: 30,
    price: 10,
  },
  {
    id: "i15",
    name: "TRONES Shoe Cabinet",
    category: { id: "4", name: "Storage" },
    numberInStock: 5,
    price: 25,
  },
  {
    id: "i16",
    name: "BRIMNES Wardrobe",
    category: { id: "4", name: "Storage" },
    numberInStock: 7,
    price: 150,
  },

  // Kitchen
  {
    id: "i17",
    name: "IKEA 365+ Frying Pan",
    category: { id: "5", name: "Kitchen" },
    numberInStock: 15,
    price: 30,
  },
  {
    id: "i18",
    name: "KLOCKIS Clock / Thermometer",
    category: { id: "5", name: "Kitchen" },
    numberInStock: 12,
    price: 15,
  },
  {
    id: "i19",
    name: "FINTORP Rail",
    category: { id: "5", name: "Kitchen" },
    numberInStock: 10,
    price: 20,
  },
  {
    id: "i20",
    name: "IKEA 365+ Glass",
    category: { id: "5", name: "Kitchen" },
    numberInStock: 50,
    price: 5,
  },

  // Decor
  {
    id: "i21",
    name: "FEJKA Artificial Potted Plant",
    category: { id: "6", name: "Decor" },
    numberInStock: 25,
    price: 10,
  },
  {
    id: "i22",
    name: "LACK Wall Shelf",
    category: { id: "6", name: "Decor" },
    numberInStock: 15,
    price: 20,
  },
  {
    id: "i23",
    name: "STRÅLA LED Candles",
    category: { id: "6", name: "Decor" },
    numberInStock: 10,
    price: 15,
  },
  {
    id: "i24",
    name: "SOCKER Plant Pot",
    category: { id: "6", name: "Decor" },
    numberInStock: 30,
    price: 12,
  },

  // Outdoor
  {
    id: "i25",
    name: "ÄPPLARÖ Outdoor Chair",
    category: { id: "7", name: "Outdoor" },
    numberInStock: 8,
    price: 90,
  },
  {
    id: "i26",
    name: "ÄPPLARÖ Outdoor Table",
    category: { id: "7", name: "Outdoor" },
    numberInStock: 5,
    price: 150,
  },
  {
    id: "i27",
    name: "TÄRNÖ Outdoor Chair",
    category: { id: "7", name: "Outdoor" },
    numberInStock: 10,
    price: 70,
  },
  {
    id: "i28",
    name: "SUNNANÖ Parasol",
    category: { id: "7", name: "Outdoor" },
    numberInStock: 6,
    price: 50,
  },
];

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

router.delete(ITEM_API_ID, (req, res) => {
  const item = items.find((i) => i.id === req.params.id);
  if (!item) return res.status(400).send(ITEM_NOT_FOUND);

  const index = items.indexOf(item);
  const deletedItem = items.splice(index, 1);

  return res.send(deletedItem);
});

export default router;
