import React from 'react'
import HeroSection from '../Home/HeroSection'
import TopRatedInstitutions from '../Home/TopRatedInstitutions'
import LowRatedInstitutions from '../Home/LowRatedInstitutions'
import RateAndReview from '../Home/RateAndReview'

function Home() {
  return (
    <>
    <HeroSection />
    <TopRatedInstitutions />
    <LowRatedInstitutions />
    <RateAndReview />
    </>
  )
}

export default Home