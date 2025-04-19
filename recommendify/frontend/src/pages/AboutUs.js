import React, { useState, useEffect } from 'react';

import Header from '../components/header';

function AboutUs() {
    // checks if user is authenticated to either display connect account button or menu dropdown
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authUrl, setAuthUrl] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            const authRes = await fetch('/spotify/is-authenticated');
            const authData = await authRes.json();
            setIsAuthenticated(authData.status);

            if (!authData.status) {
            const urlRes = await fetch('/spotify/get-auth-url');
            const urlData = await urlRes.json();
            setAuthUrl(urlData.url);
            }
        };

        checkAuth();
    }, []);

    return (
        <div clsasName="AboutUs">
            <Header url={authUrl} showConnectButton={!isAuthenticated} />
            <h1>About Us</h1>
        </div>
    )
}

export default AboutUs