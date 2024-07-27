import { Button, Dropdown, Space } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
function Header() {
    const {user} = useSelector((state)=> state.users);
    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
      ];
  return (
    <div className='flex place-content-between p-4 bg-teal-500'>
        <p className='text-2xl font-bold '>Book my Show {user.isAdmin ? 'Admin' : ''}</p>
        <Space direction="vertical">
            <Space wrap>
            <Dropdown menu={{items}} placement="bottomRight">
            <Button>User</Button>
            </Dropdown>
            </Space>
        </Space>
    </div>
  )
}

export default Header