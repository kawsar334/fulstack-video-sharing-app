import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components" ;


const Container = styled.div`
flex:1 ;
background-color:${({theme})=>theme.bg};
color:${({theme})=>theme.text};
height:max-content;
position:sticky;
top:0;
left:0;
z-index :999;



`

const Wrapper = styled.div`
    padding:20px 26px  ;

`;
const Logo = styled.div`
    display:flex ;
    align-items:center;
    gap:5px ;
    margin:20px 0px ;
    color:${({theme})=>theme.text};


`
const Span = styled.span`
font-weight:600 ;
cursor:pointer;

` ;

const Item = styled.div`

display:flex; 
align-items:center;
gap:20px ;
cursor:pointer;
padding:7.5px  5px;
border-radius:20px;
transition:all 2s ease;
margin:5px 0px;


&:hover{
    background-color:${({theme})=>theme.soft} ;
}



` ;

const Hr= styled.hr`

margin:15px 0px ;
border:none;
border:0.5px solid ${({theme})=>theme.softColor}; 

`;
const Login = styled.div`
font-size:13px;


`
const Button = styled.button`

border:none;
padding:10px 20px ;
background:transparent ;
border:0.5px solid #3ea6ff; 
color:#3ea6ff; 
cursor:pointer;
margin-left:20px;
border-radius:3px ;
margin-top:10px ;
font-weight:500;
display:flex;
justify-content:center;
align-items:center;



`

const Title = styled.h2`
    font-size:14px;
    margin:10px 0px;
`



const Menu = ({ darkMode, setDarkMode }) => {
    const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>

        <Wrapper>
            <Link to="/">
            <Logo>
                  <i class="fa-brands fa-youtube" style={{color:"red", fontSize:"20px ",background:"inherit" }}></i><Span>Youtube</Span>
            </Logo>
            </Link>
            
            {/*  */}
            <Link to="/random">
            <Item>

                  <i class="fa-solid fa-house"></i>
                  <span>Home</span>
            </Item>
            </Link>
            <Link to="/trend">
              <Item>

                  <i class="fa-solid fa-money-bill-wheat"></i>
                  <span>Explore</span>
              </Item>
            </Link>
              <Item>

                  <i class="fa-solid fa-money-bill-wheat"></i>
                  <span>subscription</span>
              </Item>
              <Item>

                  <i class="fa-regular fa-bookmark"></i>
                  <span>Library</span>
              </Item>
              
              <Item>

                  <i class="fa-solid fa-clock-rotate-left"></i>
                  <span>History</span>
              </Item>

             <Hr />
              {currentUser?.others ? <Button>{currentUser?.others?.username}</Button>:  <>
              <Login>
               <p>
                Sign in to like videos , comment, and subscribe.
                </p> 

                <Link to="/login">
                  <Button><i class="fa-regular fa-circle-user"></i> SIGNIN</Button>
                </Link>

              </Login>
                  <Hr /></>}
              <Title>
                BEST OF YOUTUBE
              </Title>

              <Item>

                  <i class="fa-solid fa-house"></i>
                  <span>Home</span>
              </Item>

              <Item>

                  <i class="fa-solid fa-money-bill-wheat"></i>
                  <span>Explore</span>
              </Item>
              <Item>

                  <i class="fa-solid fa-money-bill-wheat"></i>
                  <span>subscription</span>
              </Item>
              <Item>

                  <i class="fa-regular fa-bookmark"></i>
                  <span>Library</span>
              </Item>

              <Item onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ?
                      <> <i class="fa-regular fa-sun"></i>
                          <span>Light Mode </span></> :
                      <><i class="fa-regular fa-moon"></i>
                          <span>Dark Mode </span> </>}
              </Item>

            
            {/*  */}
             

            
        </Wrapper>
    </Container>
  )
}

export default Menu