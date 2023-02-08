import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import App from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Container =styled.div`
    width:100vw;
    height:100vh;
    background:rgba(0,0,0,0.4);
    position:absolute;
    left:0px;
    top:0px;
    z-index:999;

`;
const Wrapper =styled.div`
    width:600px;
    height:700px;
    background:#ffff;
    margin:20px auto ;
    border-radius:10px;
    position:relative;
    padding:10px 20px;
    display:flex;
    flex-direction:column ;
    gap:10px;



`;
const Close=styled.span`
    cursor:pointer;
    color:crimson;
    position:absolute;
    right:20px;
    top:10px ;
    font-size:20px;
    fontWeight:600;



`;
const Title = styled.h1`
    color:#555;

`;
const Input =styled.input`

    padding:10px ;
`;
const Description = styled.textarea``;
const Label=styled.label`

    cursor:pointer;
    color:#555;
    font-weight:600;
`;

const Button = styled.button`
    
border:none;
padding:10px 20px ;
background:transparent ;
border:0.5px solid #3ea6ff; 
color:#3ea6ff; 
cursor:pointer;
margin-left:20px;
border-radius:3px ;
font-weight:500;
display:flex;
justify-content:center;
align-items:center;

`;

const Upload = ({ setOpen }) => {

    const [img, setImg] =useState(undefined);
    const [video,setVideo] =useState(undefined);
    const [imgPerc, setImgPerc]=useState(0)
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setINputs]=useState({})
    const [tags, setTags] =useState([]);
    const navigate= useNavigate();
   
   
    const handleChange =(e)=>{
    setINputs((prev)=>{
        return{
            ...prev, [e.target.name]:e.target.value
        }
    })

}
    
    
    const upload =(file,urlType)=>{
        const storage = getStorage(App);
        const filename = new Date().getTime() +file.name ;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);

       
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress)
                urlType === "imgUrl" ? setImgPerc(Math.ceil(progress)) :
                 setVideoPerc(Math.ceil(progress) );
                // urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default :
                    break ;
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                
                    setINputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    });



                });
            }
        );


    }

    //video 
    useEffect(()=>{
      video && upload(video,"videoUrl")

    },[video]);

// image 
    useEffect(() => {
     img && upload(img,"imgUrl")

    }, [img]);


    const handliUpload =async(e)=>{
        e.preventDefault();
        try{

            const res = await axios.post(`/video/addvideo/`,{...inputs,tags});
            console.log(res.data)
            if(res.status=== 200){
                navigate("/");
            }
        }catch(err){
            console.log(err.response.data);
        }
    }

  return (
    <Container>
        <Wrapper>
            <Title>Upload New video </Title>
              <Close onClick={() => setOpen(false)}>x</Close>
              <Label >Video</Label>
              {videoPerc > 0 ? videoPerc + "%" : <Input type="file" accept='video/*'  onChange={(e)=>setVideo(e.target.files[0])}/>}
              <Input type="text" name='title' placeholder='Title' onChange={handleChange}/>
              <Description name='desc' placeholder='Description' rows={8} onChange={handleChange}></Description >
            <Label >Tags</Label>
            <Input type="text" placeholder='Separate with commas.'  onChange={(e)=>setTags(e.target.value.split(","))}/>
            <Label htmlFor="imgUrl">ThumbNail image</Label>
           {imgPerc>0?imgPerc +"%" : <Input type="file" name="imgUrl" id='imgUrl' accept='image/*'onChange={(e)=>setImg(e.target.files[0])}/>}
              <Button onClick={handliUpload}>SUBMIT</Button>
        </Wrapper>
    </Container>
  )
}

export default Upload