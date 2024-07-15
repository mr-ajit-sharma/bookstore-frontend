import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/helper'
import Spinner from '../components/Spinner'
import { MdOutlineAddBox } from 'react-icons/md'
import { Link } from 'react-router-dom'
import BooksTable from '../components/home/BooksTable'
import BooksCard from '../components/home/BooksCard'
const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showType, setShowType] = useState('table')
  useEffect(() => {
    setLoading(true)
    console.log("helo i m abc")
    const getBook = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/books`)
        console.log("i m calling from api", response)
        setBooks(response.data.books)
        setLoading(false)

      } catch (error) {
        console.log(error, "error in getting the books")
      }
    }
    getBook()
  }, [])
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('table')}>Table</button>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('card')}>Card</button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      <div className=' flex items-center justify-center  h-4/5 w-full'>
      {loading ?
        <Spinner /> : showType === 'table' ? (<BooksTable books={books} />) : <BooksCard books={books} />
      }

      </div>
    </div>
  )
}

export default Home
