import axiosInstance from '../api/axios'

export const getAllProfiles = async(token) => {
    try {
        const response = await axiosInstance.get('/api/v1/profiles', { headers: {"Authorization" : `Bearer ${token}`} })
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const getNearbyProfiles = async(username, token) => {
    try {
        const response = await axiosInstance.get('/api/v1/profiles/nearby/' + username, { headers: {"Authorization" : `Bearer ${token}`} })
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const getProfileById = async(id, token) => {
    try {
        const response = await axiosInstance.get('/api/v1/profiles/' + id, { headers: {"Authorization" : `Bearer ${token}`} })
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const createProfileForUser = async(username, profile, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = axiosInstance.post('/api/v1/profiles/users/' + username, profile, config)
        return response
    } catch(error) {
        return Promise.reject(new Error(error));
    }
}

export const updateProfile = async(id, profile, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = axiosInstance.put('/api/v1/profiles/update/' + id, profile, config)
        return response
    } catch(error) {
        return Promise.reject(new Error(error));
    }
}

export const uploadImageToProfile = async(id, image, token) => {
    var formData = new FormData();
    formData.append("image", image, "test.png")
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        const response = axiosInstance.post('/api/v1/profiles/image/' + id, formData, config)
        return response
    } catch(error) {
        return Promise.reject(new Error(error));
    }
}