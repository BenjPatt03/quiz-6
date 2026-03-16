# HVAC Services Marketplace - Project Complete ✓

## Overview

A full-stack HVAC Services Marketplace web application built with Django REST Framework backend and React frontend. This platform enables users to browse HVAC services, sellers to offer services, and admins to manage the platform.

**Project Status:** 🟢 **100% COMPLETE** (All 5 Stages Implemented)

**GitHub Repository:** https://github.com/BenjPatt03/quiz-6.git

---

## ✅ Project Features

### Stage 1: Foundation & Authentication ✓
- ✅ Custom user model with role-based access (user, seller, admin)
- ✅ JWT authentication with access/refresh tokens
- ✅ User registration with email validation
- ✅ Secure password handling (minimum 8 characters)
- ✅ Sign-in/Sign-up pages with form validation
- ✅ User profile with extended fields (phone, location, gender)

### Stage 2: Services & Applications ✓
- ✅ Service model with pricing, descriptions, ratings
- ✅ Seller application workflow (apply → review → approve/decline)
- ✅ Service CRUD operations (create, read, update, delete)
- ✅ Service browsing and filtering
- ✅ Service detail pages with seller information
- ✅ Image upload support for services

### Stage 3: Orders & PayPal Integration ✓
- ✅ Order model with PayPal transaction tracking
- ✅ PayPal checkout integration in ServiceDetail
- ✅ Redux order state management
- ✅ Order history in user profile
- ✅ Order creation after successful payment
- ✅ Order tracking with transaction IDs

### Stage 4: Admin Panel & AI Chatbot ✓
- ✅ Admin dashboard with user management
- ✅ Seller application review interface
- ✅ Approve/decline seller applications
- ✅ User deletion functionality
- ✅ Floating AI chatbot with OpenAI integration
- ✅ Real-time chat functionality
- ✅ HVAC-focused chatbot responses

### Stage 5: Protection & Validation ✓
- ✅ Protected routes with role-based access control
- ✅ Route guards for authenticated users
- ✅ ProtectedRoute component wrapper
- ✅ Form validation on all screens
- ✅ Backend permission classes (IsSeller, IsAdmin)
- ✅ Loading state management
- ✅ Error handling and user feedback
- ✅ Seller dashboard for service management
- ✅ Seller application form

---

## 🏗️ Architecture

### Backend Stack
- **Framework:** Django 6.0.3
- **API:** Django REST Framework 3.16
- **Authentication:** djangorestframework-simplejwt 5.5.1
- **Database:** SQLite3
- **CORS:** django-cors-headers 4.9
- **Images:** Pillow 12.1.1
- **AI:** OpenAI 2.28 (GPT-4o-mini)
- **Python:** 3.14

### Frontend Stack
- **Framework:** React 18
- **State:** Redux Toolkit
- **Routing:** React Router v6
- **HTTP:** Axios
- **Payments:** @paypal/react-paypal-js
- **Styling:** CSS3

### Database Schema
```
CustomUser (email-based auth, role, merchant_id)
├── Service (seller FK, pricing, image, rating)
├── SellerApplication (user FK, status, decline_reason)
├── Order (buyer FK, service FK, paypal_transaction_id)
└── Chat Logs (user, message, timestamp)
```

---

## 📁 Project Structure

```
quiz-6/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── backend/
│   │   ├── settings.py (configured JWT, CORS, INSTALLED_APPS)
│   │   ├── urls.py (API routing)
│   │   └── wsgi.py
│   └── [apps]/
│       ├── users/ (authentication, profiles)
│       ├── services/ (CRUD, listing)
│       ├── orders/ (payments, history)
│       ├── applications/ (seller applications)
│       ├── chat/ (AI chatbot)
│       ├── core/ (permissions)
│       └── migrations/
│
├── frontend/
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── screens/ (page components)
│   │   ├── components/ (reusable components)
│   │   ├── actions/ (Redux async actions)
│   │   ├── reducers/ (Redux state)
│   │   ├── constants/ (action types)
│   │   ├── store.js (Redux store)
│   │   ├── axiosInstance.js (HTTP client)
│   │   ├── App.js (routing)
│   │   ├── index.js (React 18 createRoot)
│   │   └── App.css
│   └── .env (PayPal credentials)
│
├── .git/ (12 commits)
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 16+
- npm or yarn
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superadmin (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
# Server runs on http://localhost:8000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (already exists with PayPal sandbox credentials)
# REACT_APP_PAYPAL_CLIENT_ID=<your-client-id>
# REACT_APP_API_URL=http://localhost:8000

# Start development server
npm start
# App opens on http://localhost:3000
```

---

## 🔐 Authentication & User Roles

### User Roles
1. **User (Default)**
   - Browse services
   - Make purchases
   - View order history
   - Apply to become seller
   - Access: `/profile`, `/apply`

2. **Seller**
   - Create/manage services
   - View order analytics
   - Manage seller profile
   - Access: `/seller/dashboard`

3. **Admin**
   - View all users
   - Review seller applications
   - Approve/decline applications
   - Delete users
   - Access: `/admin/users`

### JWT Tokens
- **Access Token:** 24 hours
- **Refresh Token:** 7 days
- **Stored In:** localStorage as `userInfo`

---

## 🔑 API Endpoints

