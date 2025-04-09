import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = ({ onScanSuccess }) => {
    const [error, setError] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [scannedData, setScannedData] = useState(null);
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
        setScannedData(null);
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        setScanning(true);
        scannerRef.current.start(
            { facingMode: "environment" },
            config,
            async (decodedText) => {
                try {
                    let jsonData;
                    try {
                        jsonData = JSON.parse(decodedText);
                    } catch (parseError) {
                        jsonData = decodedText;
                    }

                    setScannedData(jsonData);

                    onScanSuccess(jsonData);

                    await scannerRef.current.stop();
                    setScanning(false);
                } catch (err) {
                    setError("Erreur lors du traitement des données");
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

    const resetScan = () => {
        setScannedData(null);
    };

    return (
        <div className="qr-scanner">
            <h2>Scanner un code QR</h2>
            {error && <p className="error">{error}</p>}

            {!scannedData ? (
                <>
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
                </>
            ) : (
                <div className="scan-result">
                    <h3>Données scannées :</h3>
                    <pre style={{
                        backgroundColor: '#f5f5f5',
                        padding: '10px',
                        borderRadius: '5px',
                        overflow: 'auto',
                        maxWidth: '100%'
                    }}>
                        {typeof scannedData === 'object'
                            ? JSON.stringify(scannedData, null, 2)
                            : scannedData}
                    </pre>
                    <button onClick={resetScan} className="scan-button">
                        Scanner à nouveau
                    </button>
                </div>
            )}
        </div>
    );
};

export default QRScanner;
