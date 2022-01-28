const Train = require('../models/Train');
class TrainsController{
    async getTrainsList(req, res){
        try{
            const trainsCollection = await Train.find({});
            const trainsArray = Array.from(trainsCollection);
            
            return res.status(200).json({trains: trainsArray})
        }catch(e){
            return res.status(500).json({message: 'ошибка на сервере'});
        }
        
    }
    async getTrain(req, res){
        try{
           
            
           const train = await Train.find({_id : req.params.id});
            return res.status(200).json({train});

        }catch(e){
            return res.status(500).json({message: 'ошибка на сервере'});
        }
        
    }
    async getExercise(req, res){
        try{
           
            
            const train = await Train.findById({_id : req.params.id});
            const exercise = train.exercises[Number(req.params.exerciseId)];
            return res.status(200).json(exercise);
            

        }catch(e){
            return res.status(500).json({message: 'ошибка на сервере'});
        }
        
    }
}

module.exports = new TrainsController();