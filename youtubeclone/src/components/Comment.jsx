import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { format } from "timeago.js";



const Container = styled.div`
    display:flex;
    gap:10px; 
    margin:30px 0px;
` ;
const Avatar = styled.img`
    width:50px;
    height:50px;
    border-radius:50%;
    object-fit:cover;


`

const Details = styled.div`
display:flex;
flex-direction:column;
gap:10px; 

`
const Name = styled.span`
font-size:16px;
font-weight:600;
color:${({ theme }) => theme.text};


` 
const Date = styled.span`
     font-size:12px;
     color:${({theme})=>theme.textSoft} ;
     font-weight:400;
     margin-left:5px;
` 
const Text = styled.span`
    font-size:14px;
    color:${({ theme }) => theme.textSoft} ;



` ;


const Comment = ({ comment }) => {
    const [user, setUser] =useState({});


    useEffect(()=>{
        const getUser = async()=>{
            try{

                const res = await axios.get(`/user/find/${comment?.userId}`);
                setUser(res.data)
            }catch(err){
                console.log(err.response.data)
            }
        }
        getUser();
    },[comment?.userId])
  return (
    <Container>

          <Avatar src={user?.img} alt="Loading..."/>
<Details>
    <Name>{user?.username} <Date>{format(comment?.createdAt)}</Date> </Name>
    <Text>{comment?.desc}</Text>
</Details>

    </Container>
  )
}

export default Comment