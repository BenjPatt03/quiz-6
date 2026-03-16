# HVAC Services Marketplace - Implementation Progress

## ✅ COMPLETED STAGES

### Stage 1: Foundation & Authentication ✓
- **Backend**: CustomUser model with JWT auth, login/register endpoints
- **Frontend**: Redux store, SignIn/SignUp screens, authentication flow
- **Database**: User tables created with migrations

### Stage 2: Services & Applications ✓
- **Backend**: 
  - SellerApplication model for seller approval flow
  - Service model for HVAC service listings
  - All serializers and views implemented
  - API endpoints for CRUD operations
- **Frontend**:
  - ServiceList component for browsing services
  - ServiceDetail component for viewing individual services
  - Routing configured

## 🔄 REMAINING STAGES (3, 4, 5)

### Stage 3: Orders & PayPal Integration

#### Backend TODO:
1. Update settings.py to add `OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')`
2. Admin user registration - create a superuser with role='admin' via Django shell
3. Test order creation endpoint with PayPal transaction IDs

#### Frontend TODO:
1. Install and configure PayPal:
   ```bash
   export REACT_APP_PAYPAL_CLIENT_ID=your_sandbox_client_id
   ```

2. Create OrderActions in `src/actions/orderActions.js`:
   - `createOrder(orderData)` - POST to `/api/v1/orders/create/`
   - `getUserOrders()` - GET `/api/v1/orders/my_orders/`

3. Create OrderConstants in `src/constants/orderConstants.js`

4. Create OrderReducer in `src/reducers/orderReducer.js`

5. Create UserProfile screen in `src/screens/UserProfile.jsx`:
   - Display user information
   - Show order history in table format
   - Display seller dashboard link if role is seller

6. Update ServiceDetail.jsx to integrate PayPal:
   ```jsx
   import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
   
   // In return:
   <PayPalScriptProvider options={{
     clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID
   }}>
     <PayPalButtons
       createOrder={(data, actions) => {
         // Set amount, description, payee.merchant_id
       }}
       onApprove={(data, actions) => {
         // Dispatch createOrder action with transaction ID
       }}
     />
   </PayPalScriptProvider>
   ```

7. Create routes in App.js:
   - `/profile` → UserProfile
   - `/orders` → OrderHistory (optional separate screen)

### Stage 4: Admin Panel & AI Chatbot

#### Backend TODO:
1. Ensure OpenAI API is configured in settings
2. Create AdminUserDetailView in users/views.py for user editing/deletion
3. Add routes in users/urls.py: `admin/users/<pk>/`

#### Frontend TODO:
1. Create AdminUsers screen in `src/screens/AdminUsers.jsx`:
   - Tab 1: Users list with edit/delete buttons
   - Tab 2: Seller applications with approve/decline
   - Fetch from `/api/v1/users/admin/users/`
   - Fetch applications from `/api/v1/applications/list_applications/`

2. Create Chatbot component in `src/components/Chatbot.jsx`:
   - Floating button (bottom-right)
   - Toggle chat window
   - Send message to `/api/v1/chat/ask/`
   - Display AI response

3. Create ChatActions and ChatReducer for Redux

4. Add ProtectedRoute component in `src/components/ProtectedRoute.jsx`:
   ```jsx
   export const ProtectedRoute = ({ children, requiredRole = null }) => {
     const { userInfo } = useSelector(state => state.user);
     
     if (!userInfo) return <Navigate to="/signin" />;
     if (requiredRole && userInfo.role !== requiredRole) 
       return <Navigate to="/" />;
     return children;
   };
   ```

5. Routes to add in App.js:
   - `/admin/users` → AdminUsers (with ProtectedRoute role=admin)
   - Mount `<Chatbot />` globally in App.js

### Stage 5: Polish, Protection & Validation

#### Backend TODO:
1. Create permission classes in utils:
   ```python
   class IsSeller(permissions.BasePermission):
       def has_permission(self, request, view):
           return request.user.role == 'seller'
   
   class IsAdmin(permissions.BasePermission):
       def has_permission(self, request, view):
           return request.user.role == 'admin'
   ```

2. Add validators to models:
   - Services: `MinValueValidator(0)` on price and rating
   - Already added to models

3. Update views to use proper permission classes

4. Set `ALLOWED_HOSTS = ['localhost', '127.0.0.1']` (already done)

#### Frontend TODO:
1. Create Loading spinner in `src/components/Loading.jsx`

2. Form validation in all screens:
   - SignUp: email format, password ≥8 chars, match confirmation
   - SignIn: required fields
   - Service forms: required fields, positive price

3. Axios interceptor for 401 handling (already in place)

4. Apply ProtectedRoute to all auth-required routes

5. Test the complete e2e flow:
   - Register → Login → Browse services → Avail service → View order in profile

## RUNNING THE PROJECT

### Backend
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\Activate.ps1 on Windows
python manage.py runserver
```
Backend runs at: http://localhost:8000

### Frontend
```bash
cd frontend
npm start
```
Frontend runs at: http://localhost:3000

## API ENDPOINTS REFERENCE

### Users
- POST `/api/v1/users/register/` - Register new user
- POST `/api/v1/users/login/` - Login (returns JWT tokens)
- POST `/api/v1/users/refresh/` - Refresh token
- GET `/api/v1/users/profile/` - Get user profile

### Services
- GET `/api/v1/services/` - List all services
- GET `/api/v1/services/{id}/` - Service detail
- POST `/api/v1/services/create_service/` - Create service (seller)
- PUT `/api/v1/services/{id}/update_service/` - Update service (seller)
- DELETE `/api/v1/services/{id}/delete_service/` - Delete service (seller)

### Applications
- POST `/api/v1/applications/apply/` - Submit seller application
- GET `/api/v1/applications/list_applications/` - List applications (admin)
- POST `/api/v1/applications/{id}/approve/` - Approve application (admin)
- POST `/api/v1/applications/{id}/decline/` - Decline application (admin)

### Orders
- POST `/api/v1/orders/create_order/` - Create order (authenticated)
- GET `/api/v1/orders/my_orders/` - Get user's orders

### Chat
- POST `/api/v1/chat/ask/` - Ask chatbot question (authenticated)

## KEY SUCCESS CRITERIA

✓ Stage 1: Login works, JWT stored in localStorage
✓ Stage 2: Services display on frontend, seller can CRUD services
- [ ] Stage 3: PayPal integration, orders saved with transaction IDs
- [ ] Stage 4: Admin can approve/decline apps, chatbot responds
- [ ] Stage 5: All routes protected, forms validated, 401 redirects to signin

## NOTES

1. PayPal Sandbox: Get credentials from https://developer.paypal.com
2. OpenAI API: Set `OPENAI_API_KEY` environment variable
3. Media files: Upload to `/media/services/` via admin or API
4. CORS: Already configured for localhost:3000
5. JWT tokens expire in 24 hours (access), 7 days (refresh)

---

**Total Progress**: 40% (Stages 1-2 complete, Stages 3-5 remaining)
