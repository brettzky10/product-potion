import React from 'react'
import PortfolioSection from './portfolio-section'
import CreativeSection from './creativity-section'

const ShowcaseSection = () => {
  return (
    <section className='relative'>
          {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:invisible"/>
          <div className="dark:visible invisible absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"/> */}
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"/>
         <div className="absolute z-10 flex left-[10%] justify-center items-center md:mt-[-70px] flex-col">
          <PortfolioSection/>
          <CreativeSection/>
        </div>
      </section>
  )
}

export default ShowcaseSection