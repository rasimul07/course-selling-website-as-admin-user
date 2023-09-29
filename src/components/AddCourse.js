import { Paper, TextField, Button} from "@mui/material";
import axios from "axios";
import { useState } from "react";

function AddCourse(){
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState(null);
    const [message,setMessage] = useState("");
    const [imageLink, setImageLink] = useState("");
    return(
        <div style={{display:"flex",marginTop:100}}>
            <Paper elevation={3} component={'form'} sx={{p:2,width:400,margin:'auto'}}>
            <TextField
            variant="outlined"
            label='title'
            fullWidth={true}
            sx={{mb:2}}
            onChange={(e)=>{
                setTitle(e.target.value);
            }}
            ></TextField>

            <TextField
            variant="outlined"
            label='description'
            multiline
            maxRows={3}
            fullWidth={true}
            sx={{mb:2}}
            onChange={(e)=>{
                setDescription(e.target.value);
            }}
            ></TextField>

            <TextField
            variant="outlined"
            label='ImageLInk'
            maxRows={3}
            fullWidth={true}
            sx={{mb:2}}
            onChange={(e)=>{
                setImageLink(e.target.value);
            }}
            ></TextField>

            <TextField
            variant="outlined"
            type="number"
            label='price'
            size="small"
            sx={{mb:2}}
            onChange={(e)=>{
                setPrice(e.target.value);
            }}
            ></TextField>
            <Button
            variant="contained"
            sx={{ml:2}}
            onClick={ async() => {
                try{
                    const response = await axios.post('http://localhost:3000/admin/courses',{
                        title:title,
                        description:description,
                        price:price,
                        imageLink:imageLink
                    },{
                        headers:{
                            'authorization': "Barrier " + localStorage.getItem('token')
                        }
                    })
                    const data = response.data;
                    const token = data["token"];
                    setMessage(data["message"])
                    if(token){
                        localStorage.setItem("token", data["token"])
                    }
                }catch(err){
                    console.log(err);
                }
                alert(String(message));
            }}
            >Add Course</Button>
        </Paper>
        </div>
    )
}

export default AddCourse;