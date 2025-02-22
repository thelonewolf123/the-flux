import React from 'react'

import Features from '@/components/internal/features'
import HeroGeometric from '@/components/internal/hero'
import Pricing from '@/components/internal/pricing'

const page = () => {
    return (
        <div className="">
            <HeroGeometric />
            <Features />
            <Pricing />
        </div>
    )
}

export default page
