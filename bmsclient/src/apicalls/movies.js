import {axiosInstance} from ".";

// Create
export const AddMovie = async (payload) => {
    try{
        console.log(payload);
        const response = await axiosInstance.post('/api/movie/addmovie',payload);
        console.log(response);
        return response.data;
    }catch(err){
        return err.response ? err.response.data : { status: false , message: 'Failed to add movie'};
    }
};

// Read
export const GetMovie = async () => {
    try{
        const response = await axiosInstance.get('/api/movie/getmovie');
        return response.data;
    }catch(err){
        return err;
    }
};

// Update
export const UpdateMovie = async (payload) => {
    try{
        const response = await axiosInstance.put(`/api/movie/updatemovie`, payload);
        return response.data;
    }catch(err){
        return err;
    }
};

// Delete
export const DeleteMovie = async (movieId) => {
    try{
        const response = await axiosInstance.delete(`/api/movie/deletemovie/?movieId=${movieId}`);
        return response.data;
    }catch(err){
        return err;
    }
};