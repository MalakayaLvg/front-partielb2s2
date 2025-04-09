import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
    const [items, setItems] = useState([]);

    const handleClearCart = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.post('https://back-partiel.malakayalauvergnat.com/api/cart/clear', {},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(response)
            getCart()
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDeleteItem = async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const body = {
                productId: id
            }
            const response = await axios.post('https://back-partiel.malakayalauvergnat.com/api/cart/remove', body,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(response)
            getCart()
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleValidateOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.post('https://back-partiel.malakayalauvergnat.com/api/order/validate', {},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(response.data.message)
        }
        catch (error) {
            console.log(error);
        }
    }

    const getCart = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.get('https://back-partiel.malakayalauvergnat.com/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setItems(response.data.cartItems || []);
            console.log(response.data.cartItems);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCart();
    }, []);

    return(
        <>
            <div className="cart-container">
                <h1>Mon panier</h1>
                {items.length > 0 ? (
                    <ul className="cart-items">
                        {items.map((item) => (
                            <li key={item.productId} className="my-1 form-control d-flex justify-content-between">
                                <div className="item-details d-flex flex-column">
                                    <span className="item-name">{item.productName} : {item.price} €</span>
                                    <span className="item-quantity">Quantité: {item.quantity}</span>
                                </div>
                                <div className="ms-2">
                                    <button onClick={() => handleDeleteItem(item.productId)} className="btn btn-danger">X</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-cart">Votre panier est vide</p>
                )}
            </div>
            <div className="d-flex flex-column gap-1">
                <Link to="/" className="mx-1">
                    <button className="btn btn-secondary">
                        Home
                    </button>
                </Link>
                <div>
                    <button onClick={handleClearCart} className="btn btn-danger">Supprimer</button>
                </div>
               <div>
                   <button onClick={handleValidateOrder} className="btn btn-success">Valider</button>
               </div>
            </div>

        </>
    )
}

export default Cart;
