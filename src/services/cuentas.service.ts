import axios from "axios";

export const getAll = async (userId: string) => {
    try {
        const response = await axios.get(
            `/api/cuentas?userId=${userId}`
        );
        if (response.status === 200) {
            return response.data;
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

const cuentasService = {
    getAll,
};

export default cuentasService;
