'use client'

import { gsap } from 'gsap'
import { useRef } from 'react'

export function FAQ() {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const iconRefs = useRef<(HTMLElement | null)[]>([])

  const toggleFAQ = (index: number) => {
    const content = contentRefs.current[index]
    const icon = iconRefs.current[index]

    if (!content || !icon) return

    const isOpen = content.style.height && content.style.height !== '0px'

    contentRefs.current.forEach((el, i) => {
      if (i !== index && el) {
        gsap.to(el, { height: 0, duration: 0.3, ease: 'power2.out' })
        if (iconRefs.current[i]) {
          gsap.to(iconRefs.current[i], { rotation: 0, duration: 0.3 })
        }
      }
    })

    if (isOpen) {
      gsap.to(content, { height: 0, duration: 0.3, ease: 'power2.out' })
      gsap.to(icon, { rotation: 0, duration: 0.3 })
    } else {
      gsap.set(content, { height: 'auto' })
      gsap.from(content, { height: 0, duration: 0.3, ease: 'power2.out' })
      gsap.to(icon, { rotation: 180, duration: 0.3 })
    }
  }

  const questions = [
    {
      q: "¿Cuáles son los requisitos para solicitar un crédito?",
      a: "Para solicitar un crédito con Roda necesitas ser mayor de edad, tener un trabajo activo en plataformas de entrega o economía digital, y contar con identificación válida. El proceso es rápido y no requiere historial crediticio tradicional."
    },
    {
      q: "¿Cuánto tiempo toma el proceso de aprobación?",
      a: "El proceso de aprobación típicamente toma entre 24 y 48 horas. Una vez aprobado, coordinamos la entrega de tu vehículo eléctrico en un plazo máximo de 7 días hábiles."
    },
    {
      q: "¿Qué tipo de vehículos eléctricos ofrecen?",
      a: "Ofrecemos una variedad de motocicletas y scooters eléctricos de alta calidad, perfectos para entregas de última milla. Todos nuestros vehículos están diseñados para ser eficientes, rápidos y duraderos."
    },
    {
      q: "¿Cómo funcionan los pagos del crédito?",
      a: "Los pagos se realizan de manera flexible, adaptándose a tus ingresos. Puedes pagar semanal o quincenalmente a través de transferencias automáticas. Ofrecemos planes de pago que se ajustan a tu flujo de trabajo."
    },
    {
      q: "¿En qué ciudades operan?",
      a: "Actualmente operamos en las principales ciudades de Colombia, México y Brasil. Estamos expandiéndonos rápidamente a más ciudades de Latinoamérica. Consulta nuestra página de contacto para verificar disponibilidad en tu ciudad."
    }
  ]

  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-12 bg-dark-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-light-text mb-16 text-center fade-in-up">
          Preguntas frecuentes
        </h2>

        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="fade-in-up faq-item bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:border-roda-green/30 transition-colors focus:outline-none cursor-pointer"
                onClick={() => toggleFAQ(i)}
              >
                <h3 className="text-xl font-semibold text-light-text">
                  {item.q}
                </h3>
                <i
                  ref={el => { if (el) iconRefs.current[i] = el }}
                  className="ph ph-caret-down text-roda-green text-2xl transition-transform shrink-0 ml-4"
                ></i>
              </button>
              <div
                ref={el => { if (el) contentRefs.current[i] = el }}
                className="faq-answer px-6 text-gray-text overflow-hidden h-0"
              >
                <div className="pb-6">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
