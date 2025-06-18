import {
    CircuitBoard,
    CreditCard,
    LogOut,
    Menu,
    Settings,
    User
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import LogoutBtn from '@/components/buttons/logout-btn'

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Features', href: '#feature' }
]

const Navbar = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 backdrop-blur-xl bg-black/30`}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Brand */}
                        <div className="flex-shrink-0 flex items-center space-x-4">
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
                            <span className="p-1 rounded-full bg-gradient-to-r from-pink-600/20 to-rose-600/20 text-pink-400 text-xs font-medium">
                                Pro
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm text-white/70 hover:text-white transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* User Menu & Mobile Menu */}
                        <div className="flex items-center space-x-4">
                            {/* User Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="relative h-9 w-9 ">
                                        <Image
                                            src="https://img.freepik.com/free-photo/sensual-brunette-model-fashion-red-suit-garden_149155-4573.jpg"
                                            alt="Avatar"
                                            fill
                                            className="rounded-full"
                                        />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56 bg-black/90 backdrop-blur-xl border-white/10"
                                    align="end"
                                    forceMount
                                >
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium text-white">
                                                John Doe
                                            </p>
                                            <p className="text-xs text-white/60">
                                                john@example.com
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuGroup>
                                        <Link href={'/dashboard'}>
                                            <DropdownMenuItem className="text-white hover:text-black">
                                                {' '}
                                                <CircuitBoard className="mr-2 h-4 w-4 " />
                                                <span>Dashboard</span>
                                            </DropdownMenuItem>
                                        </Link>

                                        <DropdownMenuItem className="text-white hover:text-black">
                                            <User className="mr-2 h-4 w-4 " />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-white hover:text-black">
                                            <CreditCard className="mr-2 h-4 w-4 " />
                                            <span>Billing</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-white hover:text-black">
                                            <Settings className="mr-2 h-4 w-4 " />
                                            <span className="">Settings</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem className="p-0 hover:bg-transparent focus:bg-transparent">
                                        <LogoutBtn className="w-full px-2 py-1.5" />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Mobile Menu */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="md:hidden"
                                        size="icon"
                                    >
                                        <Menu className="h-5 w-5 text-white/70" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="right"
                                    className="w-[300px] bg-black/90 backdrop-blur-xl border-white/10"
                                >
                                    <SheetHeader>
                                        <SheetTitle className="text-left text-white">
                                            Navigation
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col space-y-4 mt-4">
                                        {navigation.map((item) => (
                                            <SheetClose asChild key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className="text-white/70 hover:text-white transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="pt-16">{children}</main>
        </>
    )
}

export default Navbar
