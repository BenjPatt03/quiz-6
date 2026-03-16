import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../actions/orderActions';
import './UserProfile.css';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    } else {
      dispatch(getUserOrders());
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <h1>My Profile</h1>

        {/* User Info Section */}
        <div className="profile-section">
          <h2>Account Information</h2>
          {userInfo && (
            <div className="info-grid">
              <div className="info-item">
                <label>Email:</label>
                <p>{userInfo.email}</p>
              </div>
              <div className="info-item">
                <label>Name:</label>
                <p>{`${userInfo.first_name || ''} ${userInfo.last_name || ''}`}</p>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <p>{userInfo.phone_number || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>Location:</label>
                <p>{userInfo.location || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>Role:</label>
                <p className={`role-badge ${userInfo.role}`}>{userInfo.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Order History Section */}
        <div className="profile-section">
          <h2>Order History</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : orders && orders.length > 0 ? (
            <div className="orders-table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Service</th>
                    <th>Seller</th>
                    <th>Price Paid</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.service_name}</td>
                      <td>{order.seller_name}</td>
                      <td>${order.price_paid.toFixed(2)}</td>
                      <td>{new Date(order.date_purchased).toLocaleDateString()}</td>
                      <td>
                        <span className="status-badge">
                          {order.paypal_transaction_id ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No orders yet. Start shopping now!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
