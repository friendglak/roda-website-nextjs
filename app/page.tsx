'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hero } from '../components/Hero'
import { Navigation } from '../components/Navigation'
import { Loader } from '../components/Loader'
import { PartnersMarquee } from '../components/PartnersMarquee'
import { HowItWorks } from '../components/HowItWorks'
import { Benefits } from '../components/Benefits'
import { Stats } from '../components/Stats'
import { Testimonials } from '../components/Testimonials'
import { FAQ } from '../components/FAQ'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import { CreditModal } from '../components/CreditModal'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const [loaderHidden, setLoaderHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Loader Animation
    const tl = gsap.timeline()

    tl.to('.loader', {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
      delay: 0.5,
      onComplete: () => setLoaderHidden(true)
    })
      .from('.hero-line', {
        yPercent: 100,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      }, '-=0.5')
      .from('.hero-sub', {
        opacity: 0,
        y: 20,
        duration: 1,
      }, '-=0.5')

    // Scroll Animations
    gsap.utils.toArray('.fade-in-up').forEach((element: any) => {
      gsap.fromTo(element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Navigation Scroll Effect
    const handleScroll = () => {
      const nav = document.querySelector('nav')
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled')
        } else {
          nav.classList.remove('scrolled')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openModal = () => {
    const modal = document.getElementById('credit-modal') as HTMLDialogElement
    if (modal) {
      modal.showModal()
      modal.classList.add('active')
      document.body.style.overflow = 'hidden'

      gsap.fromTo('.modal-content',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }

  const closeModal = () => {
    const modal = document.getElementById('credit-modal') as HTMLDialogElement
    if (modal) {
      gsap.to('.modal-content', {
        scale: 0.9,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          modal.classList.remove('active')
          modal.close()
          document.body.style.overflow = ''
        }
      })
    }
  }

  return (
    <>
      <Loader hidden={loaderHidden} />
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <PartnersMarquee />
      <HowItWorks />
      <Benefits />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA onOpenModal={openModal} />
      <Footer />
      <CreditModal onClose={closeModal} />
    </>
  )
}

