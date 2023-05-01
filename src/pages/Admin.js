import { Button } from "@material-ui/core";
import { useNavigate} from 'react-router-dom';

export default function Admin(){
    const navigate = useNavigate();

    return(
        <div style={{display: "flex",justifyContent:"center", gap: 30,fontSize: 20, marginTop: 30}}>
        <Button variant="contained" size="small" color="primary" onClick={()=>navigate('/users')}>Users</Button>
        <Button variant="contained" size="small" color="primary" onClick={()=>navigate('/categories')}>Categories</Button>
        <Button variant="contained" size="small" color="primary" onClick={()=>navigate('/createCategory')}>Create Category</Button>
        <Button variant="contained" size="small" color="primary" onClick={()=>navigate('/products')}>Products</Button>
        <Button variant="contained" size="small" color="primary" onClick={()=>navigate('/createProduct')}>Create Products</Button>
        </div>
    )
}