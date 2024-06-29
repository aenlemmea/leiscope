import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
const app = express();

const storage = multer.diskStorage({
  destination: function (_req, _file, callback) {
    callback(null, "./uploads");
  },
  filename: function (_req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + uuidv4() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use((_req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "Orgin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads")); // Works for now. Might use buckets etc.

app.get("/", function (_req, res) {
  res.json({ message: "Hello from express!" });
});

app.post("/upload", upload.single("vid"), function (req, res) {
  res.json({ message: "Video Uploaded Successfully" });
  const vidID = uuidv4();
  const videoPath = req.file.path;
  const outputPath = `./uploads/movies/${vidID}`;
  const hlsPath = `${outputPath}/index.m3u8`;
  console.log("hlsPath", hlsPath);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
