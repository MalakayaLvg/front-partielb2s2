import './App.css';
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Register from "./pages/Register.jsx";
import Scan from "./pages/Scan.jsx";
import Cart from "./pages/Cart.jsx";
import Order from "./pages/Order.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {


    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/scan" element={<Scan />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Order />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
