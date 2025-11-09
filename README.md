# 💱 Currency Converter App  
### Flutter + Node.js + Express + MongoDB + JWT Authentication  

A secure full-stack **Currency Converter** that allows users to register, log in, and convert currencies in real-time using the **ExchangeRate API**.  
Built with **Flutter frontend** and a **Node.js backend** secured with **JWT authentication** and **MongoDB** database.  

---

## 🚀 Features

- User Signup & Login with JWT Authentication  
- Password Encryption using bcrypt  
- Real-time Currency Conversion (via ExchangeRate API)  
- Secure Token Storage (Flutter Secure Storage)  
- MongoDB Integration using Mongoose  
- Protected Routes with Middleware Authentication  
- Simple, Single-Page Flutter UI  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Flutter |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| Authentication | JWT + bcrypt |
| API | [ExchangeRate API](https://www.exchangerate-api.com) |

---

## ⚙️ Backend Setup

```bash
# Clone the repo
git clone https://github.com/<your-username>/Currency-Converter.git
cd backend

# Install dependencies
npm install

# Create a .env file
MONGO_URI=mongodb://localhost:27017/currencydb
JWT_SECRET=supersecretkey
PORT=4000
EXCHANGE_API_KEY=your_exchangerate_api_key

# Run the server
npm start

🧮 API Endpoints
| Method | Endpoint       | Description             | Auth |
| ------ | -------------- | ----------------------- | ---- |
| `POST` | `/api/signup`  | Register new user       | ❌    |
| `POST` | `/api/login`   | Login and get JWT token | ❌    |
| `POST` | `/api/convert` | Convert currencies      | ✅    |

🧠 Example Requests (Postman)
Signup
POST http://localhost:4000/api/signup

Body:
{
  "name": "Sam",
  "email": "sam@example.com",
  "password": "12345"
}

Login
POST http://localhost:4000/api/login

Body:
{
  "email": "sam@example.com",
  "password": "12345"
}

Convert
POST http://localhost:4000/api/convert

Headers:
Authorization: Bearer <your_token_here>
Content-Type: application/json

Body:
{
  "from": "USD",
  "to": "INR",
  "amount": 10
}


🖥️ Frontend Setup (Flutter)
cd ../frontend
flutter pub get
flutter run

Make sure your backend server (npm start) is running before launching the Flutter app.

🧠 Workflow Summary
1️⃣ User signs up → stored in MongoDB (password hashed)
2️⃣ Login → JWT token generated and returned
3️⃣ Token saved securely on device
4️⃣ Conversion requests made using Bearer <token> header
5️⃣ Backend verifies token → fetches conversion → returns result
6️⃣ Logout → token cleared → user redirected to login

🗄️ Folder Structure
Currency-Converter/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   ├── .env
│
└── frontend/
    ├── lib/
    │   ├── main.dart
    │   ├── login_page.dart
    │   ├── signup_page.dart
    │   └── home_page.dart
    └── pubspec.yaml


🧾 Common Issues
IssueFix400 Bad RequestCheck JSON format in Postman401 UnauthorizedAdd correct JWT token in headerConversion FailedUpdate API key in .envMongo not connectedVerify MONGO_URI and MongoDB service

📜 License
This project is open-source and free under the MIT License.

✨ Author
Developed by: Samarpan and Team
GitHub: @Samarpan-7

A secure, full-stack currency converter built with Flutter and Node.js 🌍💱


---

