import { PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import s3Client from "../config/aws/s3_bucket_config.js";
import updateStudentProfile from "../helper/profile_update.js";
dotenv.config();

//update user
export const update = async (req, res) => {
  const {
    address,
    mobileNumber,
    skills,
    description,
    university,
    linkedin,
    company,
  } = req.body;
  const { id, role } = req.user;
  const file = req.file;
  // Validate input (optional fields, but ensure proper types if provided)
  if (skills && !Array.isArray(skills)) {
    return res.status(400).json({ error: "Skills must be an array" });
  }
  let profileurl = null;
  if (file) {
    try {
      const fileExtension = file.mimetype.split("/")[1];
      if (!["jpeg", "png", "gif"].includes(fileExtension)) {
        return res
          .status(400)
          .json({ error: "Only JPEG, PNG, or GIF files are allowed" });
      }
      const fileName = `profileimages/${id}_${Date.now()}.${fileExtension}`;
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read", // Adjust based on access needs
      };

      await s3Client.send(new PutObjectCommand(params));
      profileurl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION_DYNAMODB}.amazonaws.com/${fileName}`;
      //https://studentprofileimages.s3.ap-south-1.amazonaws.com/profileimages/user_1752822494381_goovoomot_1752822768975.jpeg
    } catch (error) {
      console.log("Error uploading to S3:", error);
      return res.status(500).json({ error: "Failed to upload image to S3" });
    }
  } else {
    console.log("no file attach");
  }
  const profileData = {
    address,
    mobileNumber,
    skills,
    description,
    university,
    linkedin,
    company,
  };
  try {
    const updateResult = await updateStudentProfile(
      id,
      role,
      profileData,
      profileurl
    );
    if (!updateResult.success) {
      return res.status(500).json({ error: updateResult.error });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      updatedAttributes: updateResult.updatedAttributes,
    });
  } catch (err) {
    console.error("Error in profile update endpoint:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
