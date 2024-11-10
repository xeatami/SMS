import axiosInstance from "../configs/axios.config";

const REST_API_URL = "/profile";

export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get(`${REST_API_URL}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Не удалось загрузить профиль.");
    }
};

export const updateUserProfile = async (userData) => {
    try {
        const response = await axiosInstance.put(REST_API_URL, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Не удалось обновить профиль.");
    }
};

export const changePassword = async (currentPassword, newPassword) => {
    try {
        await axiosInstance.put(`${REST_API_URL}/password`, {
            currentPassword,
            newPassword
        });
    } catch (error) {
        throw new Error(error.response?.data?.message || "Не удалось изменить пароль.");
    }
};