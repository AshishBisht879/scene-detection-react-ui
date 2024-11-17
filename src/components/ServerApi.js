import axios from 'axios';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BACKEND_URL;

export const fetchVideoNames = async()=>{
    try{
        const response  = await axios.get(`${SERVER_BASE_URL}/get_assets_processed`);
        if(response.status === 200){
            return response.data;
        }else{

            console.error(`\n\nUnexpected response code : ${response.status}`);
            throw new Error(`Unexpected response code : ${response.status}`)
        }

    }
    catch (error){
        console.error("\n\nError while fetching video name. func (fetchVideoName).",error.message);
        return {"data":[],"count":0};
    }
}

export const fetchSceneDetails = async (videoName) => {
    try{
        const response = await axios.get(`${SERVER_BASE_URL}/get_asset_data/${videoName}`);
        if(response.status === 200){
            return response.data;
        }else{
            console.error(`\n\nUnexpected response code : ${response.status}`);
            throw new Error(`Unexpected response code : ${response.status}`)
        }

    }
    catch(error){
        console.error("\n\nError fetching scene details. func (fetchSceneDetails). : ",error.message);
        return [];
    }
}

export const fetchVideoSignedUrl = async (videoName) => {
    try{
        const response  = await axios.get(`${SERVER_BASE_URL}/getSignedUrl/${videoName}`);
        if(response.status === 200){
            console.log(response.data)
            return response.data;
        }else{

            console.error(`\n\nUnexpected response code : ${response.status}`);
            throw new Error(`Unexpected response code : ${response.status}`)
        }

    }
    catch (error){
        console.error("\n\nError while fetching video name. func (fetchVideoSignedUrl).",error.message);
        return {error:true,messsage:"Error in fetchVideoSignedUrl."};
    }
}