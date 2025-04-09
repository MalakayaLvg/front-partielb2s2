import QRScanner from "../components/QRScanner.jsx";
import {Link} from "react-router-dom";

const Home = () => {

    return(
        <>
            <h1>Home page</h1>
            <Link to="/scan" className="mx-1">
                <button className="btn btn-secondary">
                    Scan
                </button>
            </Link>
            <Link to="/cart" className="mx-1">
                <button className="btn btn-secondary">
                    Panier
                </button>
            </Link>
            <Link to="/login" className="mx-1">
                <button className="btn btn-secondary">
                    Login
                </button>
            </Link>
        </>
    )
}

export default Home;