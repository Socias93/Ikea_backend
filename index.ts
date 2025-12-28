import express from "express";

const app = express();
const PORT = 5555;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
