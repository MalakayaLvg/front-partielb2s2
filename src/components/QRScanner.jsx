import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = ({ onProductAdded }) => {
    const [error, setError] = useState(null);
    const [scanning, setScanning] = useState(false);
    const scannerRef = useRef(null);

    useEffect(() => {

        scannerRef.current = new Html5Qrcode("reader");


        return () => {
            if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(err => console.error(err));
            }
        };
    }, []);

    const startScanning = () => {
        if (!scannerRef.current) return;

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        setScanning(true);
        scannerRef.current.start(
            { facingMode: "environment" },
            config,
            async (decodedText) => {
                try {
                    const product = await addProductByCode(decodedText);
                    onProductAdded(product);

                    await scannerRef.current.stop();
                    setScanning(false);

                    setTimeout(() => startScanning(), 2000);
                } catch (err) {
                    setError("Erreur lors de l'ajout du produit");
                    console.error(err);
                }
            },
            (errorMessage) => {
                console.log(errorMessage);
            }
        ).catch(err => {
            setError("Erreur d'accès à la caméra");
            console.error(err);
            setScanning(false);
        });
    };

    const stopScanning = async () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
            await scannerRef.current.stop();
            setScanning(false);
        }
    };

    return (
        <div className="qr-scanner">
            <h2>Scanner un code QR</h2>
            {error && <p className="error">{error}</p>}

            <div id="reader" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}></div>

            {!scanning ? (
                <button onClick={startScanning} className="scan-button">
                    Démarrer le scan
                </button>
            ) : (
                <button onClick={stopScanning} className="stop-button">
                    Arrêter le scan
                </button>
            )}

            <p>Placez le code QR du produit dans le cadre</p>
        </div>
    );
};

export default QRScanner;
