import { message, Table, Button} from 'antd';
import { EditOutlined,DeleteOutlined  } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from'react-redux';
import TheatreForm from './TheatreForm';
import { DeleteTheatre, GetTheatreByOwner } from '../../apicalls/theatre';
import { hideLoading, showLoading } from '../../store/loaderSlice';

function TheatreList() {

  const {user} = useSelector((state) => state.users);
  const [theatres, settheatres ] = useState([]);
  const [theatreModal, settheatreModal] = useState(false);
  const [selectTheatre, setselectTheatre] = useState(null);
  const [formType,setformType] = useState('add');
  const [openModal, setopenModal] = useState(false);
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  useEffect(() => {
      getData();
  },[]);
  
  const getData = async () => {
      try {
          dispatch(showLoading());
          const response = await GetTheatreByOwner({
            owner: user._id,
          });
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

  const handleDelete = async (theatreId) => {
      try {
          console.log(theatreId);
          dispatch(showLoading());
          const response = await DeleteTheatre(theatreId);
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
        render: (text, record) => {
            return (
                <div className='flex'>
                    <Button className = 'mx-1' size='large' icon={<EditOutlined />}title= 'edit' type="primary" 
                      onClick={() => {
                        settheatreModal(true);
                        setformType('edit');
                        setselectTheatre(record);
                      }}
                    />
                    <Button className = 'mx-1' size='large' icon={<DeleteOutlined />}title= 'delete' type="primary" onClick={() => {handleDelete(record._id)}}/>
                </div>
            )
        }
    },
];

  return (
    <div>
      <div className ='flex justify-end m-1'>
          <Button title='Add Theatre' type="primary"  
              onClick = {() => {
                  settheatreModal(true);
                  setformType('add')
              }}
          >
            Add Theatre
            </Button>    
        </div>
        <Table columns={columns} dataSource={theatres} />

        {theatreModal && (
            <TheatreForm
            theatreModal = {theatreModal}
            settheatreModal = {settheatreModal}
            selectTheatre = {selectTheatre}
            setselectTheatre = {setselectTheatre}
            formType = {formType}
            getData = {getData}
            />
        )}
    </div>
  )
}

export default TheatreList;