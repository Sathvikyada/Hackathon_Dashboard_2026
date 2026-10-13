import '../styles/content.css';
import './styles/scanner.css';

import { useDocumentTitle } from '../../useDocumentTitle';
import { useEffect, useRef, useState } from 'react';

import type { Person } from '../../types/person';

interface ScannerProps {
    user: Person;
}

const Scanner = ({ user }: ScannerProps) => {
    useDocumentTitle('Scanner');

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [cameraError, setCameraError] = useState<string | null>(null);
    const [cameraActive, setCameraActive] = useState(false);

    const startCamera = async () => {
        try {
            setCameraError(null);

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: {
                        ideal: 'environment'
                    }
                },
                audio: false
            });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            setCameraActive(true);
        } catch (error) {
            console.error(error);

            setCameraError(
                'Unable to access the camera. Please check your camera permissions.'
            );
        }
    };

    const stopCamera = () => {
        streamRef.current?.getTracks().forEach(track => {
            track.stop();
        });

        streamRef.current = null;

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setCameraActive(false);
    };

    useEffect(() => {
        return () => {
            streamRef.current?.getTracks().forEach(track => {
                track.stop();
            });
        };
    }, []);

    return (
        <section className="content-page scanner-page">
            <div className="content-card scanner-card">
                <div className="scanner-heading">
                    <div>
                        <h1>QR Scanner</h1>

                        <p>
                            Scan participant QR codes for check-in and
                            event operations.
                        </p>
                    </div>

                    <span className="scanner-user">
                        Scanner: {user.firstName}
                    </span>
                </div>

                <div className="scanner-camera">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                    />

                    {!cameraActive && !cameraError && (
                        <div className="scanner-placeholder">
                            <p>
                                Camera is currently off.
                            </p>
                        </div>
                    )}

                    {cameraActive && (
                        <div className="scanner-target">
                            <div className="scanner-target-box" />
                        </div>
                    )}
                </div>

                {cameraError && (
                    <p className="scanner-error">{cameraError}</p>
                )}

                <div className="scanner-actions">
                    {!cameraActive ? (
                        <button type="button" className="scanner-start-button" onClick={startCamera}>
                            Start Camera
                        </button>
                    ) : (
                        <button type="button" className="scanner-stop-button" onClick={stopCamera}>
                            Stop Camera
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Scanner;