import { message, Table, Button, Switch, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from'react-redux';
import { GetTheatre, UpdateTheatre } from '../../apicalls/theatre';
import { hideLoading, showLoading } from '../../store/loaderSlice';

function TheatreList() {

  const [theatres, settheatres ] = useState([]);
  const [theatreModal, settheatreModal] = useState(false);
  const [selectTheatre, setselectTheatre] = useState(null);
  const [formType,setformType] = useState('add');
  const dispatch = useDispatch();

  useEffect(() => {
      getData();
  },[]);
  
  const getData = async () => {
      try {
          dispatch(showLoading());
          const response = await GetTheatre();
          if(response.success) {
              settheatres(response.data);
          } else {
              message.error(response.message);
          }
          dispatch(hideLoading());
      }catch (error){
          
          dispatch(hideLoading());
          message.error(error.message);
      }
  };

  const handleOnChange = async (theatre) => {
    console.log(theatre);
      try {
          console.log(theatre);
          dispatch(showLoading());
          const response = await UpdateTheatre({
            theatreId: theatre._id,
            ...theatre,
            isActive: !theatre.isActive,
          });
          if(response.success) {
              message.success(response.message);
              getData();
          } else {
              message.error(response.message);
          }
          dispatch(hideLoading());
      }catch (error){
          dispatch(hideLoading());
          message.error(error.message);
      }
  };

  const columns = [
    {title: 'Theatre Name',dataIndex: 'theatreName'},
    {title: 'Address',dataIndex: 'address'},
    {title: 'Phone',dataIndex: 'phone'},
    {title: 'E-Mail',dataIndex: 'email'},
    {title: 'Owner',dataIndex: 'owner',
      render: (owner, rowData) => {
        return owner.name;
      },
  
    },
    {title: 'Status',dataIndex: 'isActive',
      render: (isActive) => {
        if (isActive){
          return 'Approved';
        } else {
          return 'Pending/Blocked';
        }
      },
    },
    {title: 'Action',dataIndex: 'action',
      render: (_, record) => (
        <div>
          <Space direction="vertical">
          <Switch
              defaultChecked={record.isActive}
              checkedChildren='Approved'
              unCheckedChildren='Blocked'
              onChange={() => handleOnChange(record)}
          />
          </Space>
        </div>
        ),
    },
];

  return (
    <div>
        <Table columns={columns} dataSource={theatres} />
    </div>
  )
}

export default TheatreList;