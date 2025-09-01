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



export const fetch = async (req, res) => {
    try {


        const users = [{
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'User',
            status: 'Active'
        }, {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'Admin',
            status: 'Active'
        }, {
            id: 3,
            name: 'Robert Johnson',
            email: 'robert.johnson@example.com',
            role: 'Recruiter',
            status: 'Inactive'
        }, {
            id: 4,
            name: 'Lisa Anderson',
            email: 'lisa.anderson@example.com',
            role: 'User',
            status: 'Active'
        }];



        res.status(200).json({
            success: true,
            data: users,
        });


    } catch (err) {
        console.error("Error fetching mentors:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch mentors",
        });
    }
};






export const metrics_fetch = async (req, res) => {
    try {



        res.status(200).json({
            success: true,
            data: {
                totalusers: 1500,
                activeUsers: 500,
                pendingApproval: 120,
                inactiveUsers: 100
            },
        });


    } catch (err) {
        console.error("Error fetching user metrics:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user metrics",
        });
    }
};




