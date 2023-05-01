import { Navigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';


export default function ProtectedRoutes({children}){
    const token = localStorage.getItem('token')
    const decodedToken = decodeToken(token);
    const currentTime = Date.now() / 1000;
    if(decodedToken.exp < currentTime){
        return "JWT expires!";
    }else if(!token || decodedToken?.role === 0){
        return <Navigate to='/'/>
    }
    return children
}



