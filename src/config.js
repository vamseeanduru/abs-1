import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "http://223.30.210.118:2017/ABSConnectService.svc/Rest/",
});
