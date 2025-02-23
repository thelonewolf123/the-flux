'use client'

import { motion } from 'framer-motion'
import { ArrowRight, KeyRound, Loader2, Mail, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { TbBrandOnlyfans } from 'react-icons/tb'

import { ElegantShape } from '@/components/internal/hero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#030303] relative overflow-hidden">
            {/* Background effects with enhanced gradients */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
                <div className="absolute top-0 -left-4 w-3/4 h-full bg-gradient-to-r from-indigo-500/10 to-transparent blur-2xl transform -skew-x-12" />
                <div className="absolute bottom-0 -right-4 w-3/4 h-full bg-gradient-to-l from-rose-500/10 to-transparent blur-2xl transform skew-x-12" />
            </div>

            {/* Floating shapes with improved positioning */}
            <div className="absolute inset-0">
                <ElegantShape
                    delay={0.2}
                    width={450}
                    height={120}
                    rotate={15}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-8%] top-[18%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={350}
                    height={100}
                    rotate={-12}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-6%] bottom-[22%]"
                />
                <ElegantShape
                    delay={0.6}
                    width={280}
                    height={80}
                    rotate={25}
                    gradient="from-pink-500/[0.15]"
                    className="left-[12%] bottom-[15%]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md px-4 py-8 md:py-12"
            >
                <div className="backdrop-blur-xl bg-black/30 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
                    {/* Header with improved spacing and animations */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-center mb-10"
                    >
                        <Link href="/" className="inline-block mb-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center gap-3"
                            >
                                <motion.div className="relative">
                                    <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-xl" />
                                    <SparklesIcon
                                        className="text-pink-500 h-10 w-10 relative z-10"
                                        style={{
                                            animation:
                                                'spin 20s linear infinite',
                                            transformOrigin: 'center'
                                        }}
                                    />
                                </motion.div>
                                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                    The Flux
                                </span>
                            </motion.div>
                        </Link>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-white/60 text-lg"
                        >
                            Welcome back to the future
                        </motion.p>
                    </motion.div>

                    {/* Form with improved input styling */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="space-y-5"
                        >
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-white/40 group-hover:text-white/60 transition-colors" />
                                <Input
                                    type="email"
                                    placeholder="Email address"
                                    className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:bg-white/10 transition-all rounded-xl"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            email: e.target.value
                                        }))
                                    }
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <KeyRound className="absolute left-4 top-3.5 h-5 w-5 text-white/40 group-hover:text-white/60 transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:bg-white/10 transition-all rounded-xl"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            password: e.target.value
                                        }))
                                    }
                                    required
                                />
                            </div>
                        </motion.div>

                        {/* Buttons with improved styling */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="space-y-5"
                        >
                            <Button
                                type="submit"
                                className={cn(
                                    'w-full h-12 bg-gradient-to-r from-indigo-500 to-rose-500',
                                    'hover:from-indigo-600 hover:to-rose-600 transition-all duration-300',
                                    'shadow-lg shadow-indigo-500/25 rounded-xl text-base font-medium'
                                )}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <motion.span
                                        className="flex items-center justify-center gap-2"
                                        whileHover={{ gap: '12px' }}
                                    >
                                        Sign In
                                        <ArrowRight className="h-5 w-5" />
                                    </motion.span>
                                )}
                            </Button>

                            <div className="relative flex items-center py-5">
                                <div className="flex-grow border-t border-white/10"></div>
                                <span className="flex-shrink-0 px-4 text-xs uppercase text-white/40 tracking-wider bg-black/30">
                                    Or continue with
                                </span>
                                <div className="flex-grow border-t border-white/10"></div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full py-6 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl flex items-center justify-center gap-3"
                            >
                                <TbBrandOnlyfans className="size-16" />
                                <span>Continue with OnlyFans</span>
                            </Button>
                        </motion.div>

                        {/* Footer links with improved spacing */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="space-y-3 text-center pt-2"
                        >
                            <Link
                                href="/auth/signup"
                                className="text-sm text-white/60 hover:text-white transition-colors block"
                            >
                                Don't have an account?{' '}
                                <span className="text-indigo-400 hover:text-indigo-300">
                                    Sign up
                                </span>
                            </Link>
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-white/60 hover:text-white transition-colors block"
                            >
                                Forgot your password?
                            </Link>
                        </motion.div>
                    </form>
                </div>
            </motion.div>

            {/* Enhanced bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    )
}
