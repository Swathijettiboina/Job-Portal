const getJobs=require('../Controllers/getJobs');
const getJobById=require('../Controllers/getJobById');
const express=require('express');
const { getFilteredJobs } = require('../Controllers/getFilteredJobs');
const { storeJobSeeker, storeRecruiter } = require('../Controllers/userController');
const { loginUser } = require('../Controllers/loginController');

const { checkPremium, createCheckoutSession ,cd} = require("../Controllers/Premiumdata");

const router=express.Router();

router.get('/jobs',getJobs);
router.get('/jobs/:job_id',getJobById);
router.get('/jobs/filter',getFilteredJobs);
// Route to store Job Seeker data
router.post('/jobseeker', storeJobSeeker);

// Route to store Recruiter data
router.post('/recruiter', storeRecruiter);



router.post('/login', loginUser);



router.get('/check-premium/:number',checkPremium);
router.post("/create-checkout-session", createCheckoutSession);
router.get("/:number", cd)

module.exports=router;