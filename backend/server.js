const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookies = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT;

// ✅ Connect DB before routes
connectDB();

app.use(cors({
  origin: 'http://localhost:3000', // ✅ Next.js frontend
  credentials: true,               // ✅ Allow cookies
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Now you can use bodyParser and other middleware
app.use(methodOverride("_method"));

app.use(cookies());
app.use(authMiddleware);

app.use('/uploads', express.static('uploads'));

// ✅ All other routes
app.use("/", require("./routes/loginRoutes"));
app.use("/", require("./routes/meRoutes"));
app.use("/api/documents", require("./routes/fileUploadRoutes"));


app.get('/', (req, res) => {
  res.send('Hello, your server is working!');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
