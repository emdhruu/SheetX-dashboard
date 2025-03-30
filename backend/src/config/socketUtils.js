import http from "http";
import { Server } from "socket.io";
import express from "express";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import googleSheetsRoutes from "../routes/googleSheetRoutes.js";
import User from "../models/User.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.user && !User.findById(req.user._id)) {
    req.logout();
    req.session.destroy();
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/google-sheets", googleSheetsRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("watchSheet", async (sheetId) => {
    // Fetch initial data
    const sheets = google.sheets({ version: "v4", auth: oauth2Client });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1",
    });

    socket.emit("updateSheet", response.data.values);

    // Simulate real-time updates (in a real app, use a proper event listener)
    setInterval(async () => {
      const newResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: "Sheet1",
      });
      socket.emit("updateSheet", newResponse.data.values);
    }, 5000);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export { io, server, app };
