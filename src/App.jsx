import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import { ProtectedLayout } from './components/ProtectedLayout';
import { HomeLayout } from './components/HomeLayout';

export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<HomeLayout />}>
        <Route index element={<Login />} />
      </Route>

      <Route path='/' element={<ProtectedLayout />}>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='users/:id' element={<Profile />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>
  );
}