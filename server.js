const express = require("express");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/emailRoutes");
const fetch = require("node-fetch");

const app = express();
dotenv.config();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors()); // Use this after the variable declaration

app.use(express.json()); // tell the server to accept the json data from frontend

//Signup and login
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// Keep-alive functionality
const keepServerActive = () => {
  fetch('https://nodemailerapi-0cfa.onrender.com/email/keep-alive', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}), // Sending an empty JSON object as body
  })
    .then(response => response.json())
    .then(data => {
      console.log('Server kept alive:', data);
    })
    .catch(error => {
      console.error('Error keeping server alive:', error);
    });
};

// Send a POST request every 3 seconds (3000 milliseconds)
setInterval(keepServerActive, 3000);


