import express from "express";
import cors from "cors";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const app = express();

app.use(express.json());
app.use(cors());

app.post("/usuarios", async (req, res) => {
  await Prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req, body);
});

app.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

app.use("/", publicRoutes);
app.use("/", privateRoutes);

app.listen(27017, () => console.log("Servidor ok"));
