# Riwayat - Indian Cultural Heritage Platform

A modern web application showcasing India's rich cultural heritage through an interactive platform that connects artisans, cultural enthusiasts, and learners. Built with React, Node.js, and MongoDB to preserve and celebrate India's diverse cultural traditions.

## 🌟 Features

### Frontend Features
- **Interactive Cultural Map**: Explore cultural events and activities across different regions of India
- **Artisan Marketplace**: Browse and purchase authentic handcrafted products directly from artisans
- **Creator Hub**: Platform for artists and cultural practitioners to share their work
- **Learning Modules**: Access to workshops and educational content about traditional arts
- **Community Engagement**: Connect with other cultural enthusiasts and practitioners
- **Modern UI Design**: Clean, responsive interface with orange accent colors
- **Category-Based Navigation**: Interactive icons linking to different cultural aspects

### Backend Features
- **RESTful APIs**: Complete CRUD operations for events, stories, destinations, and artists
- **User Authentication**: JWT-based secure authentication system
- **Content Management**: Protected dashboard for content creators
- **Database Integration**: MongoDB with structured schemas for all content types
- **Real-time Data**: Dynamic content fetching from backend APIs

### Content Sections
- **Recent Events**: Cultural events and festivals with external links
- **Featured Stories**: Cultural narratives and traditions
- **Cultural Destinations**: Heritage sites and monuments
- **Artists Directory**: Traditional artisans and performers
- **Marketplace**: Cultural products and crafts

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

### Database
- **MongoDB Atlas** (cloud database)
- Structured schemas for all content types
- Relationship management between entities

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **MongoDB Atlas** account
- **Git**

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/riwayat__.git
cd riwayat
```

### 2. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and visit `http://localhost:5173`

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create .env file with your configuration
```

### 4. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=4000
```

### 5. Start Backend Server

```bash
# From backend directory
npm start
```

The backend will run on `http://localhost:4000`

## 📁 Project Structure

```
riwayat/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── AuthModal.tsx   # Authentication modal
│   │   ├── Header.tsx      # Main navigation header
│   │   ├── ImageCarousel.tsx  # Hero section carousel
│   │   ├── InteractiveMap.tsx # Cultural map component
│   │   ├── Marketplace.tsx    # Artisan marketplace
│   │   └── QuickAccessCard.tsx # Navigation cards
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Homepage
│   │   ├── Artists.tsx     # Artists directory
│   │   ├── Stories.tsx     # Cultural stories
│   │   ├── Destinations.tsx # Cultural destinations
│   │   ├── RecentEvents.tsx # Recent events
│   │   └── Dashboard.tsx   # User dashboard
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication context
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── backend/                # Node.js server
│   ├── models/             # MongoDB schemas
│   │   ├── Artist.js       # Artist model
│   │   ├── Product.js      # Product model
│   │   ├── RecentEvent.js  # Event model
│   │   ├── FeaturedStory.js # Story model
│   │   ├── Destination.js  # Destination model
│   │   └── User.js         # User model
│   ├── routes/             # API endpoints
│   │   ├── artists.js      # Artist routes
│   │   ├── products.js     # Product routes
│   │   ├── recentEvents.js # Event routes
│   │   ├── featuredStories.js # Story routes
│   │   ├── destinations.js # Destination routes
│   │   └── auth.js         # Authentication routes
│   ├── app.js              # Server configuration
│   ├── seed.js             # Database seeding
│   └── package.json
├── package.json            # Frontend dependencies
└── README.md
```

## 📜 Available Scripts

### Frontend Scripts
```bash
npm run dev          # Starts the development server
npm run build        # Creates a production build
npm run preview      # Previews the production build locally
npm run lint         # Runs ESLint to check code quality
```

### Backend Scripts
```bash
npm start            # Starts the backend server
npm run seed         # Seeds the database with sample data
```

## 🌐 Deployment

### Frontend Deployment (Netlify)
1. Create a production build:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist` folder to Netlify

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or Render
2. Set environment variables in your hosting platform
3. Ensure MongoDB Atlas connection is configured

## 🔐 Authentication

The platform includes a complete authentication system:
- User registration and login
- JWT-based session management
- Protected routes for content creators
- Role-based access control (artist, admin)

## 📊 Database Models

### Recent Events
- Title, description, image, location, date, external link

### Featured Stories
- Title, description, image, category, region, author, read time, external link

### Cultural Destinations
- Name, description, image, region, best time, heritage status, entry fee, external link

### Artists
- Name, specialties, location, image, rating, experience

### Users
- Name, email, password, role (artist/admin)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Indian cultural heritage and traditions
- Traditional artists and artisans
- Open source community
- Design inspiration from modern web platforms

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Riwayat** - Preserving India's Cultural Legacy for Future Generations 🌟 