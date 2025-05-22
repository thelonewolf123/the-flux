'use client'
import { Clock, ImageIcon, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

import { ImagePreviewDialog } from './generate'

const previousGenerations = [
    {
        id: 1,
        imageUrl: '/placeholder-image.jpg',
        prompt: 'A futuristic city with flying cars and neon lights',
        timestamp: '2 hours ago'
    },
    {
        id: 2,
        imageUrl: '/placeholder-image.jpg',
        prompt: 'Sunset over a tropical beach with palm trees',
        timestamp: '5 hours ago'
    },
    {
        id: 3,
        imageUrl: '/placeholder-image.jpg',
        prompt: 'Mountain landscape with snow peaks and a clear blue sky',
        timestamp: '1 day ago'
    }
]
const HistorySection = () => {
    const [historyPreview, setHistoryPreview] = useState<string | null>(null)

    return (
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.1] rounded-2xl flex-1 overflow-hidden">
            <div className="p-6 border-b border-white/[0.1]">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                        Previous Generations
                    </h2>
                    <Clock className="w-5 h-5 text-white/60" />
                </div>
            </div>

            <div className="overflow-y-auto h-[calc(90vh-430px)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20 p-4">
                {previousGenerations.length > 0 ? (
                    <div className="space-y-4">
                        {previousGenerations.map((item) => (
                            <div
                                key={item.id}
                                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all group cursor-pointer"
                            >
                                <div className="flex gap-4">
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.prompt}
                                            fill
                                            className="object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                            onClick={() =>
                                                setHistoryPreview(item.imageUrl)
                                            }
                                        >
                                            <Maximize2 className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white/80 line-clamp-2 mb-2">
                                            {item.prompt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white/40">
                                                {item.timestamp}
                                            </span>
                                            <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                                                Use Again
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10">
                        <ImageIcon className="w-12 h-12 text-white/20 mb-4" />
                        <h3 className="text-lg font-medium text-white/60 mb-2">
                            No history yet
                        </h3>
                        <p className="text-sm text-white/40">
                            Your generated images will appear here
                        </p>
                    </div>
                )}
            </div>
            <ImagePreviewDialog
                isOpen={!!historyPreview}
                onClose={() => setHistoryPreview(null)}
                imageUrl={historyPreview}
            />
        </div>
    )
}

export default HistorySection
