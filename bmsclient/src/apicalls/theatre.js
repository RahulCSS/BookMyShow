import {axiosInstance} from ".";

// Create
export const AddTheatre = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/theatre/addtheatre',payload);
        return response.data;
    }catch(err){
        return err.response ? err.response.data : { status: false , message: 'Failed to add movie'};
    }
};

// Read
export const GetTheatreByOwner = async () => {
    try{
        const response = await axiosInstance.get('/api/theatre/gettheatrebyowner');
        return response.data;
    }catch(err){
        return err;
    }
};

export const GetTheatre = async () => {
    try{
        const response = await axiosInstance.get('/api/theatre/gettheatre');
        return response.data;
    }catch(err){
        return err;
    }
};

// Update
export const UpdateTheatre = async (payload) => {
    try{
        const response = await axiosInstance.put(`/api/theatre/updatetheatre`, payload);
        return response.data;
    }catch(err){
        return err;
    }
};

// Delete
export const DeleteTheatre = async (theatreId) => {
    try{
        const response = await axiosInstance.delete(`/api/theatre/deletetheatre/?theatreId=${theatreId}`);
        return response.data;
    }catch(err){
        return err;
    }
};