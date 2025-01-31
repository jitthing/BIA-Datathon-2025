"use client"

import React, { useState } from 'react'
import { Input } from './ui/input'
import axios from 'axios';


interface SearchBarProps {
  onSearch: (searchTerm: string) => void
}

const SearchFunction = ({onSearch} : SearchBarProps) => {
  const [input, setInput] = useState("");
  // const fetchData = async (value:string) => {
  //   const response = await axios.get("http://localhost:8000/api/dataset", {
  //     params: { search: value }
  //   });
  //   console.log('response', response.data);
  // }

  const handleChange = (value : string) => {
    setInput(value);
    onSearch(input);
  }

  return (
    <div className='flex flex-row pb-2'>
        <Input placeholder='Search' onChange={(e) => handleChange(e.target.value)}/>
        
    </div>
  )
}

export default SearchFunction