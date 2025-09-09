import React from 'react'
import HeroSection from '../Home/HeroSection'
import TopRatedInstitutions from '../Home/TopRatedInstitutions'
import LowRatedInstitutions from '../Home/LowRatedInstitutions'

function Home() {
  return (
    <>
    <HeroSection />
    <TopRatedInstitutions />
    <LowRatedInstitutions />
    </>
  )
}

export default Home