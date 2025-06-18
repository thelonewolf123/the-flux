"use client"
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface LogoutBtnProps {
  className?: string
  onClick?: () => void
}

const LogoutBtn = ({ className, onClick }: LogoutBtnProps) => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // Execute any additional callback if provided
        if (onClick) {
          onClick()
        }
        
        // Redirect to home page after logout
        router.push('/')
        router.refresh() // Refresh to update authentication state across the app
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className={`flex items-center text-red-500 hover:text-red-400 ${className || ''}`}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </button>
  )
}

export default LogoutBtn