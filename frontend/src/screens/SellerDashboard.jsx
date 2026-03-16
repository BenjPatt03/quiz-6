import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    service_name: '',
    description: '',
    price: '',
    duration_of_service: '',
  });

  useEffect(() => {
    // Check if user is seller
    if (!userInfo || userInfo.role !== 'seller') {
      navigate('/');
      return;
    }

    fetchServices();
  }, [userInfo, navigate]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/api/v1/services/my_services/');
      setServices(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddService = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.service_name || !formData.description || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      alert('Price must be greater than 0');
      return;
    }

    try {
      await axiosInstance.post('/api/v1/services/create_service/', formData);
      fetchServices();
      setFormData({
        service_name: '',
        description: '',
        price: '',
        duration_of_service: '',
      });
      setShowForm(false);
      alert('Service created successfully!');
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to create service');
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      await axiosInstance.delete(`/api/v1/services/${serviceId}/delete_service/`);
      fetchServices();
      alert('Service deleted successfully!');
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete service');
    }
  };

  return (
    <div className="seller-dashboard-container">
      <div className="seller-dashboard-wrapper">
        <div className="dashboard-header">
          <h1>Seller Dashboard</h1>
          {userInfo && (
            <div className="seller-info">
              <p>Welcome, {userInfo.first_name}!</p>
              <p className="merchant-id">Merchant ID: {userInfo.merchant_id}</p>
            </div>
          )}
        </div>

        <div className="dashboard-actions">
          <button
            onClick={() => setShowForm(!showForm)}
            className="add-service-btn"
          >
            {showForm ? '✕ Cancel' : '+ Add New Service'}
          </button>
        </div>

        {showForm && (
          <div className="add-service-form-container">
            <h2>Create New Service</h2>
            <form onSubmit={handleAddService} className="add-service-form">
              <div className="form-group">
                <label>Service Name *</label>
                <input
                  type="text"
                  name="service_name"
                  value={formData.service_name}
                  onChange={handleInputChange}
                  placeholder="e.g., AC Repair"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your service..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (USD) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration_of_service"
                    value={formData.duration_of_service}
                    onChange={handleInputChange}
                    placeholder="e.g., 2-4 hours"
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Create Service
              </button>
            </form>
          </div>
        )}

        {loading && <p className="loading">Loading services...</p>}
        {error && <p className="error">{error}</p>}

        <div className="services-section">
          <h2>My Services ({services.length})</h2>
          {services.length > 0 ? (
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-card-header">
                    <h3>{service.service_name}</h3>
                    <span className="price">${parseFloat(service.price).toFixed(2)}</span>
                  </div>

                  <p className="description">{service.description}</p>

                  <div className="service-details">
                    {service.duration_of_service && (
                      <p>
                        <strong>Duration:</strong> {service.duration_of_service}
                      </p>
                    )}
                    <p>
                      <strong>Rating:</strong> ⭐ {service.rating}/5
                    </p>
                  </div>

                  <div className="service-actions">
                    <button
                      onClick={() => navigate(`/services/${service.id}`)}
                      className="view-btn"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-services">
              You haven't created any services yet. Click "Add New Service" to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
