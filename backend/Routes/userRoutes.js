const express = require('express');
const { storeJobSeeker, storeRecruiter } = require('../Controllers/userController');
const router = express.Router();
const { loginUser } = require('../Controllers/loginController');
// Route to store Job Seeker data
router.post('/jobseeker', storeJobSeeker);

// Route to store Recruiter data
router.post('/recruiter', storeRecruiter);


router.post('/login', loginUser);
module.exports = router;
