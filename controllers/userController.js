 const User = require('../models/User');

 class UserController{
     async getUserInfo(req, res){
         try {
            const {username} = await User.findOne({user: req.data.id});
            return res.status(200).json({username});
         } catch (error) {
             return res.status(500).json({message: 'ошибка на сервере'});
         }
         
     }
 }

 module.exports = new UserController();