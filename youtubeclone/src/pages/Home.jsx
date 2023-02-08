import { useEffect, useState } from "react"
import styled from "styled-components"
import Cart from "../components/Cart"
import axios from "axios";




const Container = styled.div`

    display:flex;
    justify-conent: space-around ;
    align-items:center;
    flex-wrap:wrap;
    gap:10px ;
    background:${({theme})=>theme.bg}

`
const Home = ({type}) => {
  const [videos, setVideos]= useState([]);
  
  useEffect(()=>{
    const getData =  async()=>{
      try{
        const res = type ?await axios.get(`/video/${type}`) :await axios.get("/video/");
      setVideos(res.data)
      }catch(err){
        console.log(err.response.data)
      }
    }
    getData();
  },[type])

  return (
    <Container>

      {videos.map((video)=>(
        <Cart  key={video._id} video={video}/>

      ))}
         
        
       

    
    
    </Container>
  )
}

export default Home


