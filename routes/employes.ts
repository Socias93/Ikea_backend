import express from "express";
import { validate } from "./schemas/Employes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

const EMPLOYE_API = "/";
const EMPLOYE_API_ID = "/:id";
const NOT_FOUND = "Employe not found";

router.get(EMPLOYE_API, async (req, res) => {
  const employe = await prisma.employe.findMany();
  return res.send(employe);
});

router.get(EMPLOYE_API_ID, async (req, res) => {
  const employe = await prisma.employe.findFirst({
    where: { id: req.params.id },
  });
  if (!employe) return res.status(400).send(NOT_FOUND);

  return res.send(employe);
});

router.post(EMPLOYE_API, async (req, res) => {
  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const employe = await prisma.employe.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
    },
  });

  return res.send(employe);
});

router.put(EMPLOYE_API_ID, async (req, res) => {
  const employe = await prisma.employe.findFirst({
    where: { id: req.params.id },
  });
  if (!employe) return res.status(400).send(NOT_FOUND);

  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const newEmploye = await prisma.employe.update({
    where: { id: req.params.id },
    data: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
    },
  });

  return res.send(newEmploye);
});

router.delete(EMPLOYE_API_ID, async (req, res) => {
  const employe = await prisma.employe.findFirst({
    where: { id: req.params.id },
  });
  if (!employe) return res.status(400).send(NOT_FOUND);

  const deletedEmploye = await prisma.employe.delete({
    where: { id: req.params.id },
  });

  return res.send(deletedEmploye);
});

export default router;
