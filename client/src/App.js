import './App.css';
import Header from './components/static/Header'
import Footer from './components/static/Footer';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/auth/register' element={<Register />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/main/profile' element={<UserProfile />} />
            <Route path='/admin/adminpanel' element={<AdminPanel />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
