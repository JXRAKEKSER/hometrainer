const {Schema, model} = require('mongoose');

const MyTrainsSchema = new Schema({
    user: {
        ref: 'User', 
        type: Schema.Types.ObjectId
    },
    trainsList: [
        {
        ref: 'Train',
        type: Schema.Types.ObjectId,
        
        }
    ]
})

module.exports = model('MyTrain', MyTrainsSchema);