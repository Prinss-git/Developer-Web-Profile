import { useTheme } from './hooks/useTheme'
import { useLenis } from './hooks/useLenis'
import { useStrike } from './hooks/useStrike'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import KeyboardNav from './components/KeyboardNav'
import { InkFilter } from './components/Record'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import About from './sections/About'
import ExperienceSkills from './sections/ExperienceSkills'
import Contact from './sections/Contact'

export default function App() {
  const { theme, toggle } = useTheme()
  useLenis()
  useStrike()

  return (
    <>
      <InkFilter />
      <KeyboardNav />
      <Navbar theme={theme} toggleTheme={toggle} />
      <main id="main-content" tabIndex="-1" className="outline-none">
        <Hero />
        <Projects />
        <About />
        <ExperienceSkills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
