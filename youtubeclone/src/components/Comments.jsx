import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components"

import Comment from "./Comment"

const Container = styled.div`` ;

const NewComment = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
` ;
const Avatar = styled.img`
    width:50px;
    height:50px;
    border-radius:50%;
    object-fit:cover;


`
const Input = styled.input`
    border:none;
    border-bottom:1px solid ${({ theme }) => theme.textSoft}  ;
    background:transparent;
    width:100%;
    outline:none;


` ;
const AddBtn = styled.button`
padding:5px ;
border:none;
cursor:pointer;
border-radius:5px;
font-weight:600;
`;

const Comments = ({videoId, userId}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState("");
  
  
  useEffect(()=>{
    const getComments=async()=>{
      try{
        const res = await axios.get(`/comment/find/${videoId}`);
       setComments(res.data);

      }catch(err){
        console.log(err.response.data);
      }
    }
    getComments();

  },[videoId]);

//creating new comment 
const handleClick =async(e)=>{
  e.preventDefault();
  try{
    const res = await axios.post(`/comment/addcomment/`,{desc,videoId});
    console.log(res.data)

  }catch(err){
    console.log(err.response.data);
  }
};



  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser.others.img} alt="Loading..."/>
            <Input placeholder="Add a comment..."onChange={(e)=>setDesc(e.target.value)}  /> 
            <AddBtn onClick={handleClick}>
                Add
              </AddBtn>  
        </NewComment>

        {comments.map((comment)=>(
          <Comment  key={comment._id} comment={comment} />

        ))}
       
    </Container>
  )
}

export default Comments