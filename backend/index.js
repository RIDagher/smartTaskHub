import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// default route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Smart Task Hub Backend!" });
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})