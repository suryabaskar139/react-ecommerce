import axios from 'axios';
import { productsRequest,productsFail,productsSuccess } from '../slices/productsSlice';
import { productRequest,productFail,productSuccess } from '../slices/productSlice';



export const getProducts = (keyword,price, category, rating) => async (dispatch) =>{

    try{
        dispatch(productsRequest())
        let link = '/api/v1/products';

        if(keyword){
            link += `?&keyword=${keyword}`;
        }

        if(price){
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        }

        if(category){
            link+= `&category=${category}`
        }

        if(rating){
            link+= `&category=${rating}`
        }

        // else{
        //     link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        // }

        const {data} = await axios.get(link);
        dispatch(productsSuccess(data))
        console.log("Products",data);
    }
    catch(error){
        dispatch(productsFail(error.response.data.message))
    }
    
}


export const getProduct = id => async (dispatch) =>{
    try{
        dispatch(productRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data))
        console.log("Product",data);
    }
    catch(error){
        dispatch(productFail(error.response.data.message))
    }
    
}