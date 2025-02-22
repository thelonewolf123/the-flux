'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Brain, Code2, ImageIcon, Sparkles, Wand2, Zap } from 'lucide-react'
import { useRef } from 'react'

import { cn } from '@/lib/utils'

import { ElegantShape } from './hero'

const featureSections = [
    {
        title: 'AI Creation Suite',
        subtitle: 'Generate with confidence',
        features: [
            {
                icon: <Wand2 className="w-8 h-8" />,
                title: 'AI Generation',
                description:
                    'Create stunning visuals with state-of-the-art AI models',
                gradient: 'from-violet-500 to-indigo-500',
                tag: 'Popular'
            },
            {
                icon: <Brain className="w-8 h-8" />,
                title: 'Smart Processing',
                description:
                    'Advanced processing that understands artistic context',
                gradient: 'from-pink-500 to-rose-500'
            }
        ]
    },
    {
        title: 'Professional Tools',
        subtitle: 'Elevate your workflow',
        features: [
            {
                icon: <ImageIcon className="w-8 h-8" />,
                title: '4K Resolution',
                description: 'Crystal clear outputs with incredible detail',
                gradient: 'from-amber-500 to-orange-500',
                tag: 'New'
            },
            {
                icon: <Code2 className="w-8 h-8" />,
                title: 'API Access',
                description: 'Full API integration for seamless workflow',
                gradient: 'from-emerald-500 to-green-500'
            }
        ]
    },
    {
        title: 'Advanced Features',
        subtitle: 'Push the boundaries',
        features: [
            {
                icon: <Zap className="w-8 h-8" />,
                title: 'Fast Generation',
                description: 'Generate images in seconds, not minutes',
                gradient: 'from-blue-500 to-cyan-500'
            },
            {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'Style Control',
                description: 'Fine-tune and control artistic styles',
                gradient: 'from-purple-500 to-fuchsia-500',
                tag: 'Premium'
            }
        ]
    }
]

export default function Features() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <div
            ref={containerRef}
            className="relative bg-[#030303] py-32 overflow-hidden"
        >
            {/* Background gradients */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-rose-500/10 blur-3xl" />
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#030303] to-transparent" />
            </div>

            {/* Floating shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.2}
                    width={400}
                    height={100}
                    rotate={15}
                    gradient="from-indigo-500/20"
                    className="left-[-10%] top-[20%]"
                />
                <ElegantShape
                    delay={0.3}
                    width={300}
                    height={80}
                    rotate={-12}
                    gradient="from-rose-500/20"
                    className="right-[-5%] top-[60%]"
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-2xl mx-auto text-center mb-20"
                >
                    <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-rose-500/10 border border-white/10 mb-10">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-white/80">
                            Next-Gen Features
                        </span>
                    </motion.div>
                    <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                        Powerful Creation Tools
                    </h2>
                    <p className="text-lg text-white/60">
                        Experience the future of AI image generation with our
                        cutting-edge features
                    </p>
                </motion.div>

                <div className="max-w-7xl mx-auto space-y-40">
                    {featureSections.map((section, sectionIndex) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className={cn(
                                'flex flex-col md:flex-row gap-16 items-center',
                                sectionIndex % 2 === 1 && 'md:flex-row-reverse'
                            )}
                        >
                            {/* Content Side */}
                            <div className="flex-1 space-y-6">
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: sectionIndex % 2 === 0 ? -50 : 50
                                    }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <h3 className="text-sm uppercase tracking-wider text-white/60 mb-2">
                                        {section.subtitle}
                                    </h3>
                                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                                        {section.title}
                                    </h2>
                                </motion.div>
                            </div>

                            {/* Features Side */}
                            <div className="flex-1 space-y-6">
                                {section.features.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.2
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        className="relative group rounded-2xl p-6 bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08]"
                                    >
                                        <div className="flex items-start gap-6">
                                            <div
                                                className={cn(
                                                    'w-14 h-14 rounded-xl flex items-center justify-center shrink-0',
                                                    'bg-gradient-to-br',
                                                    feature.gradient
                                                )}
                                            >
                                                {feature.icon}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-semibold text-white">
                                                        {feature.title}
                                                    </h3>
                                                    {feature.tag && (
                                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-indigo-500/80 to-rose-500/80 text-white">
                                                            {feature.tag}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-white/60">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
