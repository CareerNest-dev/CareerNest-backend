// import dynamodb from "../../config/aws/dynamo_db_config.js";
// import {
//   calculateGrowth,
//   getTableCount,
//   groupBy,
//   scanFullTable,
//   searchInTable,
// } from "../../helper/admin_helper/getuser_data.js";
// Table names
const TABLES = {
    STUDENTS: "Students",
    MENTORS: "Mentors",
    RECRUITERS: "Providers",
};
//Get user type from table name



export const approve = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            message: "Job approved successfully",
        });
    } catch (err) {
        console.error("Error approving job:", err);
        res.status(500).json({
            success: false,
            message: "Failed to approve job",
        });
    }
};


export const reject = async (req, res) => {
    try {
        // Fetch counts for each user type in parallel

        res.status(200).json({
            success: true,
            message: "Job rejected successfully",
        });
    } catch (err) {
        console.error("Error rejecting job:", err);
        res.status(500).json({
            success: false,
            message: "Failed to reject job",
        });
    }
};



export const fetch = async (req, res) => {
    try {


        const jobs = [{
            id: 1,
            company: 'Software Engineering Intern',
            position: 'Tech Innovate',
            postDate: '2023-07-15',
            status: 'Pending',
            logo: 'https://via.placeholder.com/32'
        }, {
            id: 2,
            company: 'Marketing Director',
            position: 'Brand Builders',
            postDate: '2023-07-14',
            status: 'Approved',
            logo: 'https://via.placeholder.com/32'
        }];




        res.status(200).json({
            success: true,
            data: jobs,
        });


    } catch (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch jobs",
        });
    }
};




export const metrics_fetch = async (req, res) => {
    try {
        // Fetch counts for each user type in parallel

        res.status(200).json({
            success: true,
            data: {
                totalJobPosts: 120,
                pendingReview: 10,
                approvedPosts: 95,
                rejectedPosts: 15,
            },
        });
    } catch (err) {
        console.error("Error fetching job metrics:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch job metrics",
        });
    }
};