'use client'

import { motion } from 'framer-motion'
import {
    ArrowRight,
    AtSign,
    Check,
    Loader2,
    Sparkles,
    SparklesIcon,
    Twitter
} from 'lucide-react'
import { Pacifico } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { ElegantShape } from '@/components/internal/hero'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const pacifico = Pacifico({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-pacifico'
})

export default function Waitlist() {
    const [mounted, setMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)

    // Use useEffect to handle client-side mounting
    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsLoading(false)
        setEmail('')
        setShowSuccessDialog(true)
    }

    // Don't render anything until mounted
    if (!mounted) {
        return null
    }

    return (
        <>
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#030303] relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
                    <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-[#030303] to-transparent" />
                    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#030303] to-transparent" />
                </div>

                {/* Floating shapes */}
                <div className="absolute inset-0">
                    <ElegantShape
                        delay={0.2}
                        width={500}
                        height={120}
                        rotate={15}
                        gradient="from-indigo-500/[0.15]"
                        className="left-[-10%] top-[20%]"
                    />
                    <ElegantShape
                        delay={0.4}
                        width={400}
                        height={100}
                        rotate={-12}
                        gradient="from-rose-500/[0.15]"
                        className="right-[-5%] bottom-[30%]"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
                    {/* Logo and Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <Link href="/" className="inline-block mb-8">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center gap-3"
                            >
                                <motion.div className="relative">
                                    <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-xl" />
                                    <SparklesIcon
                                        className="text-pink-500 h-12 w-12 relative z-10"
                                        style={{
                                            animation:
                                                'spin 20s linear infinite'
                                        }}
                                    />
                                </motion.div>
                                <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                    The Flux
                                </span>
                            </motion.div>
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <h1
                                className={cn(
                                    'text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300 pb-10',
                                    pacifico.className
                                )}
                            >
                                Coming Soon
                            </h1>
                            <p className="text-xl text-white/60 max-w-2xl mx-auto">
                                Be the first to experience the future of
                                AI-powered content creation
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Waitlist Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="max-w-md mx-auto"
                    >
                        <form onSubmit={handleSubmit} className="relative">
                            <div className="relative group">
                                <AtSign className="absolute left-4 top-4 h-6 w-6 text-white/40 group-hover:text-white/60 transition-colors" />
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="h-14 pl-12 pr-36 bg-white/5 border-white/10 text-white focus:bg-white/10 transition-all rounded-full text-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Button
                                    type="submit"
                                    className={cn(
                                        'absolute right-2 top-2 h-10',
                                        'bg-gradient-to-r from-indigo-500 to-rose-500',
                                        'hover:from-indigo-600 hover:to-rose-600',
                                        'rounded-full px-6 transition-all duration-300'
                                    )}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <motion.span
                                            className="flex items-center gap-2"
                                            whileHover={{ gap: '6px' }}
                                        >
                                            Join{' '}
                                            <ArrowRight className="h-4 w-4" />
                                        </motion.span>
                                    )}
                                </Button>
                            </div>
                        </form>

                        {/* Features Pills */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-wrap justify-center gap-3 mt-8"
                        >
                            {[
                                'Early Access',
                                'Special Pricing',
                                'Priority Support'
                            ].map((feature) => (
                                <div
                                    key={feature}
                                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 flex items-center gap-2"
                                >
                                    <Sparkles className="w-3 h-3" />
                                    {feature}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Success Dialog */}
            {mounted && (
                <Dialog
                    open={showSuccessDialog}
                    onOpenChange={setShowSuccessDialog}
                >
                    <DialogContent className="bg-black/90 border border-white/10 backdrop-blur-xl p-8 rounded-3xl max-w-lg">
                        <DialogTitle className="sr-only">
                            Waitlist Confirmation
                        </DialogTitle>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6"
                        >
                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 15
                                }}
                                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 flex items-center justify-center"
                            >
                                <Check className="w-8 h-8 text-white" />
                            </motion.div>

                            {/* Success Message */}
                            <div className="space-y-3">
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                    You&apos;re on the list!
                                </h2>
                                <p className="text-white/60">
                                    Thank you for joining our waitlist.
                                    We&apos;ll notify you as soon as we launch.
                                </p>
                            </div>

                            {/* Share Section */}
                            <div className="pt-4 space-y-4">
                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-sm text-white/40">
                                        Share with your friends
                                    </span>
                                    <Button
                                        onClick={() => {
                                            window.open(
                                                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                                    "Just joined the waitlist for @TheFlux - Can't wait to experience the future of AI-powered content creation! 🚀✨"
                                                )}`,
                                                '_blank'
                                            )
                                        }}
                                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full px-6 py-2 flex items-center gap-2"
                                    >
                                        <Twitter className="w-4 h-4" />
                                        Share on Twitter
                                    </Button>
                                </div>
                            </div>

                            {/* Features Pills */}
                            <div className="flex flex-wrap justify-center gap-2 pt-2">
                                {[
                                    'Early Access',
                                    'Special Pricing',
                                    'Priority Support'
                                ].map((feature) => (
                                    <div
                                        key={feature}
                                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 flex items-center gap-1.5"
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            {/* Close Button */}
                            <Button
                                onClick={() => setShowSuccessDialog(false)}
                                className={cn(
                                    'w-full h-11 bg-gradient-to-r from-indigo-500 to-rose-500',
                                    'hover:from-indigo-600 hover:to-rose-600 transition-all duration-300',
                                    'shadow-lg shadow-indigo-500/25 rounded-xl text-base font-medium mt-2'
                                )}
                            >
                                <motion.span
                                    className="flex items-center justify-center gap-2"
                                    whileHover={{ gap: '8px' }}
                                >
                                    Got it
                                    <ArrowRight className="w-4 h-4" />
                                </motion.span>
                            </Button>
                        </motion.div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
