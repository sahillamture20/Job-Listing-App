const express = require("express");
const router = express.Router();
const Job = require("../Model/Job");
const validateNewJob = require("../middleware/validateNewJob");

router.get("/", async (req, res) => {
  const {minSalary, maxSalary, jobType, location, remote} = req.query;
  console.log(minSalary, maxSalary, jobType, location);
  const jobs = await Job.find(
    {
      monthlySalary: {
          $gte: minSalary || 0,
          $lte: maxSalary || 999999999
      },
      jobType: jobType || { $exists: true },
      location: location || { $exists: true },
      remote: remote == 'true' || { $exists: true },
  }
  );
  res.status(200).json({
    message: "Job listing API is working fine.",
    status: true,
    date: new Date().toLocaleDateString(),
    jobs: jobs,
  });
});

//company name, logo url, job position, monthly salary, job type,
//remote, location, job description, about company, skills required, additional information = each user have this

router.post("/add", validateNewJob,async (req, res) => {
  const {
    companyName,
    logoUrl,
    jobPosition,
    monthlySalary,
    jobType,
    remote,
    location,
    jobDescription,
    aboutCompany,
    skillsRequired,
    additionalInformation,
    author,
  } = req.body;
  const newJob = new Job({
    companyName,
    logoUrl,
    jobPosition,
    monthlySalary,
    jobType,
    remote,
    location,
    jobDescription,
    aboutCompany,
    skillsRequired,
    additionalInformation,
    author,
  });
  await newJob.save();
  res.status(201).json({
    message: "Job created successfully",
    jobID: newJob._id,
  });
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job) {
      res.status(200).json({
        message: "Specific Job listing API is working fine.",
        status: true,
        date: new Date().toLocaleDateString(),
        job: job,
      });
    } else {
        res.status(404).json({
          message: "Job not found",
        });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
