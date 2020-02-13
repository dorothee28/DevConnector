const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// local import
const User = require('../../models/User')

// @route   GET api/Auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/',
 [
    check('email', 'Please include a valid email').isEmail(),
    check( 'password','Password is required').exists()
],
async(req, res) => {
    // console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password} = req.body;

    try {
        let user = await User.findOne({ email });
           // See if user exists
        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials ' }] }); 
        } 

    // Compare to make,that user-email match and password == password.user
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials ' }] }); 
    } 
    

    // Return jsonWebtoken
    // get the payload who include id
    const payload = {
        user: {
            id: user.id
        }
    }
// sign token
    jwt.sign(payload, 
        config.get('jwtSecret'),
         { expiresIn: 360000},  //expiration token recommanded
        (err, token) => {
            if(err) throw err;
            res.json({ token })

        });

        // res.send('User registered')
    } catch(err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;