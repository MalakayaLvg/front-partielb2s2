import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Order = () => {

    const [ orders, setOrders ] = useState([])

    const getMyOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.get('https://back-partiel.malakayalauvergnat.com/api/user/orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(response.data.orders)
            console.log(orders)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMyOrders()
    }, []);


    return(
        <>
            <h1>Mes Commandes</h1>
            <Link to="/" className="mx-1">
                <button className="btn btn-secondary">
                    Home
                </button>
            </Link>
            {orders.map((order) => (
                <li key={order.id} className="my-1 form-control d-flex justify-content-between">
                    <div className="item-details d-flex flex-column">
                        <span className="item-name">id : {order.id}</span>
                        <span className="item-name">prix : {order.price} €</span>
                        <span className="item-quantity">Status: {order.status}</span>
                        <span className="item-quantity">Date:  {order.createdAt}</span>
                    </div>
                </li>
            ))}
        </>
    )
}

export default Order;