import React, { useState,useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { BASE_URL } from '../services/helper'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {id}=useParams()
  useEffect(()=>{
    setLoading(true)
    axios.get(`${BASE_URL}/books/${id}`)
    .then((response) => {
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setPublishYear(response.data.publishYear)
      setLoading(false)
    })
    .catch((err) => {
      setLoading(false)
      alert("an error happened please checked the console.")
      console.log(err)
    })
  },[])
  const handleEditBook = () => {
    const data={
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios.put(`${BASE_URL}/books/${id}`,data)
    .then(()=>{
      setLoading(false)
      navigate('/')
    })
    .catch((err)=>{
      setLoading(false)
      alert("an error happened please checked the console.")
      console.log(err)
    })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label htmlFor="title" className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text" value={title} placeholder='Enter the title' onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label htmlFor="author" className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text" value={author} placeholder='Enter the Author name' onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label htmlFor="publishYear" className='text-xl mr-4 text-gray-500'>Publish year</label>
          <input type="text" value={publishYear} placeholder='Enter the date of the publish year' onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
        Save
        </button>
      </div>
    </div>
  )
}

export default EditBook