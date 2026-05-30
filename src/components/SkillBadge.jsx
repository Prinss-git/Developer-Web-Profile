const COLORS = {
  CSS:'#2965f1','Vue.js':'#42b883',PostgreSQL:'#336791',JavaScript:'#f7df1e',
  TypeScript:'#3178c6',React:'#61dafb','Next.js':'#aaa','Node.js':'#339933',
  Go:'#00add8',Python:'#3776ab',SQL:'#336791',Rust:'#ce422b',Docker:'#2496ed',
  Kubernetes:'#326ce5',AWS:'#ff9900',Redis:'#dc382d',Git:'#f05032',GraphQL:'#e535ab',
}

export default function SkillBadge({ name, icon }) {
  const color = COLORS[name] || 'var(--ac)'
  return (
    <div className="group flex flex-col items-center gap-3 p-4 rounded-2xl card cursor-default
                    hover:scale-105 transition-all duration-300">
      <span className="text-2xl leading-none" role="img" aria-hidden="true">{icon}</span>
      <span className="text-xs font-medium text-[var(--tx-2)] group-hover:text-[var(--tx)]
                       text-center transition-colors leading-tight">{name}</span>
      <div className="w-6 h-0.5 rounded-full group-hover:w-10 transition-all duration-300"
           style={{ background: color }} />
    </div>
  )
}
