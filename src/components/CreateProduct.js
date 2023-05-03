import { useState } from "react";
import { Button,TextField,FormControl,FormHelperText,makeStyles, Container,Paper} from "@material-ui/core";
import { useNavigate, Link} from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    container: {
        padding: theme.spacing(5),
        marginTop: theme.spacing(10),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        background:"#7FFF00"
    },
    errorText: {
        marginTop: theme.spacing(1),
        color: theme.palette.error.main
    },
    link: {
        marginTop: theme.spacing(1)
    }
}));


export default function CreateProduct (){
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [img,setImg] = useState("");
    const [categoryId,setCategoryId] = useState("");
    const [quantity,setQuantity] = useState("");
    const [error,setError] = useState("");
    const classes = useStyles();
    const navigate = useNavigate();
    

    async function submitProd(e){
        e.preventDefault();
        const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/products/add", {
                method: "POST",
                body: JSON.stringify({
                  name,
                  price,
                  img,
                  categoryId,
                  quantity
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  Authorization: token,
                },
              })
            const data = await response.json();
                if(data.message !== "Product added"){
                    navigate('/')
                }
            if(data.error){
                setError(data.error);
            }
        setName("");
        setPrice("");
        setImg("");
        setCategoryId("");
        setQuantity("");
    }

    return(
        <div>
        <Container className={classes.container} component={Paper} maxWidth="sm">
        <form className={classes.form} onSubmit={submitProd} >
            <FormControl className={classes.textField}>
                <TextField id="name" label="Name" value={name} variant="outlined" size="small" onChange={(e)=>setName(e.target.value)}/>
            </FormControl>
            <FormControl className={classes.textField}>
                <TextField id="img" label="Img" value={img} variant="outlined" size="small" onChange={(e)=>setImg(e.target.value)}/>
            </FormControl>
            <FormControl className={classes.textField}>
                <TextField id="price" label="Price" value={price} variant="outlined" size="small" onChange={(e)=>setPrice(e.target.value)}/>
            </FormControl>
            <FormControl className={classes.textField}>
                <TextField id="categoryId" label="CategoryId" value={categoryId} variant="outlined" size="small" onChange={(e)=>setCategoryId(e.target.value)}/>
            </FormControl>
            <FormControl className={classes.textField}>
                <TextField id="quantity" label="Quantity" value={quantity} variant="outlined" size="small" onChange={(e)=>setQuantity(e.target.value)}/>
            </FormControl>
            
            <Button className={classes.button} variant="contained" type="submit">Submit</Button>
            {error && (
                <FormHelperText className={classes.errorText}>{error}</FormHelperText>
            )}
            
        </form>
        </Container>
        <Link to="/products"><p style={{textAlign:"center",marginTop:30}}>Go to Products</p></Link>
        </div>
    )
}