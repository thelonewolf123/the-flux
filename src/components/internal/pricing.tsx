'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

import { ElegantShape } from './hero'

interface PricingTier {
    name: string
    price: string
    description: string
    features: string[]
    highlight?: boolean
    env: string
}

const pricingTiers: PricingTier[] = [
    {
        name: 'Starter',
        price: '₹299',
        description: 'Perfect for indie creators and hobbyists',
        features: [
            '100 generations/month',
            'Basic resolution',
            'Community support',
            '24h response time'
        ],
        env: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_URL_299 || ''
    },
    {
        name: 'Pro',
        price: '₹599',
        description: 'For professional creators and small teams',
        features: [
            '500 generations/month',
            'HD resolution',
            'Priority support',
            '4h response time',
            'Custom styles'
        ],
        highlight: true,
        env: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_URL_499 || ''
    },
    {
        name: 'Enterprise',
        price: '₹999',
        description: 'For large teams and businesses',
        features: [
            'Unlimited generations',
            '4K resolution',
            'Dedicated support',
            '1h response time',
            'Custom styles',
            'API access'
        ],
        env: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_URL_999 || ''
    }
]

export default function Pricing() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center overflow-hidden bg-[#030303] py-20 relative">
            {/* Add the Lemon Squeezy script */}
            <script src="https://assets.lemonsqueezy.com/lemon.js" defer />

            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

            {/* Floating shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ElegantShape
                    delay={0.2}
                    width={400}
                    height={100}
                    rotate={15}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-5%] top-[20%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-12}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] bottom-[20%]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 z-10"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                    Simple, transparent pricing
                </h2>
                <p className="text-white/60 text-lg">
                    Choose the perfect plan for your creative needs
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 z-10">
                {pricingTiers.map((tier) => (
                    <motion.div
                        key={tier.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: tier.highlight
                                ? '0 0 40px rgba(236, 72, 153, 0.3)'
                                : '0 0 40px rgba(255, 255, 255, 0.1)'
                        }}
                        className={cn(
                            'rounded-2xl p-8',
                            'backdrop-blur-sm',
                            'border-2',
                            'transition-all duration-300 group',
                            tier.highlight
                                ? 'border-pink-500/50 bg-gradient-to-b from-pink-500/[0.15] to-transparent'
                                : 'border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-transparent'
                        )}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">
                                {tier.name}
                            </h3>
                            {tier.highlight && (
                                <Sparkles className="group-hover:rotate-45 duration-700 w-5 h-5 text-pink-500" />
                            )}
                        </div>
                        <div className="mb-6">
                            <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                                {tier.price}
                            </span>
                            <span className="text-white/60 ml-2">/month</span>
                        </div>
                        <p className="text-white/60 mb-6">{tier.description}</p>
                        <a
                            href={tier.env}
                            className={cn(
                                'w-full py-3 px-6 rounded-xl font-medium transition-all block text-center',
                                tier.highlight
                                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-500 hover:to-rose-500'
                                    : 'bg-white/[0.08] text-white hover:bg-white/[0.12]'
                            )}
                        >
                            Get Started
                        </a>
                        <div className="mt-8 space-y-4">
                            {tier.features.map((feature) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-3"
                                >
                                    <Check
                                        className={cn(
                                            'w-5 h-5',
                                            tier.highlight
                                                ? 'text-pink-500'
                                                : 'text-indigo-400'
                                        )}
                                    />
                                    <span className="text-white/80">
                                        {feature}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    )
}
