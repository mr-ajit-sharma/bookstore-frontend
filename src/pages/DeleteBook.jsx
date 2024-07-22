import React, { useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../services/helper'
const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const handleDeleteButton = () => {
    
    setLoading(true)
    axios
      .delete(`${BASE_URL}/books/${id}`)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        alert("check in the console something went wrong")
        console.log(err)
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      <div className=' w-full flex items-center justify-center'>{loading ? <Spinner /> : ""}</div>
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl width-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteButton}>
          Yes'Delete It
        </button>
      </div>
    </div>
  )
}

export default DeleteBook