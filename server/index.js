import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

const app = express();

// TODO: Setup the model for the video so that a central db can store the videoURL as well as save the video upload path etc.

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
  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

  // TODO: Implement the queue instead of directly exec-ing here.
  // TODO: Better return segment. E.g, Save videoURL after queue is done procesing that video and then have the frontend only get the videoURL file directly if processing is done.
  // TODO: This means we have to have a gettter for the frontentd to check if we are done with processing the video requested. If no then have it sent to the queue for processing.
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec errror found with: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    const videoURL = `http://localhost:3000/uploads/course/${vidID}/index.m3u8`; // TODO:Figure out if blob url can be used instead of exposing m3u8?
    res.json({
      message: "Video succesffully converted to HLS",
      videoURL: videoURL,
      vidID: vidID,
    });
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
