const JobModel = require("../Models/Job.Model");

const createJob = async (request, response) => {
    try{
        const {role, role_description, role_category} = request.body;
        if(!role){
            return response.status(404).json({
                success:false,
                message:"A role must be provided"
            })
        }
        const new_job = new JobModel({
            role:role,
            role_description:role_description,
            role_category:role_category
        })
        await new_job.save();
        return response.status(200).json({
            success:true,
            message:"Job created!",
            new_job
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Unable to create job"
        })
    }
}

const getJobDetails =  async (request, response, next) => {
    try{
        const {id} = request.params;
        const job_details = await JobModel.findById(id).exec();
        if(!job_details){
            return response.status(404).json({
                success:false,
                message:"No Job with this ID found"
            })
        }
        return response.status(200).json({
            success:false,
            message:"Job details found!",
            job_details
        })
    }catch(error){
        console.error(error);
        return response.status(400).json({
            success:false,
            message:"Could not get job details"
        })
    }
}

const getAllJobs = async (request, response, next) => {
    try{
        const allJobs = await JobModel.find().exec();
        return response.status(200).json({
            success:true,
            message:"All Jobs",
            allJobs
        })
    }catch(error){
        console.error(error)
        return response.status(400).json({
            success:false,
            message: "Error occurred while attempting to get all the jobs!"
        })
    }
}

const deleteJob = async (request, response, next) => {
    try{
        const {id} = request.params;
        const deleteJob = await JobModel.findByIdAndDelete(id).exec();
        if(!deleteJob){
            return response.status(404).json({
                success:false,
                message:"Unable to delete this job!"
            })
        }
        return response.status(200).json({
            success: true,
            message:"Job deleted successfully!"
        })
    }catch(error){
        console.error(error);
        return response.status(400).json({
            success:false,
            message:"Error occureed when deleting the job"
        })
    }
}

const updateJobDetails = async (request, response, next) => {
    const {id} = request.params;
    try{
        const updatedJob = await JobModel.findByIdAndUpdate(id, {
            role:request?.body?.role,
            role_description:request?.body?.role_description,
            role_category:request?.body?.role_category
        })
        if(!updatedJob){
            return response.status(404).json({
                success:false,
                message:"Job not updated!"
            })
        }       
        return response.status(200).json({
            success:true,
            message:"Job successfully updated!",
            updatedJob
        })

    }catch(error){
        console.error(error);
        message:"Error occurred updating this job details"
    }
}

module.exports = {
    createJob,
    getJobDetails,
    getAllJobs,
    deleteJob,
    updateJobDetails
}

