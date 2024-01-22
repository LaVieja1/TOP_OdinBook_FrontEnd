import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import { ProtectedLayout } from './components/ProtectedLayout';
import { HomeLayout } from './components/HomeLayout';

export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<HomeLayout />}>
        <Route index element={<Login />} />
      </Route>

      <Route path='/' element={<ProtectedLayout />}>
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>
  );
}