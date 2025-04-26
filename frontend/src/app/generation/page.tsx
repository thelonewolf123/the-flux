'use client'

import { motion } from 'framer-motion'
import {
    Check,
    Image as ImageIcon,
    ImagePlus,
    Maximize2,
    Sparkles,
    Trash2,
    Upload,
    X
} from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useGenerateStore } from '@/store/useGenerateStore'

const dummyImages = Array(4).fill('/placeholder-image.jpg')

interface SelectedImages {
    [key: string]: number | null
}

interface ImagePreviewDialogProps {
    isOpen: boolean
    onClose: () => void
    imageUrl: string | null
}

const ImagePreviewDialog = ({
    isOpen,
    onClose,
    imageUrl
}: ImagePreviewDialogProps) => {
    if (!imageUrl) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/90 border-white/10">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full border-2 bg-black/50 hover:bg-black/70 transition-colors z-50 group"
                >
                    <X className="w-5 h-5 text-white/70 group-hover:text-white/90" />
                </button>
                <div className="relative aspect-[16/9] w-full">
                    <Image
                        src={imageUrl}
                        alt="Preview"
                        fill
                        className="object-contain"
                        quality={100}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default function GenerationPage() {
    const { selectedSections, write } = useGenerateStore()

    const handleImageSelect = (sectionId: string, imageIndex: number) => {
        write({
            selectedSections: {
                ...selectedSections,
                [sectionId]:
                    selectedSections[sectionId] === imageIndex
                        ? null
                        : imageIndex
            }
        })
    }

    return (
        <div className="min-h-screen bg-[#030303] text-white">
            {/* Background gradients */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-rose-500/10 blur-3xl" />
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#030303] to-transparent" />
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 h-[90vh]">
                    {/* Left side - Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.1] overflow-hidden"
                    >
                        <div className="p-6 border-b border-white/[0.1] bg-white/[0.02]">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                Generated Images
                            </h2>
                        </div>
                        <div className="flex flex-col gap-4 p-4 overflow-y-auto h-[calc(85vh-80px)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
                            {Array(4)
                                .fill(null)
                                .map((_, i) => (
                                    <LeftSideSection
                                        key={i}
                                        sectionId={`section${i + 1}`}
                                        selectedImage={
                                            selectedSections[`section${i + 1}`]
                                        }
                                        onImageSelect={(imageIndex) =>
                                            handleImageSelect(
                                                `section${i + 1}`,
                                                imageIndex
                                            )
                                        }
                                    />
                                ))}
                        </div>
                    </motion.div>

                    {/* Right side - Upload Section */}
                    <RideSideSection />
                </div>
            </div>
        </div>
    )
}

interface LeftSideSectionProps {
    sectionId: string
    selectedImage: number | null
    onImageSelect: (imageIndex: number) => void
}

const LeftSideSection = ({
    sectionId,
    selectedImage,
    onImageSelect
}: LeftSideSectionProps) => {
    return (
        <div className="space-y-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
            <div>
                <h2 className="text-xl font-semibold text-white/90">
                    Select the scenery you want
                </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dummyImages.map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        className="relative group"
                        onClick={() => onImageSelect(index)}
                    >
                        <div
                            className={cn(
                                'aspect-square relative rounded-xl overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent border transition-all',
                                selectedImage === index
                                    ? 'border-indigo-500 ring-2 ring-indigo-500/50'
                                    : 'border-white/[0.08] hover:border-white/[0.2]'
                            )}
                        >
                            {selectedImage === index && (
                                <div className="absolute top-2 right-2 z-10 bg-indigo-500 rounded-full p-1">
                                    <Check className="w-4 h-4" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="p-2 h-full">
                                <div className="relative h-full w-full bg-black/20 rounded-lg overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                                    <ImagePlus className="absolute inset-0 m-auto w-8 h-8 text-white/40 group-hover:text-white/60 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

const RideSideSection = () => {
    const [isDragging, setIsDragging] = useState(false)
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        handleFileUpload(file)
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleFileUpload(e.target.files[0])
        }
    }

    const handleFileUpload = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setUploadedImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = () => {
        setUploadedImage(null)
    }

    const handleGenerate = async () => {
        if (!uploadedImage || !prompt) return
        setIsLoading(true)
        try {
            // Add your image generation API call here
            await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulated delay
        } catch (error) {
            console.error('Generation failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/3 flex flex-col justify-center"
        >
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                Upload Reference
            </h2>
            <div className="space-y-6">
                {!uploadedImage ? (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={cn(
                            'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300',
                            isDragging
                                ? 'border-indigo-500 bg-indigo-500/10'
                                : 'border-white/20 hover:border-white/40'
                        )}
                    >
                        <div className="flex flex-col items-center">
                            <Upload className="w-12 h-12 text-white/40 mb-4" />
                            <p className="text-white/60 mb-2">
                                Drag and drop your image here
                            </p>
                            <p className="text-sm text-white/40 mb-4">or</p>
                            <label className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-medium hover:opacity-90 transition-opacity cursor-pointer">
                                Browse Files
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />
                            </label>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                        <div className="relative aspect-video group">
                            <Image
                                src={uploadedImage}
                                alt="Uploaded reference"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />

                            {/* Add preview button */}
                            <button
                                onClick={() => setIsPreviewOpen(true)}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                            >
                                <Maximize2 className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-white/90">
                                    Reference Image
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleRemoveImage}
                                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors group"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                                    </button>
                                    <label className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                                        <Upload className="w-4 h-4 text-white/60 group-hover:text-white/90" />
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            <div className="flex items-center gap-2 text-xs text-white/40">
                                <ImageIcon className="w-3 h-3" />
                                <span>Click the upload icon to replace</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4 bg-white/[0.03] p-6 rounded-xl border border-white/[0.08]">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-white/60">
                                Prompt
                            </label>
                            <span className="text-xs text-white/40">
                                {prompt.length}/500 characters
                            </span>
                        </div>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            maxLength={500}
                            className="w-full h-24 bg-black/20 rounded-lg p-3 text-white border border-white/10 focus:border-white/30 outline-none resize-none"
                            placeholder="Describe what you want to generate..."
                        />
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={!uploadedImage || !prompt || isLoading}
                        className={cn(
                            'w-full py-3 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2',
                            !uploadedImage || !prompt || isLoading
                                ? 'bg-gray-500 cursor-not-allowed opacity-50'
                                : 'bg-gradient-to-r from-indigo-500 to-rose-500 hover:opacity-90'
                        )}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                <span>Generate Image</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Add the preview dialog */}
            <ImagePreviewDialog
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                imageUrl={uploadedImage}
            />
        </motion.div>
    )
}
