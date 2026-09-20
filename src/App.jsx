import { useCallback, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import BrandIntro from './components/BrandIntro.jsx'
import ProductGallery from './components/ProductGallery.jsx'
import VideoSection from './components/VideoSection.jsx'
import OrderForm from './components/OrderForm.jsx'
import SocialSection from './components/SocialSection.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import FloatingOrderButton from './components/FloatingOrderButton.jsx'
import './components/Sections.css'
import './App.css'

function scrollToOrder() {
  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  const [selectedProductId, setSelectedProductId] = useState('')

  const handleSelect = useCallback((productOrId) => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId.id
    setSelectedProductId(id)
    scrollToOrder()
  }, [])

  const handlePick = useCallback((id) => {
    setSelectedProductId(id)
  }, [])

  return (
    <div className="site">
      <Navbar />
      <main>
        <Hero />
        <BrandIntro />
        <ProductGallery selectedId={selectedProductId} onSelect={handleSelect} />
        <VideoSection />
        <OrderForm selectedProductId={selectedProductId} onPickProduct={handlePick} />
        <SocialSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingOrderButton />
    </div>
  )
}
