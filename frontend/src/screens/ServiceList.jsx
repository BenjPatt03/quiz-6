import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './ServiceList.css';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/v1/services/');
        setServices(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load services');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="loading">Loading services...</div>;
  }

  return (
    <div className="service-list-container">
      <h2>Available HVAC Services</h2>
      {error && <div className="error-message">{error}</div>}
      
      {services.length === 0 ? (
        <div className="no-services">
          <p>No services available yet.</p>
        </div>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <Link 
              to={`/services/${service.id}`} 
              key={service.id} 
              className="service-card-link"
            >
              <div className="service-card">
                {service.sample_image_url && (
                  <img 
                    src={service.sample_image_url} 
                    alt={service.service_name}
                    className="service-image"
                  />
                )}
                <div className="service-info">
                  <h3>{service.service_name}</h3>
                  <p className="seller">{service.seller_name}</p>
                  <p className="description">{service.description.substring(0, 100)}...</p>
                  <div className="service-footer">
                    <span className="price">${parseFloat(service.price).toFixed(2)}</span>
                    <span className="rating">⭐ {service.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
