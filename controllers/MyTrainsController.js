const MyTrains = require('../models/MyTrains');
class MyTrainsRouter{
    async getMyTrainsList(req, res){
        MyTrains.findOne({user: req.data.id}).populate('trainsList')
        .then( myTrainsObj => {
            if(myTrainsObj && myTrainsObj.trainsList.length !== 0){
                return res.status(200).json({trainsList: myTrainsObj.trainsList});
            }
            return res.status(200).json({trains: []})
        })
        .catch( error => {
            return res.status(500).json({message: 'ошибка на сервере'})
        })
    }

    async addTrain(req, res){

           /*MyTrains.findOne({user: req.data.id }).populate({path: 'trainsList', match: {_id: req.body.train}})
           .then( match => {
               if(match.trainsList.length === 0){
                   
               }else{
                   return res.status(400).json({message: 'Такая тренировка уже добавлена'})
               }
           })
           .catch( e => console.log(e))*/
           /* MyTrains.findOneAndUpdate({user: req.data.id}, { $push: { trainsList: [req.body.train]} }, {
            new: true, // обработчик then получит на вход обновлённую запись
            runValidators: true, // данные будут валидированы перед изменением
            upsert: true // если пользователь не найден - он будет создан
           })
           .then( myTrain => {
                return res.status(200).json({id: req.body.train})
           }).catch( error => {
            console.log(error)
            return res.status(500).json({message: "ошибка на сервере"})
           })*/

           const supposeTrain = await MyTrains.findOne({user: req.data.id }).populate({path: 'trainsList', match: {_id: req.body.trainId}})
           
           if(supposeTrain === null || supposeTrain.trainsList.length === 0){
               try{
                 await MyTrains.findOneAndUpdate({user: req.data.id}, { $push: { trainsList: [req.body.trainId]} }, {
                    new: true, // обработчик then получит на вход обновлённую запись
                    runValidators: true, // данные будут валидированы перед изменением
                    upsert: true // если пользователь не найден - он будет создан
                   });
                   return res.status(200).json({id: req.body.trainId})
               }catch(e){
                   console.log(e)
                   return res.status(500).json({message: "ошибка на сервере"})
               }
            }else{

               return res.status(400).json({message: 'Такая тренировка уже добавлена'})
            }
    }

    async getMyTrain(req, res){
        try{
            const userTrains = await MyTrains.findOne({user: req.data.id}).populate('trainsList');
            const train = Array.from(userTrains.trainsList).find( train => {
                return train._id.toString() === req.params.id;
                
              });
              return res.status(200).json({train})
        }catch(e){
            return res.status(500).json({message: 'ошибка на сервере'})
        }
    }

    async getMyExercise(req, res){
        
        try {
            const userTrains = await MyTrains.findOne({user: req.data.id}).populate('trainsList');
            const train = Array.from(userTrains.trainsList).find( train => {
                return train._id.toString() === req.params.id;
            
            });
            return res.status(200).json({exercise: train.exercises[req.params.exerciseId]})
        } catch (error) {
            return res.status(500).json({message: 'ошибка на сервере'})
        }
    }

    async deleteTrain(req, res){
        try {
            await MyTrains.findOneAndUpdate({user: req.data.id}, { $pull: { trainsList: req.body.trainId} }, {
                new: true, // обработчик then получит на вход обновлённую запись
                runValidators: true, // данные будут валидированы перед изменением
               })
            return res.status(200).json({id: req.body.trainId})
        } catch (error) {
            return res.status(500).json({message: 'ошибка на сервере'});
        }
    }

}



module.exports = new MyTrainsRouter();