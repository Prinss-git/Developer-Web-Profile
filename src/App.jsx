import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import LoadingScreen from './components/LoadingScreen'
import KeyboardNav from './components/KeyboardNav'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import ExperienceSkills from './sections/ExperienceSkills'
import CTABanner from './components/CTABanner'

export default function App() {
  const { theme, toggle } = useTheme()
  const [ready, setReady] = useState(false)
  useLenis()

  return (
    <>
      <LoadingScreen onDone={() => setReady(true)} />
      <ScrollProgress />
      <KeyboardNav />
      <div style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s ease' }}>
        <Navbar theme={theme} toggleTheme={toggle} />
        <main id="main-content" tabIndex="-1">
          <Hero />
          <Marquee />
          <About />
          <Projects />
          <ExperienceSkills />
          <CTABanner />
        </main>
        <Footer />
      </div>
    </>
  )
}
