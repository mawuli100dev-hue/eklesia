
const express = require('express');
const cors = require('cors');
import * as dotenv from "dotenv";
dotenv.config();
import router from "../routes/readingRoute";

const app = express();

app.use(cors());
app.use(express.json());

// Routes

app.use('/api/lections', router)

export default app;