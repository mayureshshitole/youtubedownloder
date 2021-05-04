const express = require("express");
const ytdl = require("ytdl-core");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

app.get("/videoinfo", async (req, res) => {
  const videoURL = req.query.videoURL;
  const info = await ytdl.getInfo(videoURL);
  res.status(200).json(info);
});

app.get("/download", function (request, response) {
  const videoURL = request.query.videoURL;
  const itag = request.query.itag;
  response.header("Content-Disposition", 'attachment; filename="video.mp4"');
  ytdl(videoURL, {
    filter: (format) => format.itag == itag,
  }).pipe(response);
});
const port = process.env.PORT || '5000';
app.listen(port, () => {
  console.log("Running");
});
