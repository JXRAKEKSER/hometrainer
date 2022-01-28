const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const getAccessToken = (id) =>{
    const payload = {
        id: id
    }
    const {jwtSecretKey} = require('../config')
    return jwt.sign(payload, jwtSecretKey, {expiresIn:'15h'});
}
class AuthController{
    async registr(req, res){
        try{
            const { username, password} = req.body;
            const supposedUser = await User.findOne({username});
            if(supposedUser){
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword});
            await user.save();
            return res.json({message: 'Пользователь зарегестрирован'});
        }catch(e){
            return res.status(500).json({message: 'ошибка на сервере', error: e});
        }
    }

    async login(req, res){
        try{
            const { username, password } = req.body;
            
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({message: 'Пользователь не существует'})

            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(401).json({message: 'Пароль неверный'})
            }

            return res.status(200).json({jwt: getAccessToken(user._id)});

        }catch(e){
            return res.status(500).json({message: 'ошибка на сервере'});
        }
    }

    async check(req, res){
        try{

        }catch(e){
            return res.status(500).json({message: 'ошибка на сервере'});
        }
        
    }
}

module.exports = new AuthController();