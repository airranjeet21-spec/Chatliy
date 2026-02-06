import React from 'react'
import MessageArea from '../Components/MessageArea'
import SideBar from '../Components/SideBar'
import useGetMessages from '../customHooks/getMessages';

function Home() {
  useGetMessages();
  return (
    <div className='w-full h-[100vh] flex overflow-hidden'>
     <SideBar/>
     <MessageArea/>
    </div>
  )
}

export default Home
