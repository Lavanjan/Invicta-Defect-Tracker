const mongoose = require('mongoose');
autoIncreament = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb+srv://lavanjan:lavan1998@invicta-dts.euh5l.mongodb.net/invicta-dts?retryWrites=true&w=majority");
autoIncreament.initialize(connection);
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    userId: {type: Number, required: true},
    userName: {type: String, required: true},
    email: { type: String, required:true },
    password: {type: String, required: true},
    resetToken: String,
    expireToken: Date
},{
    timestamps: true
}
);

userSchema.plugin(autoIncreament.plugin, {
    model: 'user',
    field: 'userId',
    incrementBy:1,
    startAt:1
});
const user = mongoose.model('user', userSchema);

module.exports = user;