const learnerModel = require('../model/learner')
const bcrypt = require('bcrypt') //to encrypt the model
const jwt = require('jsonwebtoken') //use for to generating the web token

const create = (req,res,next) => {

    //here we destruture the object
    const {learner_name,learner_email,learner_password} = req.body

    learnerModel.create({
        learner_name,
        learner_email,
        learner_password
    }, (err,result) => {
        if(err)
        next(err)
        else
        res.status(200).json({
            status: "Success",
            message: "learner Added Successfully",
            data: result
        })
    })
} 

const login = (req,res,next) => {
    console.log("check1")
    learnerModel.findOne({learner_email:req.body.learner_email}, (err,result) => {
        if(err){
            next(err)
        }
        else{
            //here we can compare our password and given password
            if(bcrypt.compare(req.body.learner_password, result.learner_password)){
                const token = jwt.sign({id:result._id},req.app.get('secretKey'), {expiresIn:'1h'})
                res.json({
                    status:"Success",
                    message:"Successfully Logged in",
                    data: {
                        learner: result,
                        token: token
                    }
                })
            }
        }
    })
}

module.exports = {create, login}