export function Loader({ hidden }: { hidden: boolean }) {
  return (
    <div className={`loader ${hidden ? 'hidden' : ''}`}>
      <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tighter uppercase text-roda-green">
        RODA
      </h1>
    </div>
  )
}

