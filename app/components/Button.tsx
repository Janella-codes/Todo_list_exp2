
import React from 'react'
import { useFormStatus } from 'react-dom';

export default function Button() {
    const { pending } = useFormStatus();

  return (
    <button 
    className="text-white px-4 py-2 rounded-md"
    disabled={pending} 
    >
        Add
    </button>
  )
}


