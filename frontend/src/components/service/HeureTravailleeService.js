import axios from 'axios';

const BASE_URL = "http://localhost:8080";

const HeureTravailleeService = {
  addHeureTravaillee: (heureTravaillee, token) => {
    return axios.post(BASE_URL, heureTravaillee, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getHeuresByEmploye: (employeId, token) => {
    return axios.get(`${BASE_URL}/employe/workhours/${employeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getHeuresByEmployeAndWeek: (employeId, token) => {
    return axios.get(`${BASE_URL}/workhours/${employeId}/week`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getCurrentMonthHoursWorkedByEmployee: (employeId, token) => {
    return axios.get(`${BASE_URL}/hoursworked/${employeId}/currentMonth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default HeureTravailleeService;
