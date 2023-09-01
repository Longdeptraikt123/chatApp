import './App.css';
import Register from './pages/Register';
import { useContext } from 'react'
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';

function App() {
  const { currentUser } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route index element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }></Route>
      </Routes>
    </Router>
  );
}

export default App;
