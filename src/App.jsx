import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import ExperienceSkills from './sections/ExperienceSkills'
import CTABanner from './components/CTABanner'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
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
    </>
  )
}
