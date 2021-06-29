const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserShema = new schema({
    email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
    mokatabat: [
        {
            type: schema.Types.ObjectId,
            ref: 'mokatabat'
        }
    ]
});

module.exports = mongoose.model("USers",UserShema);