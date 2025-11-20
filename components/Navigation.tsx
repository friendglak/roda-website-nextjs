'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'

import Link from 'next/link'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  onOpenModal: () => void
}

export function Navigation({ isMenuOpen, setIsMenuOpen, onOpenModal }: NavigationProps) {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    const menuOverlay = document.getElementById('menu-overlay')
    const menuLinks = document.querySelectorAll('.menu-link')

    if (menuOverlay) {
      if (!isMenuOpen) {
        menuOverlay.classList.remove('hidden', 'translate-y-full')
        gsap.to(menuLinks, {
          yPercent: -100,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.2,
        })
      } else {
        menuOverlay.classList.add('translate-y-full')
        gsap.to(menuLinks, {
          yPercent: 0,
          duration: 0.5,
        })
        setTimeout(() => {
          menuOverlay.classList.add('hidden')
        }, 700)
      }
    }
  }

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
        <nav className="pointer-events-auto glass-panel backdrop-blur-md rounded-full px-6 py-3 md:px-8 md:py-4 flex justify-between items-center w-full max-w-5xl transition-all duration-500">
          <Link href="/" className="font-mono font-black text-xl md:text-2xl tracking-tighter uppercase text-white hover:text-roda-green transition-colors relative z-50 cursor-pointer">
            RODA
          </Link>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleMenu}
              className="font-mono cursor-pointer text-xs md:text-sm uppercase hover:text-roda-green transition-colors relative z-50 group"
            >
              <span className="group-hover:hidden">Menu</span>
              <span className="hidden group-hover:inline text-roda-green">Open</span>
            </button>
            <button
              onClick={onOpenModal}
              className="hidden md:block cursor-pointer bg-roda-green text-dark-bg px-6 py-2 rounded-full font-mono text-xs uppercase font-bold hover:bg-[#b8e000] transition-all relative z-50 btn-glow"
            >
              Portal
            </button>
          </div>
        </nav>
      </div>

      {/* Full Screen Menu Overlay */}
      <div
        id="menu-overlay"
        className="fixed inset-0 bg-dark-bg/90 backdrop-blur-xl text-light-text z-40 transform translate-y-full transition-transform duration-700 ease-in-out flex flex-col justify-center items-center hidden"
      >
        <ul className="space-y-4 text-center">
          <li className="overflow-hidden">
            <Link
              href="/catalog"
              onClick={toggleMenu}
              className="menu-link block text-5xl md:text-8xl font-black uppercase tracking-tighter hover:text-roda-green transition-colors transform translate-y-full"
            >
              Catálogo
            </Link>
          </li>
          <li className="overflow-hidden">
            <a
              href="/#secciones"
              onClick={toggleMenu}
              className="menu-link block text-5xl md:text-8xl font-black uppercase tracking-tighter hover:text-roda-green transition-colors transform translate-y-full"
            >
              Secciones
            </a>
          </li>
          <li className="overflow-hidden">
            <a
              href="#beneficios"
              onClick={toggleMenu}
              className="menu-link block text-5xl md:text-8xl font-black uppercase tracking-tighter hover:text-roda-green transition-colors transform translate-y-full"
            >
              Beneficios
            </a>
          </li>
          <li className="overflow-hidden">
            <a
              href="#testimonios"
              onClick={toggleMenu}
              className="menu-link block text-5xl md:text-8xl font-black uppercase tracking-tighter hover:text-roda-green transition-colors transform translate-y-full"
            >
              Testimonios
            </a>
          </li>
          <li className="overflow-hidden">
            <a
              href="#faq"
              onClick={toggleMenu}
              className="menu-link block text-5xl md:text-8xl font-black uppercase tracking-tighter hover:text-roda-green transition-colors transform translate-y-full"
            >
              FAQ
            </a>
          </li>
        </ul>
        <div className="mt-12 font-mono text-sm text-gray-text flex gap-8">
          <a href="#" className="hover:text-roda-green">INSTAGRAM</a>
          <a href="#" className="hover:text-roda-green">FACEBOOK</a>
          <a href="#" className="hover:text-roda-green">LINKEDIN</a>
        </div>
      </div>
    </>
  )
}

