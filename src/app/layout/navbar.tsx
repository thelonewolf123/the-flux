import { Settings } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <header className="z-50 border-b border-white/10 backdrop-blur-sm bg-[#030303]/80">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                        Creative Studio
                    </h1>
                    <span className="px-2 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs">
                        Pro
                    </span>
                </div>
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <Settings className="w-5 h-5 text-white/80" />
                </button>
            </div>
        </header>
    )
}

export default Navbar
