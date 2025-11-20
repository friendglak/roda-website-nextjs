import Image from 'next/image'

export function PartnersMarquee() {
  const partners = [
    { name: "Rappi", src: "/partners/rappi.avif" },
    { name: "Mensajeros Urbanos", src: "/partners/mensajeros-urbanos.avif" },
    { name: "Alcaldía", src: "/partners/alcaldia.avif" },
    { name: "Bogotá", src: "/partners/bogota.avif" },
    { name: "Armi", src: "/partners/armi.avif" },
    { name: "Energía", src: "/partners/energia.avif" },
    { name: "Guajira", src: "/partners/guajira.avif" },
    { name: "Nergo", src: "/partners/nergo.avif" },
    { name: "Zono", src: "/partners/zono.avif" },
  ]

  return (
    <section className="py-12 bg-dark-bg border-y border-white/10 overflow-hidden">
      <div className="marquee">
        <div className="marquee-content items-center">
          {/* Triple set for smoother infinite loop on wide screens */}
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div key={i} className="partner-logo px-8 min-w-[150px] flex justify-center">
              <div className="relative h-12 w-32 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
