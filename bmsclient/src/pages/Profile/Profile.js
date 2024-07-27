import React from 'react';
import { Tabs } from 'antd';
import TheatreLists from './TheatreLists';

function Profile() {
    
 
const items =[{ key:'movies', label:'Movies in Screens'},
            {key:'theatre', label:'Theatres running Shows', children:<TheatreLists/>}];

return (
  <div>
    <Tabs defaultActiveKey="movies" items={items}>

    </Tabs>
  </div>
)
}


export default Profile