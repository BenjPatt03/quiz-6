import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './SellerApplication.css';

const SellerApplication = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleApply = async () => {
    if (!userInfo) {
      navigate('/signin');
      return;
    }

    if (userInfo.role !== 'user') {
      navigate('/');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await axiosInstance.post('/api/v1/applications/apply/');
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit application');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seller-application-container">
      <div className="application-box">
        <h1>Become a Seller</h1>

        {success ? (
          <div className="success-message">
            <h2>Application Submitted! ✓</h2>
            <p>Thank you for your interest in becoming a seller!</p>
            <p>Our admin team will review your application and get back to you soon.</p>
            <button onClick={() => navigate('/')} className="home-btn">
              Return to Home
            </button>
          </div>
        ) : (
          <>
            <div className="benefits">
              <h2>Benefits of Being a Seller</h2>
              <ul>
                <li>✓ Reach thousands of potential customers</li>
                <li>✓ Manage your own service offerings</li>
                <li>✓ Get paid directly for your services</li>
                <li>✓ Build your professional profile</li>
                <li>✓ Access seller analytics and insights</li>
              </ul>
            </div>

            <div className="requirements">
              <h2>Requirements</h2>
              <ul>
                <li>• Valid email address</li>
                <li>• Professional HVAC background or certification</li>
                <li>• Commitment to quality service</li>
                <li>• Professional communication skills</li>
              </ul>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              onClick={handleApply}
              disabled={loading}
              className="apply-btn"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>

            <p className="info-text">
              Once you submit your application, an administrator will review it.
              You will be notified via email about the decision.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerApplication;
