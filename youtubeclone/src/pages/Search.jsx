import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Cart from '../components/Cart';

const Search = () => {

    const title= useLocation().search
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`/video/search${title}`);
                setVideos(res.data);
            } catch (err) {
                console.log(err.response.data);
            }

        }
        fetchVideos();

    }, [title])
  return (
    <div>
        {videos.map((video)=>(
            <Cart key={video._id} video={video} />

        ))}

    </div>
  )
}

export default Search