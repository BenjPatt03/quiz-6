import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { createOrder } from '../actions/orderActions';
import axiosInstance from '../axiosInstance';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/v1/services/${id}/`);
        setService(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load service');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleAvailService = () => {
    if (!userInfo) {
      navigate('/signin');
      return;
    }
    setShowPayPal(true);
  };

  const handlePayPalApprove = async (details) => {
    if (!service) return;

    const orderData = {
      service_id: service.id,
      paypal_transaction_id: details.id,
      price_paid: service.price,
    };

    dispatch(createOrder(orderData));
    setShowPayPal(false);
    navigate('/profile');
  };

  if (loading) {
    return <div className="loading">Loading service details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!service) {
    return <div className="error-message">Service not found</div>;
  }

  return (
    <div className="service-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="service-detail-content">
        <div className="service-image-section">
          {service.sample_image_url && (
            <img 
              src={service.sample_image_url} 
              alt={service.service_name}
              className="large-image"
            />
          )}
        </div>

        <div className="service-info-section">
          <h1>{service.service_name}</h1>
          
          <div className="seller-info">
            <h3>{service.seller_name}</h3>
            <p className="email">{service.seller_email}</p>
          </div>

          <div className="price-section">
            <span className="price">${parseFloat(service.price).toFixed(2)}</span>
            <span className="rating">⭐ {service.rating}/5</span>
          </div>

          <div className="details-section">
            <h3>Service Description</h3>
            <p>{service.description}</p>

            <h3>Duration</h3>
            <p>{service.duration_of_service}</p>
          </div>

          <button 
            onClick={handleAvailService}
            className="avail-btn"
          >
            {userInfo ? 'Avail Service' : 'Sign In to Avail'}
          </button>

          {showPayPal && service && (
            <div className="paypal-section">
              <h3>Complete Payment</h3>
              <PayPalScriptProvider options={{ clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: service.price.toString(),
                          },
                          description: service.service_name,
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(handlePayPalApprove);
                  }}
                  onError={() => {
                    alert('Payment failed. Please try again.');
                    setShowPayPal(false);
                  }}
                />
              </PayPalScriptProvider>
              <button 
                onClick={() => setShowPayPal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
