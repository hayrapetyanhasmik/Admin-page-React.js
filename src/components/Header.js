import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function Header(){
    const navigate = useNavigate();
    function handleLogOut(){
        localStorage.removeItem('token');
        navigate('/')
    }
    return(
        <div style={{height: "30px"}}>
            <Button style={{position: "absolute", right: "8px",top: "0px", background:"red",color:"white"}} variant="contained" size="small" onClick={handleLogOut}>Log Out</Button> 
        </div>
    )
}