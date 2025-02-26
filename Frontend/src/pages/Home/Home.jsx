import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
const home = () => {
  const [category, setCategory] = useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
    </div>
  )
}

export default home
