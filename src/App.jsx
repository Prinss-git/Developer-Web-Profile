import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggle} />
      <main id="main-content" tabIndex="-1">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
