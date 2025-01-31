"use client"

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Toggle } from './ui/toggle'
import axios from 'axios';

const Toprightbar = () => {
  const [input, setInput] = useState("");
  const fetchData = async (value:string) => {
    const response = await axios.get(`http://localhost:8000/api/relationships`);
  }

  const handleChange = (value : string) => {
    setInput(value);
    fetchData(value);
  }

  return (
    <div className='flex flex-row'>
        <Input placeholder='Search' onChange={(e) => handleChange(e.target.value)}/>
        
    </div>
  )
}

export default Toprightbar