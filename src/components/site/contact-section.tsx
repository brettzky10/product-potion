import Image from 'next/image'
import React from 'react'

const ContactSection = () => {
  return (
    <div className=''>
        <div className='bg-gradient-to-r from-primary via-transparent to-transparent p-10 absolute z-5'>
            Become your own boss
        </div>
        <img
        src="/images/site/store-man.webp"
        alt="store man"
        className='w-screen aspect-auto'
        width={0}
        height={0}
        />
    </div>
  )
}

export default ContactSection