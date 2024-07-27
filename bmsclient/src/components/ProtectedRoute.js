import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, message, Avatar } from 'antd';
//*API
import { GetCurrentUser } from '../apicalls/users';

//* Actions
import { setUser } from '../store/userSlice';
import { showLoading,hideLoading } from '../store/loaderSlice';

function ProtectedRoute({children}) {
  //console.log(children);
  
  const logout = ()=>{
    localStorage.removeItem('token');
                      navigate('/login');
                      message.info({
                        content: 'You have been logged out successfully!',
                        style: {
                          marginTop: '30vh',
                        },
                      });
  }

  const items = [
    {
      key:'1',
      label: (<p>A</p>),
    },
    {
      key:'2',
      label: (<p>B</p>),
    },
    {
      key:'3',
      label: (<p onClick={()=>{logout();}}>Log Out</p>),
      danger: true,
    },
  ];


  const {user} = useSelector((state)=> state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getpresentUser = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      dispatch(hideLoading());
      if(response.success){
        dispatch(setUser(response.data));
      }else {
        dispatch(setUser(null))
        message.error(response.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error){
      dispatch(hideLoading());
      dispatch(setUser(null))
      message.error('Failed to fetch user data, please try again later');
      localStorage.removeItem('token');
      navigate('/login');
  }}

  useEffect(()=> {
    if(localStorage.getItem('token')){
      getpresentUser();
    } else {
      navigate('/login');
    }
  },[])
  
  return (
    user && (
      <div>
        <div className='flex place-content-between p-4 bg-teal-500'>
          <p className='text-2xl font-bold '>Book my Show </p>
            <div className='flex gap-2'>
            <Space direction="vertical">
                <Space wrap>
                <Dropdown menu={{items}} placement="bottomRight">
                <Button onClick={()=>{
                              if(user.isAdmin){
                                navigate('/admin');
                              } else{
                                navigate('/profile');
                              }
                        }}>
                          <Avatar style={{backgroundColor: '#87d068',}} icon={<UserOutlined />}/>
                          {user.name}{user.isAdmin ? '(Admin)' : '(User)'}
                </Button>
                </Dropdown>
                </Space>
            </Space>
            <LogoutOutlined className='text-2xl'onClick={()=>{logout();}}/>   
            </div>           
        </div>
        <div className='m-3'>{children}</div>
      </div>
    )
  );
}
export default ProtectedRoute;