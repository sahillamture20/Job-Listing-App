const express = require("express");
const router = express.Router();
const Job = require("../Model/Job");

router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json({
    message: "Job listing API is working fine.",
    status: true,
    date: new Date().toLocaleDateString(),
    jobs: jobs,
  });
});

//company name, logo url, job position, monthly salary, job type,
//remote, location, job description, about company, skills required, additional information = each user have this

router.post("/add", async (req, res) => {
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
