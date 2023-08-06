import axios from "axios";
import {BASE_URL} from "../config";

export class SchedulerAPI {
    
    static async fetchOrganization(nid){
        try{
            const response = await axios.get(`${BASE_URL}organization/listOne/${nid}`)
            return response.data;
        } catch(e){
            console.log(e);
        }
    }

    static async login(username, password){
        try{
            const response = await axios.post(`${BASE_URL}user/login`,{username: username, password: password})
            return response.data;

        } catch(e){
            console.log(e)
        }
    }

    static async fetchRoutesByOrganization(organizationId){
        try{
            const response = await axios.get(`${BASE_URL}route/listByOrganization/${organizationId}`)
            return response.data
            
        } catch(e){
            console.log(e)
        }
    }

}
