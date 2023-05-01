import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const navigate = useNavigate();
    return(
        <div style={{position:"absolute", top: "0px"}}>
            <Button  variant="contained" size="small" color="primary" onClick={()=>navigate('/register')}>Sign Up</Button> 
        </div>
    )
}