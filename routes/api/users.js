const express = require('express');
const router = express.Router();
const gravatar = require('gravatar')
const bcryt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

// local loader

const User = require('../../models/User');

// @route   POST api/users
// @desc    Test Register user
// @access  Public
router.post('/',
 [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6})
],
async(req, res) => {
    // console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password} = req.body;

    try {
        let user = await User.findOne({ email });

           // See if user exists
        if (user) {
            res.status(400).json({ errors: [{ msg: 'User already exists' }] }); 
        } 
    // Get users garvatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    user = new User({
        name,
        email,
        avatar,
        password
    });
    // Encrypt password
    const salt = await bcryt.genSalt(10);

    user.password = await bcryt.hash(password, salt);

    await user.save();

    // Return jsonWebtoken

        res.send('User registered')
    } catch(err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;