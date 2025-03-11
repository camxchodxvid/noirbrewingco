import express from 'express';
import connectDB from './config/db.js';
import subscribeRoute from './routes/subscribe.js';
import dotenv from 'dotenv';
import path from "path";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const __dirname = path.resolve();
app.use('/api/subscribe', subscribeRoute);

if(process.env.NODE_ENV === "products") {
    app.use(express.static(path.join(__dirmane, "/frontend/dist")));
}

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
