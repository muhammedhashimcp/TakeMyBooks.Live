const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const adminSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
});

adminSchema.pre("save", async function(next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);

    }
    next();

})

module.exports = mongoose.model("admin", adminSchema);