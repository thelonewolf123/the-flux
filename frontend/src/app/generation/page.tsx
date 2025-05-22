import React from 'react'

import GenerationPage from './generate'
import HistorySection from './history'

const page = () => {
    return (
        <div className="container mx-auto px-4 py-6 relative z-10">
            <GenerationPage />
            <HistorySection />
        </div>
    )
}

export default page
