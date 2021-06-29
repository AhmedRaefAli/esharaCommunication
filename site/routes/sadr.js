const express = require("express");

const sadrContokker = require("../controller/sadr");

const router = express.Router();

router.get('/get-mokatbat'/*,isAuth*/,sadrContokker.getMokatabat);
router.get('/get-mokatba'/*,isAuth*/,sadrContokker.getMokatba);


//router.post("/make-order",orderControl.postOrder);
// router.post('/send-email',isAuth,emailControl.postEmails);
// router.delete('/email/:emailID', isAuth, emailControl.deleteEmail);


module.exports = router;