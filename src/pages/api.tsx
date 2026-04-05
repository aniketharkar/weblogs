import axios from "axios";
import { config } from "./config";
import dayjs from "dayjs";


const data2="https://nodenativeapi.cirrius.in/api/v1/getModuleType";


export const getModuleData=async (data)=>{
     let response;
     let enviro=data.environment;
       try{
         if(enviro==="live"){
            response=await axios.post("https://nodenativelive.cirrius.in/api/v1/getModuleType",
           {
            clientId:data.clientid
           }
         )
        }else{
            response=await axios.post("https://nodenativeapi.cirrius.in/api/v1/getModuleType",
            {
            clientId:data.clientid
           }
         )
        }
         return response?.data;  
       }catch(error){
         const data=error;
         console.log("error",data);
         console.log("error in getting module data",error.message)
       }
}

export const getLogsData=async (data)=>{
       debugger
       try{
        const endday=dayjs(data.date).format("YYYY-MM-DD");
        const startday=dayjs(data.date).subtract(1,"day").format("YYYY-MM-DD");
        const types=data?.action; 
        const enviro=data?.environment;

        const payload = {
          clientId: data?.clientId,
          repcode: data?.repCode,
          startDate: types.includes("web")
            ? `${startday}T18:30:00.000Z`
            : startday,
          endDate: types.includes("web")
            ? `${endday}T18:30:00.000Z`
            : startday,
          moduleType: data?.moduletype,
          type: data?.action,
          search_after:data?.search_after
        };
        
        let response;

        if(enviro=="live"){
            response=await axios.post("https://nodenativelive.cirrius.in/api/v1/searchLog",
           payload
         )
        }else{
            response=await axios.post("https://nodenativeapi.cirrius.in/api/v1/searchLog",
            payload
         )
        }
         
        console.log("aniket api response",response.data.searchAfter)

         return {
          responseData:response?.data?.data,
          payload:data,
          searchAfter:response?.data?.searchAfter
         };  
       }catch(error){
         const data=error;
         console.log("error",data);
         console.log("error in getting module data",error.message)
       }
}