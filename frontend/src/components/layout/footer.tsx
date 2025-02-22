import { Github, Instagram, Mail, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const navigation = {
    product: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Dashboard', href: '/dashboard' }
    ],
    support: [
        { name: 'Documentation', href: '#' },
        { name: 'API Status', href: '#' },
        { name: 'Contact', href: '#' }
    ],
    company: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Terms', href: '#' }
    ],
    social: [
        {
            name: 'Twitter',
            href: '#',
            icon: Twitter
        },
        {
            name: 'GitHub',
            href: '#',
            icon: Github
        },
        {
            name: 'Instagram',
            href: '#',
            icon: Instagram
        }
    ]
}

const Footer = () => {
    return (
        <footer className="relative mt-auto">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />

            {/* Content */}
            <div className="relative border-t border-white/10 bg-black/30 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        {/* Brand Section */}
                        <div className="space-y-8">
                            <Link
                                href="/"
                                className="flex items-center space-x-2"
                            >
                                <Image
                                    src="/nsfw.svg"
                                    alt="Logo"
                                    width={28}
                                    height={28}
                                    className="w-7 h-7"
                                />
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                    The Flux
                                </span>
                            </Link>
                            <p className="text-sm leading-6 text-white/60">
                                Create stunning images with the power of AI.
                                Transform your imagination into reality.
                            </p>
                            <div className="flex space-x-6">
                                {navigation.social.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-white/60 hover:text-white transition-colors"
                                    >
                                        <span className="sr-only">
                                            {item.name}
                                        </span>
                                        <item.icon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold leading-6 text-white">
                                        Product
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {navigation.product.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className="text-sm leading-6 text-white/60 hover:text-white transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0">
                                    <h3 className="text-sm font-semibold leading-6 text-white">
                                        Support
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {navigation.support.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className="text-sm leading-6 text-white/60 hover:text-white transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold leading-6 text-white">
                                        Company
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {navigation.company.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className="text-sm leading-6 text-white/60 hover:text-white transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0">
                                    <h3 className="text-sm font-semibold leading-6 text-white">
                                        Contact
                                    </h3>
                                    <div className="mt-6 space-y-4">
                                        <Link
                                            href="mailto:contact@example.com"
                                            className="flex items-center text-sm text-white/60 hover:text-white transition-colors"
                                        >
                                            <Mail className="mr-2 h-4 w-4" />
                                            contact@example.com
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                        <p className="text-xs leading-5 text-white/60">
                            &copy; {new Date().getFullYear()} The Flux. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
