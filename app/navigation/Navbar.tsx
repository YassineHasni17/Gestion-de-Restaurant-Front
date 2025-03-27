// "use client"
// import { usePathname, useRouter } from "next/navigation"
// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { FaUser } from "react-icons/fa";

// const Navbar = () => {
//   const pathname = usePathname()
//   const router = useRouter()
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [dropdownOpen, setDropdownOpen] = useState(false)

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token")
//       setIsLoggedIn(!!token)
//     }

//     checkAuth()
//     window.addEventListener("storage", checkAuth)

//     return () => {
//       window.removeEventListener("storage", checkAuth)
//     }
//   }, [pathname])

//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.push("/authen")
//     }
//   }, [isLoggedIn, router])

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     setIsLoggedIn(false)
//     setDropdownOpen(false)
//   }

//   const navItems = [
//     { href: "/", label: "Accueil" },
//     { href: "/restaurant", label: "Restaurant" },
//     { href: "/menu", label: "Menus" },
//     { href: "/reservation", label: "Réservation" },
//     { href: "/contact", label: "Contact" },
//   ]

//   return (
//     <>
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Oi&display=swap');
//           .oi-regular {
//             font-family: "Oi", serif;
//             font-weight: 400;
//             font-style: normal;
//           }
//         `}
//       </style>

//       <nav className="p-6 shadow-lg bg-[#F5F5DC] text-black">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] oi-regular">
//               دار تسنيم
//             </h1>
//           </div>

