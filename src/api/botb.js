import axiosInstance from '../api/axios'

export const createBOTBForUser = async(username, botb, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = axiosInstance.post('/api/v1/botb/users/create/' + username, botb, config)
        return response
    } catch(error) {
        return Promise.reject(new Error(error));
    }
}

export const getBOTBByUrlSlug = async(urlSlug, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axiosInstance.get('/api/v1/botb/slug/' + urlSlug, config)
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const addUserToBOTB = async(username, botbId, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axiosInstance.put('/api/v1/botb/users/add/' + username + '/' + botbId, config)
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const addTrackToBOTB = async(username, botbId, track, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axiosInstance.post('/api/v1/botb/tracks/add/' + username + '/' + botbId, track, config)
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const voteOnBOTBTrack = async(username, seedId, botbId, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axiosInstance.post('/api/v1/botb/votes/add/' + username + '/' + seedId + '/' + botbId,  config)
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const removeVoteFromBOTBTrack = async(username, seedId, botbId, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axiosInstance.post('/api/v1/botb/votes/remove/' + username + '/' + seedId + '/' + botbId, config)
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const updateBOTB = async(id, botb, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = axiosInstance.put('/api/v1/botb/update/' + id, botb, config)
        return response
    } catch(error) {
        return Promise.reject(new Error(error));
    }
}

export const deleteBOTB = async(botbId, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axiosInstance.delete('/api/v1/botb/' + botbId, config)
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}