import express from "express";
import categories from "./routes/categories";
import items from "./routes/items";
import employes from "./routes/employes";

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

async function createItems() {
  const itemsData = [
    // Furniture
    {
      name: "BILLY Bookcase",
      numberInStock: 10,
      price: 120,
      categoryId: "cmjw3c2yi0000r6m8f619h6fx",
    },
    {
      name: "MALM Bed Frame",
      numberInStock: 5,
      price: 250,
      categoryId: "cmjw3c2yi0000r6m8f619h6fx",
    },
    {
      name: "POÄNG Armchair",
      numberInStock: 8,
      price: 80,
      categoryId: "cmjw3c2yi0000r6m8f619h6fx",
    },
    {
      name: "LACK Side Table",
      numberInStock: 12,
      price: 50,
      categoryId: "cmjw3c2yi0000r6m8f619h6fx",
    },

    // Lighting
    {
      name: "FADO Table Lamp",
      numberInStock: 15,
      price: 40,
      categoryId: "cmjw3cl6p0000r6oso3org52l",
    },
    {
      name: "RANARP Work Lamp",
      numberInStock: 7,
      price: 60,
      categoryId: "cmjw3cl6p0000r6oso3org52l",
    },
    {
      name: "SINNERLIG Pendant Lamp",
      numberInStock: 5,
      price: 70,
      categoryId: "cmjw3cl6p0000r6oso3org52l",
    },
    {
      name: "MASKROS Pendant Lamp",
      numberInStock: 3,
      price: 90,
      categoryId: "cmjw3cl6p0000r6oso3org52l",
    },

    // Textiles
    {
      name: "GULLKLOCKA Curtains",
      numberInStock: 20,
      price: 25,
      categoryId: "cmjw3h0ng0000r610xxuaz872",
    },
    {
      name: "VÄRNAMO Rug",
      numberInStock: 10,
      price: 70,
      categoryId: "cmjw3h0ng0000r610xxuaz872",
    },
    {
      name: "DVALA Bedspread",
      numberInStock: 15,
      price: 35,
      categoryId: "cmjw3h0ng0000r610xxuaz872",
    },
    {
      name: "TÅSTRUP Cushion Cover",
      numberInStock: 25,
      price: 15,
      categoryId: "cmjw3h0ng0000r610xxuaz872",
    },

    // Storage
    {
      name: "KALLAX Shelf Unit",
      numberInStock: 10,
      price: 60,
      categoryId: "cmjw3h0ng0001r610orwlepgt",
    },
    {
      name: "SKUBB Storage Box",
      numberInStock: 30,
      price: 10,
      categoryId: "cmjw3h0ng0001r610orwlepgt",
    },
    {
      name: "TRONES Shoe Cabinet",
      numberInStock: 5,
      price: 25,
      categoryId: "cmjw3h0ng0001r610orwlepgt",
    },
    {
      name: "BRIMNES Wardrobe",
      numberInStock: 7,
      price: 150,
      categoryId: "cmjw3h0ng0001r610orwlepgt",
    },

    // Kitchen
    {
      name: "IKEA 365+ Frying Pan",
      numberInStock: 15,
      price: 30,
      categoryId: "cmjw3h0ng0002r61066bj3fld",
    },
    {
      name: "KLOCKIS Clock / Thermometer",
      numberInStock: 12,
      price: 15,
      categoryId: "cmjw3h0ng0002r61066bj3fld",
    },
    {
      name: "FINTORP Rail",
      numberInStock: 10,
      price: 20,
      categoryId: "cmjw3h0ng0002r61066bj3fld",
    },
    {
      name: "IKEA 365+ Glass",
      numberInStock: 50,
      price: 5,
      categoryId: "cmjw3h0ng0002r61066bj3fld",
    },

    // Decor
    {
      name: "FEJKA Artificial Potted Plant",
      numberInStock: 25,
      price: 10,
      categoryId: "cmjw3h0ng0003r6108d9chkzl",
    },
    {
      name: "LACK Wall Shelf",
      numberInStock: 15,
      price: 20,
      categoryId: "cmjw3h0ng0003r6108d9chkzl",
    },
    {
      name: "STRÅLA LED Candles",
      numberInStock: 10,
      price: 15,
      categoryId: "cmjw3h0ng0003r6108d9chkzl",
    },
    {
      name: "SOCKER Plant Pot",
      numberInStock: 30,
      price: 12,
      categoryId: "cmjw3h0ng0003r6108d9chkzl",
    },

    // Outdoor
    {
      name: "ÄPPLARÖ Outdoor Chair",
      numberInStock: 8,
      price: 90,
      categoryId: "cmjw3h0ng0004r6109y3u0jo1",
    },
    {
      name: "ÄPPLARÖ Outdoor Table",
      numberInStock: 5,
      price: 150,
      categoryId: "cmjw3h0ng0004r6109y3u0jo1",
    },
    {
      name: "TÄRNÖ Outdoor Chair",
      numberInStock: 10,
      price: 70,
      categoryId: "cmjw3h0ng0004r6109y3u0jo1",
    },
    {
      name: "SUNNANÖ Parasol",
      numberInStock: 6,
      price: 50,
      categoryId: "cmjw3h0ng0004r6109y3u0jo1",
    },
  ];

  const result = await prisma.item.createMany({
    data: itemsData,
    skipDuplicates: true,
  });

  console.log(result);
}

//createItems();
