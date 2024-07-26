import { Button } from "./ui/button"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { X } from "lucide-react"

function Header() {
    const changeVisMenu = () => {
        // This useEffect will run after the component mounts
        const menu = document.getElementById('menu');
        const close = document.getElementById('close')
        const mobileMenu = document.getElementById('mobileMenu')
        if (menu) {
          // Set initial background color
          if (!menu.classList.contains('hidden')) {
            menu.classList.add('hidden')
            mobileMenu?.classList.add("right-[0%]");
            close?.classList.remove('hidden');
            // setVis('hidden')
          }
        }
        
      }
      
      const changeVisClose = () => {
        const menu = document.getElementById('menu');
        const close = document.getElementById('close')
        const mobileMenu = document.getElementById('mobileMenu')
    
        if (close) {
            if (!close.classList.contains('hidden')) {
                close.classList.add('hidden');
                mobileMenu?.classList.remove("right-[0%]");
                menu?.classList.remove('hidden')
                // setVis('')
            }
        }
      } 
  return (
    <div className="flex p-5 space-x-5 items-center flex-row justify-between">
        <div className="font-semibold text-xl md:text-3xl">
            Blog<span className="text-indigo-600">Verse</span>
        </div>
        
        <div id="mobileMenu" className="top-[12%] md:hidden  duration-500 right-[-100%] p-12 bg-white h-full w-3/4 fixed z-20">
            <div className="flex flex-col space-y-2">
                <Button asChild className="bg-white hover:text-white text-black border-2 rounded-lg border-black">
                    <Link href="/allBlogs">All Blogs</Link>
                </Button>
                <Button asChild className="bg-white hover:text-white text-black border-2 rounded-lg border-black">
                    <Link href="/dashboard">LogIn</Link>
                </Button>
            </div>
        </div>

        <div className="hidden items-center md:flex space-x-2">
            <Button className="bg-white hover:text-white text-black border-2 rounded-lg border-black">
                <Link href="/allBlogs">All Blogs</Link>
            </Button>
            <Button className="bg-white hover:text-white text-black border-2 rounded-lg border-black">
                <Link href="/dashboard">LogIn</Link>
            </Button>
            
        </div>

        <div className="flex flex-row items-center md:hidden space-x-2">
            <MenuIcon onClick={changeVisMenu} id="menu" className="text-indigo-600" />
            <X onClick={changeVisClose} id="close" className="hidden" />
        </div>
        
    </div>
  )
}

export default Header