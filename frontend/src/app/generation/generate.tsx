'use client'

import { motion } from 'framer-motion'
import {
    ArrowLeft,
    ArrowRight,
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

// Sample previous generations for history section

interface ImagePreviewDialogProps {
    isOpen: boolean
    onClose: () => void
    imageUrl: string | null
}

export const ImagePreviewDialog = ({
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
    const [currentStep, setCurrentStep] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

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
                // Move to the next step after uploading
                // nextStep()
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = () => {
        setUploadedImage(null)
        setCurrentStep(0)
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

    // Steps definition
    const steps = [
        {
            id: 'section1',
            title: 'Background',
            component: (
                <ImageSelectionStep
                    sectionId="section1"
                    selectedImage={selectedSections['section1']}
                    onImageSelect={(imageIndex) =>
                        handleImageSelect('section1', imageIndex)
                    }
                    description="Choose the perfect background for your scene"
                />
            )
        },
        {
            id: 'section2',
            title: 'Style',
            component: (
                <ImageSelectionStep
                    sectionId="section2"
                    selectedImage={selectedSections['section2']}
                    onImageSelect={(imageIndex) =>
                        handleImageSelect('section2', imageIndex)
                    }
                    description="Choose the artistic style for your image"
                />
            )
        },
        {
            id: 'section3',
            title: 'Lighting',
            component: (
                <ImageSelectionStep
                    sectionId="section3"
                    selectedImage={selectedSections['section3']}
                    onImageSelect={(imageIndex) =>
                        handleImageSelect('section3', imageIndex)
                    }
                    description="Set the mood with perfect lighting"
                />
            )
        }
    ]

    return (
        <div className=" bg-[#030303] text-white mb-20">
            {/* Background gradients */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-rose-500/10 blur-3xl" />
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#030303] to-transparent" />
            </div>

            <div className="">
                <div className="flex flex-col lg:flex-row gap-6 h-[90vh]">
                    {/* Left side - Split into two sections */}
                    <div className="lg:flex-1 flex flex-col space-y-4">
                        {/* Upload Section - Top Half */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.1] overflow-hidden h-[36vh]"
                        >
                            <div className="p-3 border-b border-white/[0.1] bg-white/[0.02]">
                                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                    Reference Image
                                </h2>
                            </div>

                            <div className="p-3 overflow-y-auto h-[calc(36vh-60px)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                <UploadSection
                                    uploadedImage={uploadedImage}
                                    isDragging={isDragging}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    handleFileSelect={handleFileSelect}
                                    handleRemoveImage={handleRemoveImage}
                                    setIsPreviewOpen={setIsPreviewOpen}
                                />
                            </div>
                        </motion.div>

                        {/* Image Selection Section - Bottom Half */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                'rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.1] overflow-hidden flex-1',
                                !uploadedImage &&
                                    'opacity-50 pointer-events-none'
                            )}
                        >
                            <div className="p-4 border-b border-white/[0.1] bg-white/[0.02]">
                                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                    Image Options
                                </h2>

                                {/* Step indicators */}
                                <div className="flex items-center justify-between mt-4">
                                    {steps.map((step, index) => (
                                        <React.Fragment key={step.id}>
                                            <div
                                                className={cn(
                                                    'relative flex flex-col items-center cursor-pointer',
                                                    index <= currentStep
                                                        ? 'text-white'
                                                        : 'text-white/40'
                                                )}
                                                onClick={() =>
                                                    uploadedImage &&
                                                    setCurrentStep(index)
                                                }
                                            >
                                                <div
                                                    className={cn(
                                                        'w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                                                        currentStep === index
                                                            ? 'bg-gradient-to-r from-indigo-500 to-rose-500 ring-4 ring-indigo-500/20'
                                                            : index <
                                                              currentStep
                                                            ? 'bg-indigo-600'
                                                            : 'bg-white/10'
                                                    )}
                                                >
                                                    {index < currentStep ? (
                                                        <Check className="w-3 h-3" />
                                                    ) : (
                                                        index + 1
                                                    )}
                                                </div>
                                                <span className="mt-1 text-xs font-medium">
                                                    {step.title}
                                                </span>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div
                                                    className={cn(
                                                        'flex-1 h-[2px] mx-2',
                                                        index < currentStep
                                                            ? 'bg-indigo-500'
                                                            : 'bg-white/10'
                                                    )}
                                                />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* Main content area */}
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className={cn(
                                    'p-4 overflow-y-auto h-[calc(44vh-110px)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20',
                                    !uploadedImage && 'blur-sm'
                                )}
                            >
                                {steps[currentStep].component}
                            </motion.div>
                            <div className="">
                                <div className=" border-white/[0.1] border-t flex justify-between items-center px-4 py-2  gap-3">
                                    <button
                                        onClick={() =>
                                            currentStep > 0 &&
                                            setCurrentStep(currentStep - 1)
                                        }
                                        disabled={currentStep === 0}
                                        className={cn(
                                            'p-2 rounded-xl transition-all shadow-sm',
                                            currentStep === 0
                                                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-indigo-600/80 to-indigo-500/80 hover:from-indigo-600 hover:to-indigo-500 text-white hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] transform hover:scale-105'
                                        )}
                                    >
                                        <div className="flex gap-2 justify-center items-center px-3">
                                            <ArrowLeft className="w-4 h-4" />
                                            <span className="font-medium">
                                                Previous
                                            </span>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() =>
                                            currentStep < steps.length - 1 &&
                                            setCurrentStep(currentStep + 1)
                                        }
                                        disabled={
                                            currentStep === steps.length - 1
                                        }
                                        className={cn(
                                            'p-2 rounded-xl transition-all shadow-sm',
                                            currentStep === steps.length - 1
                                                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-rose-500/80 to-indigo-500/80 hover:from-rose-500 hover:to-indigo-500 text-white hover:shadow-[0_0_15px_rgba(224,64,251,0.4)] transform hover:scale-105'
                                        )}
                                    >
                                        <div className="flex gap-2 justify-center items-center px-3">
                                            <span className="font-medium">
                                                Next
                                            </span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right side - Prompt and History */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-1/3 flex flex-col"
                    >
                        {/* Preview Section */}
                        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.1] rounded-2xl mb-6 overflow-hidden">
                            <div className="p-4 border-b border-white/[0.1]">
                                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                    Preview
                                </h2>
                            </div>
                            <div className="p-6 flex items-center justify-center">
                                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black/30 border border-white/10">
                                    {isLoading ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <div className="w-12 h-12 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin mb-3"></div>
                                            <p className="text-white/60 text-sm">
                                                Generating your image...
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <ImageIcon className="w-16 h-16 text-white/10 mb-3" />
                                            <p className="text-white/40 text-sm text-center px-6">
                                                Your generated image will appear
                                                here
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Prompt Section */}
                        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-6 mb-6">
                            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                Your Vision
                            </h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm text-white/60">
                                            Describe what you want to generate
                                        </label>
                                        <span className="text-xs text-white/40">
                                            {prompt.length}/500 characters
                                        </span>
                                    </div>
                                    <textarea
                                        value={prompt}
                                        onChange={(e) =>
                                            setPrompt(e.target.value)
                                        }
                                        maxLength={500}
                                        className="w-full h-24 bg-black/20 rounded-lg p-3 text-white border border-white/10 focus:border-white/30 outline-none resize-none"
                                        placeholder="A futuristic cityscape with neon lights and flying cars..."
                                    />
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={
                                        !uploadedImage || !prompt || isLoading
                                    }
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

                        {/* History Section */}
                    </motion.div>
                </div>
            </div>

            {/* Preview dialogs */}
            <ImagePreviewDialog
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                imageUrl={uploadedImage}
            />
        </div>
    )
}

interface UploadSectionProps {
    uploadedImage: string | null
    isDragging: boolean
    onDragOver: (e: React.DragEvent) => void
    onDragLeave: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent) => void
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleRemoveImage: () => void
    setIsPreviewOpen: (open: boolean) => void
}

const UploadSection = ({
    uploadedImage,
    isDragging,
    onDragOver,
    onDragLeave,
    onDrop,
    handleFileSelect,
    handleRemoveImage,
    setIsPreviewOpen
}: UploadSectionProps) => {
    return (
        <div className="h-full flex items-center justify-center">
            {!uploadedImage ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full"
                >
                    <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        className={cn(
                            'border-2 border-dashed rounded-xl text-center transition-all duration-300 h-full flex flex-col items-center justify-center py-4',
                            isDragging
                                ? 'border-indigo-500 bg-indigo-500/10'
                                : 'border-white/20 hover:border-white/40'
                        )}
                    >
                        <Upload className="w-8 h-8 text-white/40 mb-2" />
                        <h3 className="text-lg font-semibold text-white/90 mb-1">
                            Upload Reference Image
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                            <p className="text-sm text-white/60">
                                Drag & drop or
                            </p>
                            <label className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
                                Browse
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />
                            </label>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full"
                >
                    <div className="rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm h-full flex flex-col">
                        <div className="relative flex-1 group">
                            <Image
                                src={uploadedImage}
                                alt="Uploaded reference"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

                            {/* Controls overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 flex items-center justify-center gap-3">
                                <button
                                    onClick={() => setIsPreviewOpen(true)}
                                    className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                                >
                                    <Maximize2 className="w-5 h-5 text-white" />
                                </button>
                                <button
                                    onClick={handleRemoveImage}
                                    className="p-2 rounded-full bg-red-500/30 hover:bg-red-500/50 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5 text-white" />
                                </button>
                                <label className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                                    <Upload className="w-5 h-5 text-white/70" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                    />
                                </label>
                            </div>

                            {/* Bottom compact info bar */}
                            <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between bg-gradient-to-t from-black/80 to-black/0">
                                <div className="flex items-center gap-2">
                                    <div className="bg-indigo-500/80 p-1 rounded-full">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-xs text-white/80">
                                        Reference image ready
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

interface ImageSelectionStepProps {
    sectionId: string
    selectedImage: number | null
    onImageSelect: (imageIndex: number) => void
    description: string
}

const ImageSelectionStep = ({
    selectedImage,
    onImageSelect,
    description
}: ImageSelectionStepProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
        >
            <div className="text-center max-w-xl mx-auto mb-4">
                <p className="text-sm text-white/80">{description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                                    <Check className="w-3 h-3" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="p-2 h-full">
                                <div className="relative h-full w-full bg-black/40 rounded-lg overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                                    <ImagePlus className="absolute inset-0 m-auto w-6 h-6 text-white/40 group-hover:text-white/60 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
