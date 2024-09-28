const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createClient } = require('@supabase/supabase-js');

const TaskRouter = require("./src/routes/task.routes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Agora o supabase estará disponível para ser utilizado nos controllers
app.use("/tasks", (req, res, next) => {
  req.supabase = supabase;
  next();
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port} !`));
