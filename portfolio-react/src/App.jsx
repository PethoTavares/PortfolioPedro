import { useEffect } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import './index.css'

function AppInner() {
  const { theme } = useTheme()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const bg =
    theme === 'dark'
      ? 'linear-gradient(180deg, #0a0a0a 0%, #111113 50%, #0e0e10 100%)'
      : 'linear-gradient(180deg, #f5f5f0 0%, #eeeee8 50%, #f2f2ec 100%)'

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ background: bg }}>
      <Navbar />
      <Hero />
      <Gallery />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ThemeProvider>
  )
}
