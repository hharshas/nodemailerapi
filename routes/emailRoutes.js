const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controllers/emailControllers");

router.post("/sendEmail", sendEmail);

router.post('/keep-alive', (req, res) => {
    res.status(200).send({ message: 'Server is alive' });
});

module.exports = router;
