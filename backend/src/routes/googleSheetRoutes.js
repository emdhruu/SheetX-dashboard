import express from "express";
import {
  getAuthUrl,
  getSheetData,
} from "../controllers/googleSheetController.js";
import authmiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/auth-url", authmiddleware, getAuthUrl);
router.get("/sheet-data", authmiddleware, getSheetData);

export default router;
