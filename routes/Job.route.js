const express = require("express");
const router = express.Router();

const { createJob, getJobDetails, getAllJobs, deleteJob, updateJobDetails } = require("../Controllers/Job.Controller");

router.post("/job/create-job", createJob);
router.get("/job/:id", getJobDetails);
router.get("/jobs", getAllJobs);
router.delete("/:id", deleteJob);
router.put("/:id", updateJobDetails);

module.exports = router;