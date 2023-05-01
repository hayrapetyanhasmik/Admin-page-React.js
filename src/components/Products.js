import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Box, Modal, Typography, Button,TextField,makeStyles,TableContainer,Paper,Table, TableBody,TableCell,TableRow,TableHead } from "@material-ui/core";
import {DeleteOutlined,Edit} from "@material-ui/icons";


const useStyles = makeStyles((theme)=>({
  header: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.white,
  },
  box: {
    padding: "15px",
    position: "absolute",
    top: "30%",
    left: "30%",
    width: "450px",
    height: "400px",
    transform: "translate(-10%,-10%)",
    backgroundColor: "lightBlue",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }
}));

export default function Products(){
    const navigate = useNavigate();
    const classes = useStyles();
    const [product, setProduct] = useState([]);
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [img,setImg] = useState("");
    const [categoryId,setCategoryId] = useState("");
    const [quantity,setQuantity] = useState("");
    const [del,setDel] = useState(false);
    const [open,setOpen] = useState(false);
    const [updated,setUpdated] = useState(false);
    const [category, setCategory] = useState([]);
    const [defineId,setDefineId] = useState(null);
   
    useEffect(() => {
    fetch("http://localhost:5000/products")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setProduct(res);
        });
    }, [del,updated]);


    const deleteProduct = async (id) => {
      console.log(id,'del')
    const token = localStorage.getItem('token');
      try {
        const response = await fetch(
          `http://localhost:5000/products/delete/${id}`,{
            method: "DELETE",
            body: JSON.stringify({
              id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
               Authorization: token,
            },
          }
        );
        await response.json();
        setDel(true);
      } catch (err) {
        console.log(err);
      }
    };

    const updateProduct = async (id) => {
    const token = localStorage.getItem('token');
    console.log(id,'update');
      try {
        const response = await fetch(
          `http://localhost:5000/products/update/${id}`,
          {
            method: "PUT",
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
          }
        );
        const data = await response.json();
        if(data.message !== "Updated"){
          console.log(data.status);
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
      setUpdated(!updated)

        setName("");
        setPrice("");
        setImg("");
        setCategoryId("");
        setQuantity("");

    };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const getProduct = async ()=>{
      try{
        if(defineId){
        const response = await fetch(`http://localhost:5000/products/getOne/${defineId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: token,
          },
        })
        const data = await response.json();
        console.log(data);
              setName(data.name);
              setPrice(data.price);
              setImg(data.img);
              setCategoryId(data.categoryId);
              setQuantity(data.quantity);
        }
      }catch(err){
          console.log(err);
      }
    };
    getProduct();
  },[defineId]);


  return(
    <div>
    <TableContainer className={classes.container} component={Paper}>
      <Table aria-label="simple table" >
        <TableHead className={classes.header}>
          <TableRow >
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">ProductName</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((prod) => (
            <TableRow key={prod.id} >
              <TableCell align="center">{prod.id}</TableCell>
              <TableCell align="center" value={name} onChange={(e) => setName(e.target.value)}>{prod.name}</TableCell>
              <TableCell align="center" value={img} onChange={(e) => setImg(e.target.value)}><img alt="Eco cup..." src={prod.img} width="80px"/></TableCell>
              <TableCell align="center" value={price} onChange={(e) => setPrice(e.target.value)}>{prod.price}</TableCell>
              <TableCell align="center" value={quantity} onChange={(e) => setQuantity(e.target.value)}>{prod.quantity}</TableCell>
              <TableCell align="center" value={category} onChange={(e) => setCategory(e.target.value)}>{prod.Category.name}</TableCell>

              <TableCell align="right">
              <Edit onClick={()=>{setOpen(true); setDefineId(prod.id)}}/>
              <DeleteOutlined onClick={() => deleteProduct(prod.id)}/>
              </TableCell>
            
            </TableRow>
          ))}
          <Modal open={open} onClose={()=>setOpen(false)} aria-labelledby="modal-title" color="primary">
                <Box className={classes.box}>
                    <Typography id="modal-title" variant="h6" align="center">Edit</Typography>

                    <TextField id="outlined-basic" label="ProductName"  variant="outlined" value={name}  size="small" onChange={(e) => setName(e.target.value)}/> 

                    <TextField id="outlined-basic"  label="Image"  variant="outlined" value={img} size="small" onChange={(e) => setImg(e.target.value)}/> 

                    <TextField id="outlined-basic" label="Price"  variant="outlined" value={price} size="small" onChange={(e) => setPrice(e.target.value)}/> 

                    <TextField id="outlined-basic" label="Quantity"  variant="outlined" value={quantity}  size="small" onChange={(e) => setQuantity(e.target.value)}/>

                    <TextField id="outlined-basic" label="CategoryId"  variant="outlined" value={categoryId} size="small" onChange={(e) => setCategoryId(e.target.value)}/> 

                    <Button type="submit" variant="contained" color="primary" size="small" style={{ marginTop: 30}} onClick={()=>updateProduct(defineId)}>Save</Button>
                    <Button variant="contained" color="primary" size="small" onClick={()=>setOpen(false)}>Close</Button>
                </Box>
            </Modal>
        </TableBody>
      </Table>
    </TableContainer>
    <Link to="/admin"><p style={{textAlign:"right",marginTop:30}}>Go back to Admin page</p></Link>
    </div>
    )
}