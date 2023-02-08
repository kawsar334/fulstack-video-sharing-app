import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components"
import Cart from "../components/Cart";
import Comments from "../components/Comments";
import { fetchVideoFailure, fetchVideoStart, fetchVideoSuccess } from "../redux/videoSlice";
import Recommendation from "../components/Recommendation";


const Container = styled.div`

display:flex;
gap:24px; 


` ;

const Content = styled.div`
    flex:5;
` ;

const VideoWrapper = styled.div``
const Title = styled.h1`
    font-size:18px;
    font-weight:600;
    margin-bottom:10px;
    color:${({theme})=>theme.text}

`;
const Details = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
     
`;
const Info = styled.span`
    color:${({ theme }) => theme.textSoft}
`;
const Buttons= styled.div`
    display:flex;
    gap:15px ;

` ;
const Button = styled.button`
    padding:5px 10px ;
    border:none;
    cursor:pointer;
    backgroun:${({theme})=>theme.bg} ;
    border-radius:20px;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:5px;
` ;
const Hr = styled.hr`
border:0.5px solid ${({theme})=>theme.soft} ;
margin:15px 0;

`
const Channel = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;

`
const Channelnfo = styled.div`
    display:flex;
    gap:20px;
` ;
const Image = styled.img`
    width:50px;
    height:50px;
    border-radius:50%;
`
const ChannelDetails = styled.div`
    display:flex;
    flex-direction:column;
    color:${({theme})=>theme.text} ;
` ;
const ChannelName= styled.span`
font-weight:600;
text-transform:capitalize;


`
const  ChannelCounter = styled.div`
    margin-top:5px;
    margin-bottom:20px;
    color:${({theme})=>theme.textSoft}
    font-size:12px;
` ;
const Description = styled.div`
    font-size:14px;
    text-align:justify;
    margin-right:20px ;
    width:650px;
` ;
const Subscribe  = styled.button`
    background-color:#cc1a00; 
    color:white;
    border:none;
    border:1px solid white;
    padding:10px 20px ;
    font-weight:500;
    cursor:pointer;
    border-radius:20px ;

`
// Recomendetion start =============================
const Recommend = styled.div`
flex:2;
` ;


const Video = () => {
    const id = useLocation().pathname.split("/")[2];
    const { currentUser } = useSelector((state) => state.user);
    const { currentVideo } = useSelector((state) => state.video);
    const dispatch = useDispatch();
    const [channel, setChannel] = useState({});
   
    useEffect(()=>{
        const getVideo= async()=>{
            dispatch(fetchVideoStart())
            try{
                const res = await axios.get(`/video/find/${id}`);
               
                dispatch(fetchVideoSuccess(res.data))

            }catch(err){
                console.log(err.response.data);
                dispatch(fetchVideoFailure(err.response.data))
            }
        }
        getVideo();
    },[id,dispatch]);


    useEffect(()=>{
        const getChannel= async()=>{
            try{    
                const res = await axios.get(`/user/find/${currentVideo?.userId}`);
                setChannel(res.data);
            }catch(err){
                console.log(err.response.data)
            }
        }
        getChannel();
    }, [currentVideo?.userId,id ])


    ///handlelike 
    const handleLike = async(e)=>{
        e.preventDefault();
        try{

            const res = await axios.put(`/video/like/${currentVideo._id}`);
            console.log(res.data)
        }catch(err){
            alert(err.response.data);
        }
    };

    //handiling dislike function
    const handleDislike = async(e)=>{
        e.preventDefault();
        try{
            await axios.put(`/video/dislike/${currentVideo._id}`);
          

        }catch(err){
            alert(err.response.data);
        }
    };

    //handling subscrib function 
    const handleSubscribe = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.put(`/user/sub/${channel._id}`);
            console.log(res.data)

        }catch(err){
            console.log(err.response.data);
        }
    };

    //handling unsubscribe function 
    // const handlUnsubscribe = async(e)=>{
    //     e.preventDefault();
    //     try{
    //         const res = await axios.put(`/user/unsub/${channel._id}`);
    //         console.log(res.data);

    //     }catch(err){
    //         console.log(err.response.data);
    //     }
    // }

  return (
    <Container>
<Content>
    <VideoWrapper>
               
                  <video src={currentVideo?.videoUrl} autoPlay  controls style={{
                    width:"100%",
                    height:"450px",
                    objeFit:"cover"
                  }}/>
    </VideoWrapper>
              <Title>{currentVideo?.title} </Title>
    <Details>
                  <Info>{currentVideo?.views} views</Info>
        <Buttons>
                      {currentVideo?.like?.includes(currentUser?.others?._id) ? <Button onClick={handleLike}>{currentVideo?.like?.length}  <i class="fa-solid fa-thumbs-up" style={{ color: "crimson" }}></i></Button> : <Button onClick={handleLike}>{currentVideo?.like?.length}  <i class="fa-solid fa-thumbs-up" ></i></Button>}
                      {currentVideo?.dislike?.includes(currentUser?.others?._id)?<Button onClick={handleDislike}>{currentVideo?.dislike?.length}  <i class="fa-solid fa-thumbs-down" style={{color:"blue"}} ></i></Button>:<Button onClick={handleDislike}>{currentVideo?.dislike?.length}  <i class="fa-solid fa-thumbs-down" ></i></Button>}
                      <Button>Share <i class="fa-solid fa-share"></i></Button>
                      <Button>Embade <i class="fa-solid fa-crop-simple"></i></Button>
        </Buttons>
    </Details>
    <Hr />
    <Channel>
        <Channelnfo>
            <Image src={channel.img} />
            <ChannelDetails>
                <ChannelName>{channel?.username}</ChannelName>
                          <ChannelCounter>{channel?.subscribers} subscriber </ChannelCounter>
                <Description>
                  {currentUser?.desc} 
                </Description>

                
            </ChannelDetails>
        </Channelnfo>
                  {<Subscribe onClick={handleSubscribe}>{currentUser.others.subscribedUsers.includes(channel?._id) ?"Subscribe ":"SUBSCRIBED"}</Subscribe>}
    </Channel>
    <Hr />

    <Comments videoId={currentVideo?._id} userId={currentUser?.others._id} /> 

</Content>
{/* recommendation section start here  */}
          <Recommend>
              {/* <Cart type="sm" />
              <Cart type="sm" />
              <Cart type="sm" />
              <Cart type="sm" />
              <Cart type="sm" />
              <Cart type="sm" /> <Cart type="sm" />
              <Cart type="sm" />
              <Cart type="sm" /> <Cart type="sm" />
              <Cart type="sm" />
              <Cart type="sm" /> <Cart type="sm" />
              <Cart type="sm" />
              <Cart type="sm" /> */}

              <Recommendation  tags={currentVideo?.tags}/>
             

    
          </Recommend>

    </Container>
  )
}

export default Video