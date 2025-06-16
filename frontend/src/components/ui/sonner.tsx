"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"
import { cn } from "@/lib/utils"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ position = "bottom-right", ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position={position}
      richColors
      expand={false}
      toastOptions={{
        classNames: {
          toast: cn(
            // Base styles with enhanced glass effect and darker background
            "group toast flex gap-3 !p-4 !px-5 !pr-10 !rounded-xl !border !shadow-xl",
            "backdrop-blur-xl data-[type=default]:!bg-zinc-950/90 dark:data-[type=default]:!bg-black/80",
            
            // Enhanced border with subtle glow
            "!border-zinc-800/70 !border-opacity-50",
            "!shadow-[0_0_15px_rgba(0,0,0,0.2),_inset_0_1px_0px_rgba(255,255,255,0.1)]",
            
            // Type-specific background and border colors (darker versions)
            "data-[type=success]:!bg-emerald-950/90 data-[type=success]:!border-emerald-800/50 data-[type=success]:!shadow-[0_0_15px_rgba(16,185,129,0.15),_inset_0_1px_0px_rgba(16,185,129,0.1)]",
            "data-[type=error]:!bg-rose-950/90 data-[type=error]:!border-rose-900/50 data-[type=error]:!shadow-[0_0_15px_rgba(225,29,72,0.15),_inset_0_1px_0px_rgba(225,29,72,0.1)]",
            "data-[type=warning]:!bg-amber-950/90 data-[type=warning]:!border-amber-900/50 data-[type=warning]:!shadow-[0_0_15px_rgba(217,119,6,0.15),_inset_0_1px_0px_rgba(217,119,6,0.1)]",
            "data-[type=loading]:!bg-indigo-950/90 data-[type=loading]:!border-indigo-900/50 data-[type=loading]:!shadow-[0_0_15px_rgba(79,70,229,0.15),_inset_0_1px_0px_rgba(79,70,229,0.1)]",
            
            // Text and additional styling
            "group-[.toaster]:!text-zinc-100",
            
            // Gradient overlay for depth
            "![transform-style:preserve-3d] !after:content-[''] !after:absolute !after:inset-0 !after:rounded-xl",
            "!after:bg-gradient-to-br !after:from-white/5 !after:via-transparent !after:to-black/20",
            "!after:-z-10",
            
            // Hover state effects
            "hover:!shadow-[0_0_18px_rgba(0,0,0,0.25),_inset_0_1px_0px_rgba(255,255,255,0.15)]",
            "hover:!border-zinc-700/70",
          ),
          
          title: cn(
            "group-[.toast]:!text-white group-[.toast]:!font-medium group-[.toast]:!mb-0.5 group-[.toast]:!text-base",
            "group-[.toast]:!leading-5 group-[.toast]:!drop-shadow-md"
          ),
          
          description: cn(
            "group-[.toast]:!text-zinc-300 group-[.toast]:!text-sm group-[.toast]:!leading-5",
            "group-[.toast]:!drop-shadow-sm",
            "data-[type=success]:group-[.toast]:!text-emerald-100/90",
            "data-[type=error]:group-[.toast]:!text-rose-100/90",
            "data-[type=warning]:group-[.toast]:!text-amber-100/90",
            "data-[type=loading]:group-[.toast]:!text-indigo-100/90",
          ),
          
          actionButton: cn(
            // More vibrant action buttons against dark backgrounds
            "group-[.toast]:!bg-white/10 group-[.toast]:!text-white",
            "group-[.toast]:!shadow-none group-[.toast]:!rounded-md group-[.toast]:!backdrop-blur-sm",
            "hover:group-[.toast]:!bg-white/20",
            "group-[.toast]:data-[type=success]:!bg-emerald-600 hover:group-[.toast]:data-[type=success]:!bg-emerald-500",
            "group-[.toast]:data-[type=error]:!bg-rose-600 hover:group-[.toast]:data-[type=error]:!bg-rose-500",
            "group-[.toast]:data-[type=warning]:!bg-amber-600 hover:group-[.toast]:data-[type=warning]:!bg-amber-500",
            "group-[.toast]:data-[type=loading]:!bg-indigo-600 hover:group-[.toast]:data-[type=loading]:!bg-indigo-500",
          ),
          
          cancelButton: cn(
            "group-[.toast]:!bg-zinc-800/80 group-[.toast]:!text-zinc-200",
            "hover:group-[.toast]:!bg-zinc-700 hover:group-[.toast]:!text-white",
            "group-[.toast]:!backdrop-blur-sm"
          ),
          
          closeButton: cn(
            "group-[.toast]:!absolute group-[.toast]:!top-3 group-[.toast]:!right-3",
            "group-[.toast]:!p-1 group-[.toast]:!rounded-full",
            "group-[.toast]:!bg-zinc-800/90 group-[.toast]:hover:!bg-zinc-700",
            "group-[.toast]:!backdrop-blur-sm group-[.toast]:!text-zinc-400 group-[.toast]:hover:!text-white",
            "focus:group-[.toast]:!ring-1 focus:group-[.toast]:!ring-zinc-600"
          ),
          
          loader: cn(
            "group-[.toast]:!border-zinc-700/30",
            "group-[.toast]:!border-t-zinc-200"
          ),
        },
      }}
      {...props}
    />
  )
}

// Helper functions to create different types of toasts with preset styling
export { Toaster }
export { toast } from "sonner"

// Custom toast wrapper with type-specific icons and styles
export const fluxToast = {
  // Standard toast with primary color styling
  primary: (title: string, description?: string, options = {}) =>
    toast(title, { 
      description, 
      classNames: {
        toast: "!bg-indigo-950/90 !border-indigo-800/50 !shadow-[0_0_15px_rgba(79,70,229,0.15),_inset_0_1px_0px_rgba(79,70,229,0.1)]",
        title: "!text-white !drop-shadow-md",
        description: "!text-indigo-200/90 !drop-shadow-sm",
        actionButton: "!bg-indigo-600 hover:!bg-indigo-500 !text-white",
        closeButton: "!bg-indigo-900/80 hover:!bg-indigo-800 !text-indigo-300 hover:!text-white"
      },
      ...options 
    }),

  // Default toast
  default: (title: string, description?: string, options = {}) => 
    toast(title, { description, ...options }),
  
  // Success toast
  success: (title: string, description?: string, options = {}) => 
    toast.success(title, { description, ...options }),
  
  // Error toast
  error: (title: string, description?: string, options = {}) => 
    toast.error(title, { description, ...options }),
  
  // Warning toast
  warning: (title: string, description?: string, options = {}) => 
    toast.warning(title, { description, ...options }),
  
  // Loading toast
  loading: (title: string, description?: string, options = {}) => 
    toast.loading(title, { description, ...options }),
  
  // Promise toast
  promise: (promise: Promise<any>, options: any) =>
    toast.promise(promise, options)
}
