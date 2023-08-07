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

    static async fetchDriverById(nid){
        try{
            const response = await axios.get(`${BASE_URL}driver/listOne/${nid}`)
            return response.data

            
        } catch(e){
            console.log(e)
        }
    }

    static async fetchVehicleById(nid){
        try{
            const response = await axios.get(`${BASE_URL}vehicle/listOne/${nid}`)
            return response.data

            
        } catch(e){
            console.log(e)
        }
    }

    static async fetchDriversByOrganization(nid){
        try{
            const response = await axios.get(`${BASE_URL}driver/listByOrganization/${nid}`)
            return response.data
        } catch(e){
            console.log(e)
        }
    }

    static async fetchVehiclesByOrganization(nid){
        try{
            const response = await axios.get(`${BASE_URL}vehicle/listByOrganization/${nid}`)
            return response.data
        } catch(e){
            console.log(e)
        }
    }

    static async updateRoute(routeId, driverId, vehicleId){

        try{
            const response = await axios.put(`${BASE_URL}route/update/${routeId}`,{
                driver_id: driverId,
                vehicle_id: vehicleId
            });
            return response
        } catch(e){
            return e
        }

    }

}
