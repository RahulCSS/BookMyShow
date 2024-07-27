import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Forgot from './pages/Forgot.js';
import Admin from './pages/Admin/Admin.js';
import Profile from './pages/Profile/Profile.js';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
       {loading && (
        <div className = 'flex justify-center items-center h-screen w-screen'>
          <Flex align="center" gap="middle">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </Flex>
        </div>
      )} 
      
      
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute>
                                     <Home/>
                                     </ProtectedRoute>}/>
            <Route path="/admin" element={<ProtectedRoute>
                                          <Admin/>
                                          </ProtectedRoute>}/>
            <Route path="/profile" element={<ProtectedRoute>
                                            <Profile />
                                            </ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Routes>
        </Router>
  
    </div>
  );
}

export default App;
