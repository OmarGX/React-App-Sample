import React, {useEffect,useState} from "react";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Chip, ChipSet} from "@rmwc/chip"
import '@material/chips/dist/mdc.chips.css';
import '@rmwc/icon/icon.css';
import '@material/ripple/dist/mdc.ripple.css';

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
    const [selected,setSelected] = useState({});
    const toggleSelected = e => {
        setSelected(selected => ({
            ...selected,
            [e]: !selected[e]
        }));
    }


    async function fetchCategoriesAndProducts() {
        const dict = {};
        try{
            const response = await axios.get('https://gorest.co.in/public-api/products/');
            let products = response.data.data;
            let categoriesList = [];
            products.forEach(item =>{
               item.categories.forEach(value =>{
                   if (!categoriesList.includes(value.name)){
                       categoriesList.push(value.name);
                   }
               })
            });
            setProducts(products);
            setCategories(categoriesList);
            categoriesList.forEach(value => {
                dict[value]=false;
            });
        }
        catch (e) {
            console.error(e)
        }
        return dict
    }

    useEffect(() =>{
        fetchCategoriesAndProducts().then((data) => {
            setSelected(data);
        });
    }, []);

    return(
            <div className={classes.filterSpace}>
                <ChipSet filter>
                    {categories.map((item)=>(<Chip key={item} label={item} checkmark selected={selected[item]}
                                                   onInteraction={() => {toggleSelected(item)}}/>))}
                </ChipSet>
                <React.Fragment>
                    <Grid container className={classes.gridRoot} spacing={2}>
                        {products.filter(item => {
                            if(!Object.values(selected).includes(true)){
                                return item
                            } else {
                                let selectedCat = [];
                                Object.entries(selected).forEach(([key,value]) => {
                                    if(value===true){
                                        selectedCat.push(key);
                                    }
                                });
                                if(Object.entries(item.categories).some(key => selectedCat.includes(key[1].name))){
                                    return item
                                }
                            }
                        }).map((item) =>(<Grid item xs key={item.id}><Card className={classes.cardRoot}>
                            <CardMedia className={classes.media} image={item.image} title={item.name}/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card></Grid>))}
                    </Grid>
                </React.Fragment>
            </div>
    );

}
export default FilterSpace;
