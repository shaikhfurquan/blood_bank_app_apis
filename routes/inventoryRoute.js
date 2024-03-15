import express  from "express";

import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createInventory } from "../controllers/inventoryController.js";

const inventoryRouter = express.Router();

inventoryRouter.post('/create-inventory' , isAuthenticated , createInventory)

export default inventoryRouter