import React, { useEffect } from 'react'
import './List.css'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async()=>{
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  const removeFood = async(id)=>{
    toast.loading("removing")
    const response = await axios.post(`${url}/api/food/remove`,{id:id})
    if (response.data.success) {
      toast.dismiss();
      toast.success("removed")}
    else{
      toast.dismiss();
      toast.error(response.data.message);
    }
    await fetchList();
  }

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div className="list-table-format" key={index}>
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
            </div>
          )
        })}
      </div>      
    </div>
  )
}

export default List
