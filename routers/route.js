const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config= require('../config');
const checkJWT= require('../midlewares/check-jwt');

// router.get('/', ()=>{
//     console.log('get Request');
// })
// let secret='YograPradipta2020';

//start API Signup
router.post('/signup', (req, res, next) => {
    let user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;
    user.picture = user.gravatar();

    User.findOne({
        username: req.body.username
    }, (err, existingUser) => {
        if (existingUser) {
            res.json({
                success: false,
                message: 'Account with that email is already exist'
            });

        } else {
            user.save();

            var token = jwt.sign({
                user: user
            }, config.secret , {
                expiresIn: '7d'
            });

            res.json({
                success: true,
                message: 'Enjoy your token',
                token: token
            });
        }

    });
});
//end API Signup
// start API Login
router.post('/login', async (req, res, next)=>{
    User.findOne({username: req.body.username}, (err, user)=>{
        if(err)
        throw err;
        if (!user) {
            res.json({
                success:false,
                message:"Authentification failed, user not found"
            });
        }
        else if (user) {
            var validPass= user.comparePassword(req.body.password);
            if (!validPass) {
                res.json({
                    success: false,
                    message:"authtentication failed, wrong password"
                });
            }
            else{
                var token = jwt.sign({
                    user: user
                }, config.secret , {
                    expiresIn: '7d'
                });
                res.json({
                    success:true,
                    message:"enjoy your token",
                    token: token
                });
            }
        }
    });
});
// end API login

/* API User */
router.route('/profile')
    // API show user
    .get(checkJWT, (req,res,next)=>{
        User.findOne({_id:req.decoded.user._id}, (err, user)=>{
            res.json({
                success:true,
                user:user,
                message:"succesfull"
            });
        });
    })
    // API edit user
    .post(checkJWT, (req, res, next)=>{
        User.findOne({_id:req.decoded.user._id}, (err, user)=>{
            if (err) {
                return next(err);
            }
            if (req.body.name) {
                user.name= req.body.name;
            }
            if (req.body.username) {
                user.username= req.body.username;
            }
            if (req.body.password){
                user.password= req.body.password;   
            }
            user.isSeller= req.body.isSeller;

            user.save();
            res.json({
                success:true,
                message:'update uccsesfully'
            });
        });
    });
/* end API User */

/* Start API Addres */
router.route('/address')
    // API show Address
    .get(checkJWT, (req,res,next)=>{
        User.findOne({_id:req.decoded.user._id}, (err, user)=>{
            res.json({
                success:true,
                address:user.address,
                message:"succesfull"
            });
        });
    })
    // API edit Address
    .post(checkJWT, (req, res, next)=>{
        User.findOne({_id:req.decoded.user._id}, (err, user)=>{
            if (err) {
                return next(err);
            }
            if (req.body.addr1) {
                user.address.addr1=req.body.addr1;
            }
            if (req.body.addr2) {
                user.address.addr2=req.body.addr2;
            }
            if (req.body.city) {
                user.address.city=req.body.city;
            }
            if (req.body.state) {
                user.address.state=req.body.state;
            }
            if (req.body.country) {
                user.address.country=req.body.country;
            }
            if (req.body.postalCode) {
                user.address.postalCode=req.body.postalCode;
            }
            user.save();
            res.json({
                success:true,
                address:user.address,
                message:'update address succsesfully'
            });
        });
    });
/* End API Address */


// api tester
router.get('/', async (req, res, next) => {
    try {
        const val = await User.find()
        res.json(val)
    } catch (error) {
        res.send('error' + error);
    }
});

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    })
    try {
        const a1 = await user.save()
        res.json(a1)
    } catch (error) {
        res.send('error' + error)
    }
})

module.exports = router;