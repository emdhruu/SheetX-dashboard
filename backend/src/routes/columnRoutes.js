import express from "express";
import { getColumns, addColumn } from "../controllers/columnController.js";
import authmiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/columns", authmiddleware, getColumns);
router.post("/columns", authmiddleware, addColumn);

module.exports = router;
