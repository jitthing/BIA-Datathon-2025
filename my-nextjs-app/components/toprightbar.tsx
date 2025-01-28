import React from 'react'
import { Input } from './ui/input'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Toggle } from './ui/toggle'

const Toprightbar = () => {
  return (
    <div className='flex flex-row'>
        <Input placeholder='Search'/>
        
    </div>
  )
}

export default Toprightbar