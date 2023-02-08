import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"  ;
import { loginFailure, loginStart, loginSuccess } from "../redux/AuthSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, Provider } from "../firebase";



const Container = styled.div`

display:flex;
align-items:center;
justify-content:center;
height:calc(100vh - 56px ) ;
color:${({theme})=>theme.text} ;


`
const Wrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
   background-color:${({ theme }) => theme.bgLight} ;
   padding:20px 50px   ;
   border:1px solid ${({ theme }) => theme.text} ;
   gap:10px ;

`  ;

const Title = styled.h1`
    font-size:24px ;
    font-weight:500;

    
` ;
const Subtitle = styled.h2`
font-size:20px;
font-weight:300;


` ;
const Input = styled.input`
    border:1px solid ${({ theme }) => theme.text}  ;
    border-radius:3px ;
    background:transparent;
    width:100%;
    padding:5px; 
` ;
const Button= styled.button`
    background:transparent;
    color:${({ theme }) => theme.text} ;
    padding:5px 10px ;
    border-radius:3px ;
    cursor:pointer;
    border:1px solid ${({ theme }) => theme.text} ;
`;
const More = styled.div`` ;
const Links = styled.div`

display:flex;
gap:10px;
color:${({ theme }) => theme.text} ;
cursor:pointer;


` ;


const Login = () => {
  const {currentUser, error, loading}= useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");




  //handling login function 
  const handleLogin = async(e)=>{
    e.preventDefault();
    try{
      dispatch(loginStart())
      const res = await axios.post("/auth/login/",{email,password});
   
      dispatch(loginSuccess(res.data));
      if(res.status===200){
        navigate("/random")
      }

    }catch(err){
      console.log(err);
      dispatch(loginFailure(err.response.data));
    }
  }



  const handleGoogle= (e)=>{
    e.preventDefault();
    signInWithPopup(auth, Provider)
      .then(async (res) => {
        dispatch(loginStart())
        try{

          const response = await axios.post("/auth/google",{
            username: res.user.displayName,
            email: res.user.email,
            img:res.user.photoURL,
            fromGoogle:true
          });
          dispatch(loginSuccess(response.data));
         
          if(response.status===200){
            navigate("/")
          }
        }catch(err){
          dispatch(loginFailure(err.response.data));
        }
        
 
      }).catch((err) => {
        console.log(err);
      })
  }
 

  // HANDLING REGISTRATION 
  const handleRegister= async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("/auth/register/",{username, email, password});
    
      console.log(res.data)
    }catch(err){
      alert(err.response.data)
    }

  }
    
  return (
    <Container>
        <Wrapper>
            <Title>Sign in</Title>
              <Subtitle>To continue to NewTube </Subtitle>
              <Input  type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
              <Input type="password" placeholder="Password." onChange={(e)=>setPassword(e.target.value)} />
              <Button  onClick={handleLogin}> Signin </Button>
              <Title>Or</Title>
              
        <Button onClick={handleGoogle}>signin with google</Button>
              
              <Title>Sign Up</Title>
              <Input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
              <Input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
              <Input type="password" placeholder="Password."  onChange={(e)=>setPassword(e.target.value)}/>
              <Button onClick={handleRegister}>Submit</Button>



                <More>
                    English (USA) 
                    <Links>
                    <Link to="#">Help</Link>
                      <Link to="#">Privacy</Link>
                      <Link to="#">Help</Link>
                      <Link to="#">Terms</Link>


                    
                    </Links>
                </More>


        </Wrapper>
    </Container>
  )
}

export default Login