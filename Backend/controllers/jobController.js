const Job = require("../model/Job");

//working with ID passed as params, try to implement when ID passed as query
function getJobById() {
  return async (req, res, next) => {
    try {
      console.log(req.params.id);
      const jobID = req.params.id;
      const job = await Job.findById(jobID);
      if (job) {
        res.status(200).json({
          message: `Job found with ID:${jobID}`,
          job: job,
        });
      } else {
        res.status(404).json({ message: `Job not found with ID:${jobID}` });
      }
    } catch (error) {
      next("Error Finding Job", error);
    }
  };
}

// Working
function createNewJob() {
  return async (req, res, next) => {
    try {
      const {
        companyName,
        title,
        description,
        logoUrl,
        jobPosition,
        salary,
        location,
        duration,
        locationType,
        information,
        jobType,
        skills,
      } = req.body;
      console.log(req.body);
      const refUserId = req.refUserId;
      const newJob = new Job({
        companyName,
        title,
        description,
        logoUrl,
        jobPosition,
        salary,
        location,
        duration,
        locationType,
        information,
        jobType,
        skills,
        refUserId,
      });
      await newJob.save();
      res.status(201).json({
        message: "Job added successfully",
        jobID: newJob._id,
      });
    } catch (error) {
      next({
        message: "Error Adding Job",
        error,
      });
    }
  };
}

function getFilteredJobs() {
  return async (req, res, next) => {
    try {
      const { title, skills } = req.query;
        console.log(title, skills);
      const jobs = await Job.find({
        title: title || { $exists: true },
        skills: skills || { $exists: true },
      });
      const filteredJobs = jobs.filter((job) => job.skills.includes(skills));
      //Handle this in the mongoose query itself
      res.status(200).json({
        message: "Jobs after filter",
        status: "Working",
        jobs: skills ? filteredJobs : jobs,
      });
    } catch (error) {
      next("Error Finding Jobs", error);
    }
  };
}

//working with ID passed as params, try to implement when ID passed as query
function updateExistingJob() {
  return async (req, res) => {
    try {
      const jobID = req.params.id;
      const {
        companyName,
        title,
        description,
        logoUrl,
        jobPosition,
        salary,
        location,
        duration,
        locationType,
        information,
        jobType,
        skills,
      } = req.body;
      const refUserId = req.refUserId;
      const updatedJob = await Job.findByIdAndUpdate(jobID, {
        companyName,
        title,
        description,
        logoUrl,
        jobPosition,
        salary,
        location,
        duration,
        locationType,
        information,
        jobType,
        skills,
        refUserId,
      });
      res.status(200).json({
        message: "Job updated successfully",
        job: updatedJob,
      });
    } catch (error) {
      next("Error Updating Job", error);
    }
  };
}

//working with ID passed as params, try to implement when ID passed as query
function deleteJob() {
  return async (req, res) => {
    try {
      const jobID = req.params.id;
      const deletedJob = await Job.findByIdAndDelete(jobID);
      if (deletedJob) {
        res.status(200).json({
          message: `Job with ID:${jobID} deleted successfully`,
        });
      } else {
        res
          .status(404)
          .json({ message: `Job with ID:${jobID} is not present.` });
      }
    } catch (error) {
      next("Error Deleting Job", error);
    // res.json({ message: "Job is not present"});
    }
  };
}

module.exports = {
  getJobById,
  createNewJob,
  getFilteredJobs,
  updateExistingJob,
  deleteJob,
};
