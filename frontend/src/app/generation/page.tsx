'use client'

import { motion } from 'framer-motion'
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Clock,
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
    const [currentStep, setCurrentStep] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [historyPreview, setHistoryPreview] = useState<string | null>(null)

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

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
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
                nextStep()
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
        <div className="min-h-screen bg-[#030303] text-white">
            {/* Background gradients */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-rose-500/10 blur-3xl" />
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#030303] to-transparent" />
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 h-[90vh]">
                    {/* Left side - Split into two sections */}
                    <div className="lg:flex-1 flex flex-col space-y-6">
                        {/* Upload Section - Top Half */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.1] overflow-hidden h-[42vh]"
                        >
                            <div className="p-6 border-b border-white/[0.1] bg-white/[0.02]">
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                    Reference Image
                                </h2>
                            </div>

                            <div className="p-4 overflow-y-auto h-[calc(42vh-80px)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
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
                            <div className="p-6 border-b border-white/[0.1] bg-white/[0.02]">
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                    Image Options
                                </h2>

                                {/* Step indicators */}
                                <div className="flex items-center justify-between mt-6">
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
                                                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                                                        currentStep === index
                                                            ? 'bg-gradient-to-r from-indigo-500 to-rose-500 ring-4 ring-indigo-500/20'
                                                            : index <
                                                              currentStep
                                                            ? 'bg-indigo-600'
                                                            : 'bg-white/10'
                                                    )}
                                                >
                                                    {index < currentStep ? (
                                                        <Check className="w-4 h-4" />
                                                    ) : (
                                                        index + 1
                                                    )}
                                                </div>
                                                <span className="mt-2 text-xs font-medium">
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
                            <div className="border-b border-white/[0.1] bg-white/[0.02] flex justify-between items-center p-4">
                                <h3 className="text-lg font-medium text-white/90">
                                    {steps[currentStep].title}
                                </h3>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            currentStep > 0 &&
                                            setCurrentStep(currentStep - 1)
                                        }
                                        disabled={currentStep === 0}
                                        className={cn(
                                            'p-2 rounded-xl border transition-colors',
                                            currentStep === 0
                                                ? 'border-white/5 bg-white/5 text-white/20 cursor-not-allowed'
                                                : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                                        )}
                                    >
                                        <ArrowLeft className="w-4 h-4" />
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
                                            'p-2 rounded-xl border transition-colors',
                                            currentStep === steps.length - 1
                                                ? 'border-white/5 bg-white/5 text-white/20 cursor-not-allowed'
                                                : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                                        )}
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className={cn(
                                    'p-6 overflow-y-auto h-[calc(42vh-130px)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20',
                                    !uploadedImage && 'blur-sm'
                                )}
                            >
                                {steps[currentStep].component}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right side - Prompt and History */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-1/3 flex flex-col"
                    >
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
                                                                setHistoryPreview(
                                                                    item.imageUrl
                                                                )
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
                                            Your generated images will appear
                                            here
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Preview dialogs */}
            <ImagePreviewDialog
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                imageUrl={uploadedImage}
            />

            <ImagePreviewDialog
                isOpen={!!historyPreview}
                onClose={() => setHistoryPreview(null)}
                imageUrl={historyPreview}
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
        <div className="flex items-center justify-center h-full">
            {!uploadedImage ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full"
                >
                    <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        className={cn(
                            'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 h-full flex flex-col justify-center',
                            isDragging
                                ? 'border-indigo-500 bg-indigo-500/10'
                                : 'border-white/20 hover:border-white/40'
                        )}
                    >
                        <div className="flex flex-col items-center">
                            <Upload className="w-12 h-12 text-white/40 mb-4" />
                            <h3 className="text-xl font-semibold text-white/90 mb-2">
                                Upload a Reference Image
                            </h3>
                            <p className="text-white/60 mb-3">
                                Start by uploading an image you'd like to
                                transform
                            </p>
                            <p className="text-sm text-white/40 mb-3">or</p>
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
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full"
                >
                    <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                        <div className="relative aspect-video group">
                            <Image
                                src={uploadedImage}
                                alt="Uploaded reference"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />

                            <button
                                onClick={() => setIsPreviewOpen(true)}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                            >
                                <Maximize2 className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-white/90">
                                    Your Reference Image
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
                                <span>
                                    Now select options below to customize your
                                    generation
                                </span>
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
    sectionId,
    selectedImage,
    onImageSelect,
    description
}: ImageSelectionStepProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="text-center max-w-xl mx-auto mb-8">
                <p className="text-lg text-white/80">{description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                                    ? 'border-indigo-500 ring-4 ring-indigo-500/50'
                                    : 'border-white/[0.08] hover:border-white/[0.2]'
                            )}
                        >
                            {selectedImage === index && (
                                <div className="absolute top-3 right-3 z-10 bg-indigo-500 rounded-full p-1.5">
                                    <Check className="w-4 h-4" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="p-3 h-full">
                                <div className="relative h-full w-full bg-black/40 rounded-lg overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                                    <ImagePlus className="absolute inset-0 m-auto w-8 h-8 text-white/40 group-hover:text-white/60 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
