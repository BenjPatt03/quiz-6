# HVAC Services Marketplace Platform

A full-stack marketplace platform for HVAC (Heating, Ventilation & Air Conditioning) services. Built with Django REST Framework backend and React frontend.

## Project Structure

```
├── backend/          # Django REST API
│   ├── venv/        # Python virtual environment
│   ├── manage.py
│   ├── backend/     # Project settings
│   └── [apps]/      # Django apps
└── frontend/        # React application
    ├── src/
    └── package.json
```

## Development Setup

### Backend
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\Activate.ps1 on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Technology Stack

**Backend:**
- Django REST Framework
- JWT Authentication (djangorestframework-simplejwt)
- CORS Support (django-cors-headers)
- OpenAI API (gpt-4o-mini)

**Frontend:**
- React
- Redux Toolkit
- Axios
- React Router
- PayPal Integration

## Implemented Stages

- [ ] Stage 1: Foundation & Authentication
- [ ] Stage 2: Services & Seller Application Flow
- [ ] Stage 3: Orders & PayPal
- [ ] Stage 4: Admin Panel & AI Chatbot
- [ ] Stage 5: Polish, Protection & Validation

## License

MIT
