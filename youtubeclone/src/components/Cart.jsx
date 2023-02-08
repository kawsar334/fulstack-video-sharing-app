import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import {format } from "timeago.js";



const Container = styled.div`

width:270px  ;
margin-bottom:${(props) => props.type === "sm" ? "10px" :"45px"};
cursor:pointer;
border-radius:10px;
overflow:hidden;
display:${(props)=>props.type === "sm" && "flex"} ;

`

const Image = styled.img`
        width:100% ;
        height:${(props)=>props.type === "sm" ? "150px" :"190px"}; 
        background:#999;
        object-fit:cover;
        border-radius:10px;
        overflow:hidden;
        border:1px solid white;

` ;

const Details = styled.div`
    display:flex;
    margin-top:16px;
    gap:12px; 
    justify-content:flex-start;
    padding: 0px 10px; 
` ;

const ChanelImg = styled.img`
    width:36px ;
    height:36px;
    border-radius:50%;
    object-fit:cover;
  display:  ${(props) => props.type === "sm" && "none"}; 

`

const Texts = styled.div`` ;
const Title = styled.h1`
font-size:16px;
color:${({theme})=>theme.text}

`  ;
const ChannelName = styled.h2`
font-size:14px ;
font-weight:400;
color:${({ theme }) => theme.textSoft};
margin:5px 0px; 

` ;
const Info = styled.div`
        font-size:14px;
        color:#444;
        font-weight:600;
        color:${({ theme }) => theme.textSoft};

`;

const Cart = ({ type, video }) => {
  const [user, setUser] = useState({});

  useEffect(()=>{
    const getUser = async()=>{
      try{
        const res = await axios.get(`/user/find/${video.userId}`);
        setUser(res.data);

      }catch(err){
        console.log(err.response.data);
      }
    };
    getUser();

  },[video.userId])
  return (
    <Link to={`/video/${video._id}`}>
    <Container type={type}>
              <Image src={video?.imgUrl || user?.img} alt="Loading..." type={type} />
              <Details type={type}>
                  <ChanelImg src={user?.img} alt="Loading..." type={type}  />
              <Texts>
                  <Title>{video.title} </Title>
                <ChannelName>{user.username} </ChannelName>
                <Info>{video?.views} views .{format(video.createdAt)} .</Info>
              </Texts>
          </Details>
    </Container>
    </Link>
  )
}

export default Cart



