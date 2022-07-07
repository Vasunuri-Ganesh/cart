import React from "react";
import CartItem from "./cartItem";
import Cart from "./Cart";
import NavBar from "./NavBar";
import  firebase from 'firebase/compat/app';



class  App extends React.Component {
  constructor()
  {
      super();
      this.state={
          products:[],
          loading:true
      }
      this.db=firebase.firestore();
      // this.increaseQuantity=this.increaseQuantity.bind(this);
  }

  componentDidMount(){
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot)=>{
    //     console.log(snapshot);
    //     snapshot.docs.map((doc)=>{
    //       console.log(doc.data());
    //     });
    //     const products=snapshot.docs.map((doc)=>{
    //       const data=doc.data();
    //       data['id']=doc.id;
    //       return data;
    //     })
    //     this.setState({
    //       products,
    //       loading:false
    //     })
    //   })
    this.db
      .collection('products')
      // .where('price', '==', 999)
      // .where('title', '==', 'watch')
      .orderBy('price','desc')
      .onSnapshot((snapshot)=>{
        console.log(snapshot);
        snapshot.docs.map((doc)=>{
          console.log(doc.data());
        });
        const products=snapshot.docs.map((doc)=>{
          const data=doc.data();
          data['id']=doc.id;
          return data;
        })
        this.setState({
          products,
          loading:false
        })
      })
  }

  

  handleIncreaseQuantity=(product)=>{
      const {products}=this.state;

      console.log("Hy Increase quantit of:",product.title," from",product.qty,"by 1");
      const index=products.indexOf(product);
      // products[index].qty+=1;
      
      // this.setState({
      //     products
          

      // })
      const docRef=this.db.collection('products').doc(products[index].id);
      docRef
      .update({
        qty:products[index].qty+1
      })
      .then(()=>{
        console.log("updated successfully");
      })
      .catch((error)=>{
        console.log("error",error);

      })
      

  }

  handleDecreaseQuantity=(product)=>{
      const {products}=this.state;
      if(product.qty==0)
        return;

      console.log("Hy Decrease quantit of:",product.title," from",product.qty,"by 1");
      const index=products.indexOf(product);
      const docRef=this.db.collection('products').doc(products[index].id);
      docRef
      .update({
        qty:products[index].qty-1
      })
      .then(()=>{
        console.log("updated successfully");
      })
      .catch((error)=>{
        console.log("error",error);

      })

  }

  handleDeleteProduct=(id)=>{
      const{products}=this.state;
      // const items=products.filter((item)=>item.id!==id);   //[{}]

      // this.setState({
      //     products:items
      // })
      const docRef=this.db.collection('products').doc(id);
      docRef
      .delete()
      .then(()=>{
        console.log('deleted successfully');
      })
      .catch((error)=>{
        console.log("error",error);
      })



  }

getCartCount=()=>
{
  const{products}=this.state;
  var count=0;
  products.forEach((product)=>{
    count+=product.qty;

  });
  return count;

}

getCartTotal=()=>{
  let cartTotal=0;
  const{products}=this.state;
  
  products.forEach((product)=>{
    cartTotal=cartTotal+(product.price * product.qty);

  });

  return cartTotal;
}

addProduct=()=>{
  this.db
  .collection('products')
  .add({
    img:'https://tse2.mm.bing.net/th?id=OIP.t_99pw45fGAatdQglLIRMAHaHa&pid=Api&P=0&w=166&h=166',
    price:2999,
    title:'washing machine',
    qty:3

  })
  .then((docRef)=>{
    console.log('product has been added', docRef);

  })
  .catch((error)=>{
    console.log('error',error);
  })

}
  
 render(){
   const{products,loading}=this.state;
      return (
        <div className="App">
          <NavBar
          count={this.getCartCount()}
          />
          {/* <button onClick={this.addProduct} style={{padding:20,fontSize:20}}> ADD Product</button> */}
          <Cart
            products={products}
            onIncreaseQuantity={this.handleIncreaseQuantity}
            onDecreaseQuantity={this.handleDecreaseQuantity}
            onDeleteProduct={this.handleDeleteProduct}
          />
          {loading && <h1>loading products.....</h1>}
          <div style={{padding:10,fontSize:20,textAlign:"center"}}>TOTAL:{this.getCartTotal()}</div>
          
        </div>
      );

 }
 
}




export default App;
