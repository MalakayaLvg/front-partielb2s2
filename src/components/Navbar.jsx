import {Link} from "react-router-dom";
import "../css/Navbar.css"

const Navbar = () => {
    return(
        <>
            <div className="home-button-container">
                <div className="home-button-div">
                    <div className="rect-icon">
                        <Link className="icon-home" to={'/'} >
                            Home
                        </Link>
                    </div>
                    <div className="rect-icon">
                        <Link className="icon-home" to={'/login'} >
                            Login
                        </Link>
                    </div>
                    <div className="rect-icon">
                        <Link className="icon-home" to={'/register'} >
                            Register
                        </Link>
                    </div>
                    <div className="rect-icon">
                        <Link className="icon-home" to={'/cart'} >
                            Panier
                        </Link>
                    </div>
                    <div className="rect-icon">
                        <Link className="icon-home" to={'/order'} >
                            Order
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar;