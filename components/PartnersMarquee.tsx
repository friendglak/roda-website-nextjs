export function PartnersMarquee() {
  const partners = ["Rappi", "Uber Eats", "Didi Food", "iFood"]

  return (
    <section className="py-12 bg-dark-bg border-y border-gray-text/20 overflow-hidden">
      <div className="marquee">
        <div className="marquee-content">
          {/* First set */}
          {partners.map((partner, i) => (
            <div key={i} className="partner-logo text-2xl font-bold text-gray-text px-8">{partner}</div>
          ))}
          {/* Second set for infinite loop */}
          {partners.map((partner, i) => (
            <div key={`dup-${i}`} className="partner-logo text-2xl font-bold text-gray-text px-8">{partner}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

