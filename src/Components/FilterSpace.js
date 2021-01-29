import React, {useEffect,useState} from "react";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(theme => ({
    filterSpace: {
        position: 'relative',
        top: 90,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    cardRoot:{
        minWidth: 275
    },
    media:{
        height: 140
    },
    gridRoot:{
        flexGrow: 1,
        top: 250

    }
}));

function FilterSpace() {
    const classes = useStyles();
    const [products,setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const chipOutput = [];
    const cardOutput = [];
    const handleClick = (e) => {
        console.log(e)
    }

    async function fetchCategoriesAndProducts() {
        try{
            const response = await axios.get('https://gorest.co.in/public-api/products/');
            let products = response.data;
            products = response.data.data;
            let categoriesList = [];
            products.forEach(item =>{
               item.categories.forEach(value =>{
                   if (!categoriesList.includes(value.name)){
                       categoriesList.push(value.name);
                   }
               })
            });
            setProducts(products);
            setCategories(categoriesList)
        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() =>{
        fetchCategoriesAndProducts();
    }, []);

    categories.forEach(item =>{
        chipOutput.push(<Chip key={item} size="medium" label={item} onClick={() => handleClick(item)} variant="outlined" color="primary"/> );
    })
    console.log(chipOutput);
    products.forEach(item =>{
        cardOutput.push(<Grid item xs key={item.name}><Card className={classes.cardRoot}>
            <CardMedia className={classes.media} image={item.image} title={item.name}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {item.description}
                </Typography>
            </CardContent>
        </Card></Grid>);
    });
    return(
        <React.Fragment>
            <div className={classes.filterSpace}>
                {chipOutput}
                <Grid container className={classes.gridRoot} spacing={2}>
                    {cardOutput}
                </Grid>
            </div>
        </React.Fragment>
    );

}
export default FilterSpace;

