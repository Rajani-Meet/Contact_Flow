# ContactFlow - Contact Management System

A modern contact management system built with React, Vite, and MongoDB.

## Features

- Create, read, update, and delete contacts
- Search contacts by name, email, phone, or company
- Filter contacts by category (Family, Friend, Work, Other)
- Mark contacts as favorites
- Responsive design for all devices
- Beautiful UI with animations
- Real-time updates

## Tech Stack

- Frontend:
  - React
  - Vite
  - React Router
  - Framer Motion
  - Tailwind CSS
  - Lucide Icons
  - React Hot Toast

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/contact-flow.git
   cd contact-flow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3001
   VITE_API_URL=http://localhost:3001/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. In a separate terminal, start the backend server:
   ```bash
   npm run server
   ```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build
- `npm run server` - Start the backend server
- `npm run lint` - Run ESLint

## Project Structure

```
contact-flow/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── types/         # Type definitions
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── server/            # Backend server
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   └── index.js       # Server entry point
├── public/            # Static assets
└── index.html         # HTML template
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [React Hot Toast](https://react-hot-toast.com/) 