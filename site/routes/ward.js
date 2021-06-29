const express = require("express");

const wardController = require("../controller/ward");

const router = express.Router();

router.get('/get-mokatbat'/*,isAuth*/,wardController.getMokatabat);
router.get('/get-mokatba'/*,isAuth*/,wardController.getMokatba);
//router.post("/make-order",1orderControl.postOrder);
// router.post('/send-email',isAuth,emailControl.postEmails);
// router.delete('/email/:emailID', isAuth, emailControl.deleteEmail);


module.exports = router;