import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { BASE_URL } from '../services/helper'
const ShowBook = () => {
  const [book, setBook] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}/books/${id}`)
    .then((response) => {
      setBook(response.data.book)
      setLoading(false);
      // console.log(response)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])
  const { id } = useParams()
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ?
        (
          <Spinner />
        ) : (
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span>{book.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Author</span>
              <span>{book.author}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              {console.log(book.publishYear)}
              <span>{book.publishYear}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
              <span>{new Date (book.updatedAt).toString()}</span>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ShowBook