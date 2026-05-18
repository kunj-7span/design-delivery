import publicClient from "../api/public-client";
import axios from "axios";

export const authServices = {
    
    async loginUser(payload) {
        try {
            console.log(payload);
            const response = await publicClient.post("/auth/login", payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    async registerUser(payload) {
        try {
            console.log("Register User:", payload);
            const response = await publicClient.post("/auth/register", payload,
                {
                    headers: { "content-type": "multipart/form-data" }
                });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    async forgotPasswordUser(payload) {
        try {
            console.log("Forgot Password User:", payload);
            const response = await publicClient.post("/auth/forgot-password", payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    async verifyOtp(payload) {
        try {
            console.log("Verify OTP User:", payload);
            const response = await publicClient.post("/auth/verify-otp", payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    async resendOtp(payload) {
        try {
            const response = await publicClient.post("/auth/reset-otp", payload)
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    async resetPassword(payload) {
        try {
            const response = await publicClient.post("/auth/reset-password", { payload })
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Generate upload URL for S3
    async generateUploadUrl(fileName, contentType) {
        try {
            const res = await publicClient.post("/upload/generate-avatar-url", {
                fileName,
                contentType
            });
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Upload file to S3
    async uploadFileToS3(uploadUrl, file, contentType) {
        try {
            const res = await axios.put(uploadUrl, file, {
                headers: {
                    "Content-Type": contentType,
                },
            });
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

};