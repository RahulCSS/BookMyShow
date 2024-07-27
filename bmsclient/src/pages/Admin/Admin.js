import React, { Children } from 'react'
import { Tabs } from 'antd';
import MovieLists from '../../components/MovieLists';
import TheatreLists from './TheatreLists';

function Admin() {

  const items =[{ key:'movies', label:'Movies List', children: <MovieLists/>},
                {key:'theatre', label:'Theatres List', children:<TheatreLists/>}];

  return (
    <div>
        <Tabs defaultActiveKey="movies" items={items}>
        
        </Tabs>
    </div>
  )
}

export default Admin