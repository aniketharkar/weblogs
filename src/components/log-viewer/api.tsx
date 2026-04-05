import axios from "axios";


export const getModuleData=async (clientid)=>{
       try{
         const response=axios.post("http://4.213.179.58:8002/module/",{
           client_id: clientid
         })
         return response;  
       }catch(error){
         console.log("error in getting module data",error.message)
       }
}