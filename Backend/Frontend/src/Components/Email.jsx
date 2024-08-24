import { useState, Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style/email.css';
import axios from 'axios';
import success from '../assets/Images/Covers/sucess.webp'

const Email = () => {
    const [validUrl, setValidUrl] = useState(false);
    const { id, token } = useParams();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const url = `http://localhost:5000/users/${id}/verify/${token}`;
                const { status } = await axios.get(url);
                
                if (status === 200) {
                    setValidUrl(true);
                } else {
                    setValidUrl(false);
                }
            } catch (error) {
                if (error.response) {
                    // Handle specific status codes
                    console.error('Error response:', error.response.data);
                    console.error('Status code:', error.response.status);
                    console.error('Headers:', error.response.headers);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error during request setup:', error.message);
                }
                setValidUrl(false);
            }
        };
        verifyEmail();
    }, [id, token]);

    return (
        <Fragment>
            {validUrl ? (
                <div className="containerEmail">
                    <h3>Email Verified Successfully, Please Exit The Page And Login!</h3>
                    <img src={success} alt="Logo" />
                </div>
            ) : (
                <h2>Error 404 Not Found</h2>
            )}
        </Fragment>
    );
};

export default Email;
