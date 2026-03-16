import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './AdminUsers.css';

const AdminUsers = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is admin
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/');
      return;
    }

    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'applications') {
      fetchApplications();
    }
  }, [activeTab, userInfo, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/api/v1/admin/users/');
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/api/v1/applications/list_applications/');
      setApplications(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveApplication = async (applicationId) => {
    try {
      await axiosInstance.post(`/api/v1/applications/${applicationId}/approve/`);
      fetchApplications();
      alert('Application approved!');
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to approve application');
    }
  };

  const handleDeclineApplication = async (applicationId) => {
    const reason = prompt('Decline reason:');
    if (!reason) return;

    try {
      await axiosInstance.post(`/api/v1/applications/${applicationId}/decline/`, {
        decline_reason: reason,
      });
      fetchApplications();
      alert('Application declined!');
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to decline application');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axiosInstance.delete(`/api/v1/admin/users/${userId}/`);
      fetchUsers();
      alert('User deleted!');
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete user');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-wrapper">
        <h1>Admin Panel</h1>

        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users ({users.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications ({applications.length})
          </button>
        </div>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {activeTab === 'users' && !loading && (
          <div className="tab-content">
            <h2>All Users</h2>
            {users.length > 0 ? (
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>#{user.id}</td>
                        <td>{user.email}</td>
                        <td>{`${user.first_name} ${user.last_name}`}</td>
                        <td>{user.phone_number || 'N/A'}</td>
                        <td>
                          <span className={`role-badge ${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="delete-btn"
                            title="Delete user"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}

        {activeTab === 'applications' && !loading && (
          <div className="tab-content">
            <h2>Seller Applications</h2>
            {applications.length > 0 ? (
              <div className="applications-grid">
                {applications.map((app) => (
                  <div key={app.id} className="application-card">
                    <div className="app-header">
                      <h3>{app.user_email}</h3>
                      <span className={`status-badge ${app.status}`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="app-details">
                      <p>
                        <strong>Name:</strong> {app.user_full_name}
                      </p>
                      <p>
                        <strong>Applied:</strong>{' '}
                        {new Date(app.created_at).toLocaleDateString()}
                      </p>
                      {app.decline_reason && (
                        <p className="decline-reason">
                          <strong>Decline Reason:</strong> {app.decline_reason}
                        </p>
                      )}
                    </div>

                    {app.status === 'pending' && (
                      <div className="app-actions">
                        <button
                          onClick={() => handleApproveApplication(app.id)}
                          className="approve-btn"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeclineApplication(app.id)}
                          className="decline-btn"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No applications found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
