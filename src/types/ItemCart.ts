import { IProduct } from "./IProduct";






export interface IItemCart {
    cart:{
        _id:string,
        items:[
            {

                product_id:IProduct
            }
        ]
    }
}
export interface IResCart{
        
            product_id:IProduct
        

        
       
    
}