### Users
```
POST   /api/v1/users/login/                    Login & get tokens
POST   /api/v1/users/register/                 Register new user
GET    /api/v1/users/profile/                  Get user profile
DELETE /api/v1/admin/users/{id}/               Delete user (admin)
GET    /api/v1/admin/users/                    List all users (admin)
```

### Services
```
GET    /api/v1/services/                       List all services
GET    /api/v1/services/{id}/                  Get service detail
POST   /api/v1/services/create_service/        Create service (seller)
PUT    /api/v1/services/{id}/update_service/   Update service (seller)
DELETE /api/v1/services/{id}/delete_service/   Delete service (seller)
GET    /api/v1/services/my_services/           Get seller's services
```

### Orders
```
POST   /api/v1/orders/create_order/            Create order after payment
GET    /api/v1/orders/my_orders/               Get user's order history
```

### Applications
```
POST   /api/v1/applications/apply/             Apply as seller
GET    /api/v1/applications/list_applications/ List applications (admin)
POST   /api/v1/applications/{id}/approve/      Approve application (admin)
POST   /api/v1/applications/{id}/decline/      Decline application (admin)
```

### Chat
```
POST   /api/v1/chat/ask/                       Ask AI chatbot
```

---

## 🎨 Frontend Routes

| Route | Component | Protected | Role |
|-------|-----------|-----------|------|
| `/` | HomeScreen | ❌ | Public |
| `/signin` | SignIn | ❌ | Public |
| `/register` | SignUp | ❌ | Public |
| `/services` | ServiceList | ❌ | Public |
| `/services/:id` | ServiceDetail | ❌ | Public |
| `/profile` | UserProfile | ✅ | User+ |
| `/apply` | SellerApplication | ✅ | User |
| `/seller/dashboard` | SellerDashboard | ✅ | Seller |
| `/admin/users` | AdminUsers | ✅ | Admin |

---

## 📦 Key Components

### Frontend Components
- **ProtectedRoute:** Guards routes with auth & role checks
- **Chatbot:** Floating AI assistant with OpenAI integration
- **Loading:** Spinner component for async operations
- **ServiceList:** Grid display of all services
- **ServiceDetail:** Full service info with PayPal button
- **UserProfile:** User info & order history table
- **AdminUsers:** User & application management interface
- **SellerDashboard:** Service CRUD for sellers
- **SellerApplication:** Seller signup form

### Redux Store Structure
```javascript
store: {
  user: {
    userInfo, loading, error, registerSuccess
  },
  order: {
    orders, order, loading, error, success
  }
}
```

---

## 🧪 Testing the Application

### Test User Flows

**1. Register & Login**
- Go to `/register`
- Fill form with valid email, password, phone, location, gender
- Sign in with credentials
- View profile

**2. Browse Services**
- Click "View Services" or navigate to `/services`
- Click on a service card to view details
- See seller information

**3. Make a Purchase** (test with PayPal sandbox)
- Click "Avail Service" on service detail
- Complete PayPal payment
- Order appears in `/profile` → Order History

**4. Become a Seller**
- From home (as regular user), click "Become a Seller"
- Submit application
- Wait for admin approval

**5. Admin Review**
- Login as admin
- Go to `/admin/users`
- Switch to "Applications" tab
- Approve or decline applications

**6. Seller Dashboard**
- Once approved, visit `/seller/dashboard`
- Create new services
- View and delete existing services

**7. AI Chatbot**
- Click floating 💬 button (bottom-right)
- Ask HVAC-related questions
- Chatbot responds with AI answers

---

## 📝 Git History

12 commits tracking development:

```
1. Initial project setup with Django & React
2. Stage 1: User auth with JWT
3. Stage 1: Frontend auth screens
4. Stage 2: Service model & views
5. Stage 2: Service UI components
6. Complete initial stages & push
7. Debug frontend: fix imports & routing
8. Fix React 18 createRoot API
9. Stage 3: PayPal & order management
10. Stage 4: Admin panel & chatbot
11. Stage 5: Protection & validation
12. Fix unused imports cleanup
```

View on GitHub: https://github.com/BenjPatt03/quiz-6

---

## 🔧 Configuration Files

### Backend Settings
- **JWT:** 24h access, 7d refresh tokens
- **CORS:** Allowed origins: http://localhost:3000
- **Database:** SQLite3 (dev), easily swappable
- **Media:** Services images stored in `/backend/media/`

### Frontend Environment
```
REACT_APP_PAYPAL_CLIENT_ID=AQfh-q0n87nYUhCqAe0xBh6Xl5...
REACT_APP_API_URL=http://localhost:8000
```

---

## 🐛 Known Issues & Notes

- PayPal integration uses sandbox mode (test payments)
- Chatbot requires OPENAI_API_KEY in backend environment
- Images are served via Django development server
- SQLite used for development (use PostgreSQL for production)

---

## 📚 Additional Resources

- Django REST Framework: https://www.django-rest-framework.org/
- React Docs: https://react.dev
- Redux Toolkit: https://redux-toolkit.js.org/
- PayPal Integration: https://developer.paypal.com/

---

## 👤 Author

**Benj Patt**
- GitHub: https://github.com/BenjPatt03
- Repository: https://github.com/BenjPatt03/quiz-6

---

## 📄 License

This project is created for educational purposes.

---

**Last Updated:** Stage 5 Complete - All Features Implemented ✓
**Project Duration:** 5 Stages across full development lifecycle
**Status:** Ready for production setup and deployment
