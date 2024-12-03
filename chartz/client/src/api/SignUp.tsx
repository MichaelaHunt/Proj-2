import axios from "axios";

export const signUp = async (formData: {
    username: string;
    email: string;
    password: string;
}) => {
    const response = await axios.post("http://localhost:3000/users/signup", formData);
    return response.data;
};