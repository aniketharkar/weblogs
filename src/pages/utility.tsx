import { Button, message, Space } from 'antd';


const displayMessage=({type,content})=>{
     const [messageApi,contextHolder]=message.useMessage(); 

     messageApi.open({type:type,content:content});

     return <>
     {contextHolder}
     <div></div>
     </>
}

export default displayMessage;

