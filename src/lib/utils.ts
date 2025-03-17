import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


  export const scrollToSection  = (id:string) => {
    if(!id) return
    const sectionTop = document.getElementById(id).offsetTop
    window.scroll({
      top: sectionTop,
      behavior: "smooth"
    })
  }
