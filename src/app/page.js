import Getdata from '@/components/Getdata'
import Hero from '@/components/Hero'
import React from 'react'

const page = () => {
  return (
    <div className="">
      <Hero />
      <div className="container">
      <h1 className="heading">Products</h1>
      <Getdata/>
    </div>
    </div>
  )
}

export default page