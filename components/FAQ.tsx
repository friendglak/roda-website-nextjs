'use client'

import { gsap } from 'gsap'

const toggleFAQ = (element: HTMLElement) => {
  const isActive = element.classList.contains('active')
  const answer = element.querySelector('.faq-answer')
  const button = element.querySelector('button')
  const icon = element.querySelector('i')

  document.querySelectorAll('.faq-item').forEach((item) => {
    if (item !== element) {
      item.classList.remove('active')
      item.querySelector('.faq-answer')?.classList.add('hidden')
      const btn = item.querySelector('button')
      if (btn) btn.setAttribute('aria-expanded', 'false')
      const ic = item.querySelector('i')
      if (ic) (ic as HTMLElement).style.transform = 'rotate(0deg)'
    }
  })

  if (isActive) {
    element.classList.remove('active')
    answer?.classList.add('hidden')
    if (button) button.setAttribute('aria-expanded', 'false')
    if (icon) (icon as HTMLElement).style.transform = 'rotate(0deg)'
  } else {
    element.classList.add('active')
    answer?.classList.remove('hidden')
    if (button) button.setAttribute('aria-expanded', 'true')
    if (icon) (icon as HTMLElement).style.transform = 'rotate(180deg)'

    if (answer) {
      gsap.from(answer, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-12 bg-dark-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-light-text mb-16 text-center fade-in-up">
          Preguntas frecuentes
        </h2>

        <div className="space-y-4">
          <div className="fade-in-up faq-item bg-[#1a1a1a] border border-gray-text/10 rounded-xl overflow-hidden">
            <button
              className="w-full p-6 text-left flex justify-between items-center hover:border-roda-green/30 transition-colors focus:outline-none focus:ring-2 focus:ring-roda-green/50"
              onClick={(e) => toggleFAQ(e.currentTarget.closest('.faq-item') as HTMLElement)}
              aria-expanded="false"
              aria-controls="faq-answer-1"
            >
              <h3 className="text-xl font-semibold text-light-text">
                ¿Cuáles son los requisitos para solicitar un crédito?
              </h3>
              <i className="ph ph-caret-down text-roda-green text-2xl transition-transform flex-shrink-0 ml-4"></i>
            </button>
            <div id="faq-answer-1" className="faq-answer px-6 pb-6 text-gray-text hidden">
              <p>
                Para solicitar un crédito con Roda necesitas ser mayor de edad,
                tener un trabajo activo en plataformas de entrega o economía
                digital, y contar con identificación válida. El proceso es
                rápido y no requiere historial crediticio tradicional.
              </p>
            </div>
          </div>

          <div className="fade-in-up faq-item bg-[#1a1a1a] border border-gray-text/10 rounded-xl overflow-hidden">
            <button
              className="w-full p-6 text-left flex justify-between items-center hover:border-roda-green/30 transition-colors focus:outline-none focus:ring-2 focus:ring-roda-green/50"
              onClick={(e) => toggleFAQ(e.currentTarget.closest('.faq-item') as HTMLElement)}
              aria-expanded="false"
              aria-controls="faq-answer-2"
            >
              <h3 className="text-xl font-semibold text-light-text">
                ¿Cuánto tiempo toma el proceso de aprobación?
              </h3>
              <i className="ph ph-caret-down text-roda-green text-2xl transition-transform flex-shrink-0 ml-4"></i>
            </button>
            <div id="faq-answer-2" className="faq-answer px-6 pb-6 text-gray-text hidden">
              <p>
                El proceso de aprobación típicamente toma entre 24 y 48 horas.
                Una vez aprobado, coordinamos la entrega de tu vehículo
                eléctrico en un plazo máximo de 7 días hábiles.
              </p>
            </div>
          </div>

          <div className="fade-in-up faq-item bg-[#1a1a1a] border border-gray-text/10 rounded-xl overflow-hidden">
            <button
              className="w-full p-6 text-left flex justify-between items-center hover:border-roda-green/30 transition-colors focus:outline-none focus:ring-2 focus:ring-roda-green/50"
              onClick={(e) => toggleFAQ(e.currentTarget.closest('.faq-item') as HTMLElement)}
              aria-expanded="false"
              aria-controls="faq-answer-3"
            >
              <h3 className="text-xl font-semibold text-light-text">
                ¿Qué tipo de vehículos eléctricos ofrecen?
              </h3>
              <i className="ph ph-caret-down text-roda-green text-2xl transition-transform flex-shrink-0 ml-4"></i>
            </button>
            <div id="faq-answer-3" className="faq-answer px-6 pb-6 text-gray-text hidden">
              <p>
                Ofrecemos una variedad de motocicletas y scooters eléctricos de
                alta calidad, perfectos para entregas de última milla. Todos
                nuestros vehículos están diseñados para ser eficientes, rápidos
                y duraderos.
              </p>
            </div>
          </div>

          <div className="fade-in-up faq-item bg-[#1a1a1a] border border-gray-text/10 rounded-xl overflow-hidden">
            <button
              className="w-full p-6 text-left flex justify-between items-center hover:border-roda-green/30 transition-colors focus:outline-none focus:ring-2 focus:ring-roda-green/50"
              onClick={(e) => toggleFAQ(e.currentTarget.closest('.faq-item') as HTMLElement)}
              aria-expanded="false"
              aria-controls="faq-answer-4"
            >
              <h3 className="text-xl font-semibold text-light-text">
                ¿Cómo funcionan los pagos del crédito?
              </h3>
              <i className="ph ph-caret-down text-roda-green text-2xl transition-transform flex-shrink-0 ml-4"></i>
            </button>
            <div id="faq-answer-4" className="faq-answer px-6 pb-6 text-gray-text hidden">
              <p>
                Los pagos se realizan de manera flexible, adaptándose a tus
                ingresos. Puedes pagar semanal o quincenalmente a través de
                transferencias automáticas. Ofrecemos planes de pago que se
                ajustan a tu flujo de trabajo.
              </p>
            </div>
          </div>

          <div className="fade-in-up faq-item bg-[#1a1a1a] border border-gray-text/10 rounded-xl overflow-hidden">
            <button
              className="w-full p-6 text-left flex justify-between items-center hover:border-roda-green/30 transition-colors focus:outline-none focus:ring-2 focus:ring-roda-green/50"
              onClick={(e) => toggleFAQ(e.currentTarget.closest('.faq-item') as HTMLElement)}
              aria-expanded="false"
              aria-controls="faq-answer-5"
            >
              <h3 className="text-xl font-semibold text-light-text">
                ¿En qué ciudades operan?
              </h3>
              <i className="ph ph-caret-down text-roda-green text-2xl transition-transform flex-shrink-0 ml-4"></i>
            </button>
            <div id="faq-answer-5" className="faq-answer px-6 pb-6 text-gray-text hidden">
              <p>
                Actualmente operamos en las principales ciudades de Colombia,
                México y Brasil. Estamos expandiéndonos rápidamente a más
                ciudades de Latinoamérica. Consulta nuestra página de contacto
                para verificar disponibilidad en tu ciudad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

