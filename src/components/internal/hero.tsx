'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Pacifico } from 'next/font/google'
import Image from 'next/image'

import { cn } from '@/lib/utils'

const images = [
    'https://img.freepik.com/free-photo/model-looking-into-windo_1301-2992.jpg?semt=ais_hybrid',
    'https://img.freepik.com/free-photo/sensual-brunette-model-fashion-red-suit-garden_149155-4573.jpg?semt=ais_hybrid',
    'https://img.freepik.com/free-photo/sensual-brunette-model-fashion-swimsuit-posing-terrace_149155-4497.jpg?semt=ais_hybrid',
    'https://img.freepik.com/premium-photo/portrait-beautiful-woman-outdoors_173770-191.jpg?ga=GA1.1.18769489.1740249920&semt=ais_hybrid',
    'https://img.freepik.com/premium-photo/portrait-young-woman-swimming-sea_1048944-385676.jpg?ga=GA1.1.18769489.1740249920&semt=ais_hybrid'
]
const pacifico = Pacifico({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-pacifico'
})

export const ImageShowcase = ({
    imageSrc,
    className,
    delay = 0,
    gradient,
    rotate
}: {
    imageSrc: string
    className?: string
    delay?: number
    gradient?: string
    rotate: number
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate
            }}
            transition={{
                duration: 1.2,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96]
            }}
            className={cn(
                'relative cursor-pointer rounded-3xl',
                'bg-white/[0.03] backdrop-blur-[2px]',
                'border border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
                className,
                gradient
            )}
        >
            <div className="relative h-40 w-40 lg:h-60 lg:w-60 overflow-hidden p-1 rounded-3xl hover:scale-110 duration-300">
                {/* Glassmorphic effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/[0.08] to-transparent backdrop-blur-[2px]" />

                {/* Hover glow effect */}
                <motion.div
                    className="absolute inset-0 opacity-0  transition-opacity"
                    animate={{
                        boxShadow: [
                            '0 0 20px rgba(255,255,255,0.1)',
                            '0 0 30px rgba(255,255,255,0.2)',
                            '0 0 20px rgba(255,255,255,0.1)'
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />

                {/* Image */}
                <Image
                    src={imageSrc}
                    alt="Showcase image"
                    fill
                    className="object-cover rounded-2xl transform transition-transform duration-700 [mask-image:linear-gradient(to_bottom,white,rgb(255_255_255_/_0.8))] hover:[mask-image:none]"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl" />
            </div>
        </motion.div>
    )
}
export const ElegantShape = ({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = 'from-white/[0.08]'
}: {
    className?: string
    delay?: number
    width?: number
    height?: number
    rotate?: number
    gradient?: string
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 }
            }}
            className={cn('absolute', className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0]
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut'
                }}
                style={{
                    width,
                    height
                }}
                className="relative"
            >
                <div
                    className={cn(
                        'absolute inset-0 rounded-full',
                        'bg-gradient-to-r to-transparent',
                        gradient,
                        'backdrop-blur-[2px] border-2 border-white/[0.15]',
                        'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
                        'after:absolute after:inset-0 after:rounded-full',
                        'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
                    )}
                />
            </motion.div>
        </motion.div>
    )
}

export default function HeroGeometric({
    badge = 'NSFW+',
    title1 = 'Create',
    title2 = 'Your Imagination'
}: {
    badge?: string
    title1?: string
    title2?: string
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1]
            }
        })
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#030303]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ImageShowcase
                    imageSrc={images[0]}
                    delay={0.3}
                    rotate={12}
                    gradient="from-indigo-500/20"
                    className="absolute left-[-5%] top-[15%] md:top-[20%] scale-75 md:scale-100"
                />

                <ImageShowcase
                    imageSrc={images[1]}
                    delay={0.5}
                    rotate={-15}
                    gradient="from-rose-500/20"
                    className="absolute right-[-5%] top-[60%] md:top-[65%] scale-75 md:scale-100"
                />

                <ImageShowcase
                    imageSrc={images[2]}
                    delay={0.4}
                    rotate={-8}
                    gradient="from-violet-500/20"
                    className="absolute left-[5%] bottom-[5%] scale-65 md:scale-90"
                />

                <ImageShowcase
                    imageSrc={images[3]}
                    delay={0.6}
                    rotate={20}
                    gradient="from-amber-500/20"
                    className="absolute right-[15%] top-[5%] scale-50 md:scale-75"
                />

                <ImageShowcase
                    imageSrc={images[4]}
                    delay={0.7}
                    rotate={-25}
                    gradient="from-cyan-500/20"
                    className="absolute left-[20%] top-[5%] scale-50 md:scale-75"
                />
            </div>

            <div className=" z-10 container mx-auto px-4 md:px-6 mb-40">
                <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-1 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4 md:mb-8 px-4"
                    >
                        <Image
                            src={'nsfw.svg'}
                            alt="logo"
                            width={15}
                            height={15}
                        />
                        <span className="text-xs font-semibold font-mono mt-[3px] text-pink-600 tracking-wide">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                {title1}
                            </span>
                            <br />
                            <span
                                className={cn(
                                    'bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 p-5  [text-shadow:_0_0_30px_rgb(255_255_255_/_40%)]',
                                    pacifico.className
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center border-[1px] border-white w-3/4 p-3  text-white border-gradient-to-r from-indigo-300 via-white/90 to-rose-300 rounded-full justify-between mt-10 pl-6"
                    >
                        <motion.div
                            animate={{
                                scale: [0.9, 1.2, 0.9],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                        >
                            <Sparkles className="w-6 h-6 text-pink-500" />
                        </motion.div>
                        <input
                            placeholder="Describe the image you want to create"
                            className="bg-transparent outline-none w-full px-4"
                        />

                        <button className="bg-pink-600 px-4 py-2 rounded-2xl">
                            Generate
                        </button>
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    )
}
