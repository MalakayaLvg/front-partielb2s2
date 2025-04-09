import QRScanner from "../components/QRScanner.jsx";
import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom";

const Scan = () => {

    const [ status, setStatus ] = useState("")

    const handleScanSuccess = async (data) => {
        console.log("Données du QR code:", data);
        try {
            const body = {
                productId: data.id,
                quantity: 1
            };
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'https://back-partiel.malakayalauvergnat.com/api/cart/add',
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setStatus(response.data)
            console.log("Inscription réussie", response.data);
        } catch (error) {
            console.log("Erreur lors de l'inscription:", error);
        }
    };
    return(
        <>
            <QRScanner onScanSuccess={handleScanSuccess}/>
            <h1>Scan page</h1>
            <div>
                { status }
            </div>
            <Link to="/" className="mx-1">
                <button className="btn btn-secondary">
                    Home
                </button>
            </Link>
        </>
    )
}

export default Scan;