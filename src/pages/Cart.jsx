import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Cart = () => {
    // Initialiser avec un tableau vide plutôt qu'un objet
    const [items, setItems] = useState([]);

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
                            <li key={item.productId} className="cart-item">
                                <div className="item-details d-flex flex-column">
                                    <span className="item-name">{item.productName} : {item.price} €</span>
                                    <span className="item-quantity">Quantité: {item.quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-cart">Votre panier est vide</p>
                )}
            </div>
            <Link to="/" className="mx-1">
                <button className="btn btn-secondary">
                    Home
                </button>
            </Link>
        </>
    )
}

export default Cart;
