import React from 'react'
import { Button } from '../ui/button'
import { TbBrandOnlyfans } from 'react-icons/tb'

const SSOBtn = () => {
  return (

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-14 bg-white/5 border border-white/10 text-white 
                                         hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-rose-500/20 
                                         hover:border-white/20 hover:shadow-lg hover:shadow-indigo-500/10
                                         transition-all duration-500 ease-out rounded-xl 
                                         flex items-center justify-center gap-3 group backdrop-blur-sm"
                            >
                                    <TbBrandOnlyfans className="size-5 group-hover:scale-110 transition-transform duration-300 text-white" />
                                <span className="font-medium bg-gradient-to-r from-indigo-500 to-rose-500 bg-clip-text text-transparent">
                                    Continue with OnlyFans
                                </span>
                            </Button>  )
}

export default SSOBtn