import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const MyDropdown = () => {
    const menu = (
        <Menu>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Log Out</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown menu={menu}>
            <Button>
                Dropdown <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default MyDropdown;