//           <div className="flex-grow flex justify-center">
//             <ul className="flex space-x-12">
//               {navItems.map(({ href, label }) => (
//                 <li key={href} className="relative">
//                   <Link
//                     href={href}
//                     className={`text-lg font-semibold ${pathname === href ? "underline text-[#7C4B3C]" : "hover:text-[#7C4B3C]"} transition-colors duration-300`}
//                   >
//                     <span className="hidden md:inline">{label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex items-center space-x-6">
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   href="/authen"
//                   className="text-lg font-semibold text-black hover:text-[#7C4B3C] transition duration-300"
//                 >
//                   <span className="hidden md:inline">Connexion</span>
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="text-lg font-semibold text-black hover:text-[#7C4B3C] transition duration-300"
//                 >
//                   <span className="hidden md:inline">S'inscrire</span>
//                 </Link>
//               </>
//             ) : (
//               <div className="relative">
//                 <button
//                   className="text-lg font-semibold text-black hover:text-[#7C4B3C] transition duration-300 flex items-center gap-2"
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                 >
//                   <FaUser size={20} />
//                 </button>
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 bg-[#F5F5DC] shadow-lg rounded-md">
//                     <button
//                       className="block px-4 py-2 text-black hover:bg-[#F5F5DC] transition duration-300"
//                       onClick={handleLogout}
//                     >
//                       Déconnexion
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default Navbar

// "use client"
// import { usePathname, useRouter } from "next/navigation"
// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { FaUser } from "react-icons/fa";

// const Navbar = () => {
//   const pathname = usePathname()
//   const router = useRouter()
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [dropdownOpen, setDropdownOpen] = useState(false)

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token")
//       setIsLoggedIn(!!token)
//     }

//     checkAuth()
//     window.addEventListener("storage", checkAuth)

//     return () => {
//       window.removeEventListener("storage", checkAuth)
//     }
//   }, [pathname])

//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.push("/authen")
//     }
//   }, [isLoggedIn, router])

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     setIsLoggedIn(false)
//     setDropdownOpen(false)
//   }

//   const navItems = [
//     { href: "/", label: "Accueil" },
//     { href: "/restaurant", label: "Restaurant" },
//     { href: "/menu", label: "Menus" },
//     { href: "/reservation", label: "Réservation" },
//     { href: "/contact", label: "Contact" },
//   ]

//   return (
//     <>
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Oi&display=swap');
//           .oi-regular {
//             font-family: "Oi", serif;
//             font-weight: 400;
//             font-style: normal;
//           }
//         `}
//       </style>

//       <nav className="p-6 shadow-lg bg-[#F5F5DC] text-black">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] oi-regular">
//               دار تسنيم
//             </h1>
//           </div>

//           <div className="flex-grow flex justify-center">
//             <ul className="flex space-x-12">
//               {navItems.map(({ href, label }) => (
//                 <li key={href} className="relative">
//                   <Link
//                     href={href}
//                     className={`text-lg font-semibold ${pathname === href ? "underline text-[#7C4B3C]" : "hover:text-[#7C4B3C]"} transition-colors duration-300`}
//                   >
//                     <span className="hidden md:inline">{label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex items-center space-x-6">
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   href="/authen"
//                   className="text-lg font-semibold text-black hover:text-[#7C4B3C] transition duration-300"
//                 >
//                   <span className="hidden md:inline">Connexion</span>
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="text-lg font-semibold text-black hover:text-[#7C4B3C] transition duration-300"
//                 >
//                   <span className="hidden md:inline">S'inscrire</span>
//                 </Link>
//               </>
//             ) : (
//               <div className="relative">
//                 <button
//                   className="text-lg font-semibold text-black hover:text-[#7C4B3C] transition duration-300 flex items-center gap-2 relative"
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                 >
//                   <FaUser size={24} className="cursor-pointer" />
//                 </button>
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 border border-gray-300 py-2 z-50">
//                     <button
//                       className="block w-full text-left px-4 py-2 text-black hover:bg-[#F5F5DC] transition duration-300 rounded-t-lg"
//                       onClick={handleLogout}
//                     >
//                       Déconnexion
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default Navbar


"use client"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { FaUser , FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
    }

    checkAuth()
    window.addEventListener("storage", checkAuth)

    return () => {
      window.removeEventListener("storage", checkAuth)
    }
  }, [pathname])

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/authen")
    }
  }, [isLoggedIn, router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setDropdownOpen(false)
  }

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/restaurant", label: "Restaurant" },
    { href: "/menu", label: "Menus" },
    { href: "/reservation", label: "Réservation" },
    { href: "/contact", label: "Contact" },
  ]

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

      <nav className="p-6 shadow-lg bg-[#F5F5DC] text-black">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] oi-regular">
              دار تسنيم
            </h1>
          </div>

          <div className="hidden md:flex flex-grow justify-center">
            <ul className="flex space-x-12">
              {navItems.map(({ href, label }) => (
                <li key={href} className="relative">
                  <Link
                    href={href}
                    className={`text-lg font-semibold ${pathname === href ? "underline text-[#7C4B3C]" : "hover:text-[#7C4B3C]"} transition-colors duration-300`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-6">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/authen"
                  className="text-lg font-semibold text-black hover:text-[#7C4B3C] transition duration-300"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="text-lg font-semibold text-black hover:text-[#7C4B3C] transition duration-300"
                >
                  S'inscrire
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  className="text-lg font-semibold text-black hover:text-[#7C4B3C] transition duration-300 flex items-center gap-2 relative"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaUser  size={24} className="cursor-pointer" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 border border-gray-300 py-2 z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-black hover:bg-[#F5F5DC] transition duration-300 rounded-t-lg"
                      onClick={handleLogout}
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col items-center mt-4">
            <ul className="flex flex-col space-y-2">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-lg font-semibold ${pathname === href ? "underline text-[#7C4B3C]" : "hover:text-[#7C4B3C]"} transition-colors duration-300`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center mt-4">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/authen"
                    className="text-lg font-semibold text-black hover:text-[#7C4B3C] transition duration-300"
                    onClick={() => setMenuOpen(false)} 
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/register"
                    className="text-lg font-semibold text-black hover:text-[#7C4B3C] transition duration-300"
                    onClick={() => setMenuOpen(false)} 
                  >
                    S'inscrire
                  </Link>
                </>
              ) : (
                <button
                  className="text-lg font-semibold text-black hover:text-[# 7C4B3C] transition duration-300"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false); 
                  }}
                >
                  Déconnexion
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar