import Link from "next/link"
import { Bell, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
<>
    <style>
    {`
        @import url('https://fonts.googleapis.com/css2?family=Oi&display=swap');

        .oi-regular {
            font-family: "Oi", serif;
            font-weight: 400;
            font-style: normal;
        }
    `}
</style>
    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">🍽️</span>
          <span className="hidden md:inline-block bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] bg-clip-text text-transparent font-['oi-regular']">
            Restaurant Marocain - دار تسنيم
          </span>
        </Link>
      </div>
    
    </header>
    </>
  )
}

