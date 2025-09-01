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


        const mentors = [{
            id: 1,
            name: 'Dr. Anna Sharma',
            role: 'Senior Product Manager',
            company: 'Google',
            experience: '10+ years',
            rating: 4.8,
            availability: 'Available',
            avatar: 'https://via.placeholder.com/64',
            skills: ['Product Strategy', 'UX Design', 'Team Leadership'],
            featured: true
        }, {
            id: 2,
            name: 'Benjamin Carter',
            role: 'Software Engineer',
            company: 'Microsoft',
            experience: '8 years',
            rating: 4.5,
            availability: 'Available',
            avatar: 'https://via.placeholder.com/64',
            skills: ['React', 'Node.js', 'Cloud Architecture'],
            featured: false
        }, {
            id: 3,
            name: 'Olivia Lee',
            role: 'Marketing Director',
            company: 'Salesforce',
            experience: '12 years',
            rating: 4.9,
            availability: 'Busy',
            avatar: 'https://via.placeholder.com/64',
            skills: ['Brand Strategy', 'Digital Marketing', 'Analytics'],
            featured: true
        }];




        res.status(200).json({
            success: true,
            data: mentors,
        });


    } catch (err) {
        console.error("Error fetching mentors:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch mentors",
        });
    }
};




