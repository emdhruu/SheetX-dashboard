import express from "express";
import { sheetData } from "../controllers/sheetDataController.js";
import AuthMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/data/:sheetId", AuthMiddleware, sheetData);
