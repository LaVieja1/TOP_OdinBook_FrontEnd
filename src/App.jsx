import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { HomeLayout } from './components/HomeLayout';

export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<HomeLayout />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
}