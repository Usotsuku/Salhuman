import axios from "axios";

class PayrollService {
    static BASE_URL = "http://localhost:8080";

    static async getAllFichePaie(token) {
        try {
            const response = await axios.get(`${PayrollService.BASE_URL}/fiche_paie/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getAllFichePaieByEmploye(employeId, token) {
        try {
            const response = await axios.get(`${PayrollService.BASE_URL}/fiche_paie/employe/${employeId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getPayrollByMonth(employeId, periode, token) {
        try {
            const response = await axios.get(`${PayrollService.BASE_URL}/fiche_paie/employe/${employeId}/periode/${periode}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getPayrollByPeriod(periode, token) {
        try {
            const response = await axios.get(`${PayrollService.BASE_URL}/fiche_paie/periode/${periode}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getPayrollById(ficheId, token) {
        try {
            const response = await axios.get(`${PayrollService.BASE_URL}/fiche_paie/fiche/${ficheId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default PayrollService;
