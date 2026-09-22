import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Nav, Footer } from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Practice from './pages/Practice.jsx'
import Articles from './pages/Articles.jsx'
import Notice from './pages/Notice.jsx'
import Clients from './pages/Clients.jsx'
import About from './pages/About.jsx'

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { el.scrollIntoView({ block: 'start' }); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice/:slug" element={<Practice />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="*" element={<Notice notFound />} />
      </Routes>
      <Footer />
    </>
  )
}
