const getJobs=require('../Controllers/getJobs');
const getJobById=require('../Controllers/getJobById');
const express=require('express');
const { getFilteredJobs } = require('../Controllers/getFilteredJobs');

const router=express.Router();

router.get('/jobs',getJobs);
router.get('/jobs/:job_id',getJobById);
router.get('/jobs/filter',getFilteredJobs);

module.exports=router;