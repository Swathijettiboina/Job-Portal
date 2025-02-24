const getJobs=require('../Controllers/getJobs');
const getJobById=require('../Controllers/getJobById');
const express=require('express');

const router=express.Router();

router.get('/jobs',getJobs);
router.get('/jobs/:job_id',getJobById);

module.exports=router;