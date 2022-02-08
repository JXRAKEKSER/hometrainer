const {Schema, model} = require('mongoose');

const trainSchema = new Schema({
    title:{type: String, required: true, unique: true},
    exercises: [
        {
            title: {type: String, required: true},
            description: [
                {
                    type: String,
                }
            ],
            approaches: {type: Number, required: true},
            repetition: {type: String,required: true},
            previewImage: {type: String, required: true},
            exampleImage: {type: String, required: true}
        }
    ],
    image: {type: String, required: true}
})

module.exports = model('Train', trainSchema);