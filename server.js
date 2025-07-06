import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is ready to use");
});

//start server
app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});
