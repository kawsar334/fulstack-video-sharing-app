import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Cart from './Cart';



const Container =styled.div``;

const Recommendation = ({tags}) => {
    const [videos, setVideos] =useState([])


    useEffect(()=>{
        const getVideos = async()=>{
            try{
                const res = await axios.get(`/video/tags?tags=${tags}`);
                setVideos(res.data);

            }catch(err){
                console.log(err);
            }

        }
        getVideos();

    },[tags])
  return (
    <Container>
        {

            videos.map((video)=>(

                <Cart type="sm" key={video._id} video={video} />
            ))
        }

    </Container>
  )
}

export default Recommendation