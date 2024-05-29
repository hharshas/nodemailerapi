const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controllers/emailControllers");

router.post("/sendEmail", sendEmail);
router.post("/keepalive", (req, res) => {
    res.status(200).send("Server is alive");
});

module.exports = router;
