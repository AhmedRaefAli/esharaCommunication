const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MokatbaaShema = new schema({
    mokatbaNumber:{
        type:Number,
        require:true},
    date:{
        type:Date,
        require:true},
    ta2shera:{
        type:String,
        require:true},
    elGeha: [
        {
          type: schema.Types.ObjectId,
          ref: 'USers'
        }
      ],
    file:{
        type:String,
        require:true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("wardmokatabat",MokatbaaShema);