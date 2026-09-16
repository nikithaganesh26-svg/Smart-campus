const express = require("express");

const app = express();

const visitorRoutes = require("./routes/visitorRoutes");

app.use(express.json());

app.use("/api/visitors", visitorRoutes);

app.get("/", (req, res) => {
    res.send("Smart Campus Backend is running!");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});