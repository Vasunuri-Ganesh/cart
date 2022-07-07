import React from 'react';
 import './index.css';
const CartItem=(props)=>{
    
    
        const{product,onDecreaseQuantity,onIncreaseQuantity,onDeleteProduct}=props;
        const {price, title,qty=1,img}=props.product;
        //  console.log(this.props);

       
        return(
            
            <div className="cart-item">
                
               
                <div className='left-block' >
                <img style={styles.image} src={img} />
                </div>

                <div className="right-block">
                    <div style={{fontSize:25,color:'black',fontWeight:'bolder'}}>{title}</div>
                    <div style={{color:'#777'}}>{price}</div>
                    <div style={{color:'#777'}}>{qty}</div>
                    <div className="cart-item-actions">
                       {/* buttons */}
                       <img 
                            alt='increase'  
                            className='action-icons'   
                            src='https://cdn-icons-png.flaticon.com/512/992/992651.png'
                            onClick={()=>onIncreaseQuantity(product)}
                       />
                       <img
                            alt='decrease' 
                            className='action-icons'   
                            src='https://cdn-icons-png.flaticon.com/512/992/992683.png'
                            onClick={()=>onDecreaseQuantity(product)}
                         />
                       <img
                            alt='delete'  
                            className='action-icons'  
                            src='https://cdn-icons.flaticon.com/png/512/3405/premium/3405244.png?token=exp=1655868288~hmac=7021cfeb48e6496b30c1386cf70afc9e'
                            onClick={()=>onDeleteProduct(product.id)}
                         />
                    </div>

                </div>

            </div>

        );
}




const styles={
    image:{
        height:110,
        width:110,
        borderRadius:4

    }
}


export default CartItem;