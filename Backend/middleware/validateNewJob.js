const validateNewJob = (req, res, next) => {
  // companyName, logoUrl, jobPosition, monthlySalary, jobType, remote, location, jobDescription, aboutCompany, skillsRequired = each user have this
  const {companyName, logoUrl, jobPosition, monthlySalary, jobType, location, jobDescription, aboutCompany, skillsRequired} = req.body;

  if ( !companyName || !logoUrl || !jobPosition || !monthlySalary || !jobType || !location || !jobDescription || !aboutCompany || !skillsRequired ) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }

  const validJobTypes = ["Full-Time", "Part-Time", "Internship"];
  const validSkills = Array.isArray(skillsRequired) && skillsRequired.every((skill) => typeof skill === "string");
  const validSalary = typeof monthlySalary === "number" && monthlySalary > 0;
  const validJobType = validJobTypes.includes(jobType);
  const validLogoUrl = logoUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i);

  if (!validJobType) {
    return res.status(400).json({
      message: "Invalid job type",
    });
  }
  if (!validSkills) {
    return res.status(400).json({
      message: "Invalid skills",
    });
  }
  if (!validSalary) {
    return res.status(400).json({
      message: "Invalid salary",
    });
  }
  if (!validLogoUrl) {
    return res.status(400).json({
      message: "Invalid logo URL",
    });
  }
  if(!validLogoUrl) {
    return res.status(400).json({
      message: "Invalid logo URL",
    });
  }
  next();
};

module.exports = validateNewJob;
