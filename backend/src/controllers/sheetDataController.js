import jwt from "jsonwebtoken";
import { getGoogleSheetData } from "./googleSheetsController.js";

export const sheetData = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sheetId = req.params.sheetId;

    const data = await getGoogleSheetData(decoded.accessToken, sheetId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sheet data" });
  }
};
