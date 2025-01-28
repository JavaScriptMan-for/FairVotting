const { model, Schema } = require('mongoose')

const schema = new Schema({
    username: {type: String, required: true, unique: true},
    candidateId: {type: Number, required: true}
})

module.exports = model("Vote", schema)