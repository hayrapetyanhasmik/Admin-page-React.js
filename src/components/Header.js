import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function Header(){
    const navigate = useNavigate();
    function handleLogOut(){
        localStorage.removeItem('token');
        navigate('/')
    }
    return(
        <div style={{height: "30px", display:"flex",justifyContent:"flex-end", gap:"10px", margin:"10px"}}>
            <Button  variant="contained" size="small" color="primary" onClick={()=>navigate('/register')}>Sign Up</Button> 
            <Button  variant="contained" size="small" color="primary" onClick={()=>navigate('/login')}>Log In</Button> 
            <Button style={{background:"red",color:"white"}} variant="contained" size="small" onClick={handleLogOut}>Log Out</Button> 
        </div>
    )
}