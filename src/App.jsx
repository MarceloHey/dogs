
import Header from './components/Header'
import Footer from './components/Footer'
import User from './components/user/User';
import Photo from './components/photo/Photo'
import ProtectedRoute from './components/helpers/ProtectedRoute';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login/Login';
import UserProfile from './components/user/UserProfile';
import { UserStorage } from './UserContext';
import './App.css';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className='appBody'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login/*" element={<Login />} />
              <Route path="/conta/*" element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              } />
              <Route path="foto/:id" element={<Photo />} />
              <Route path="perfil/:user" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
