import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Mission from './components/Mission'
import Revolution from './components/Revolution'
import Problems from './components/Problems'
import Solution from './components/Solution'
import ProductGallery from './components/ProductGallery'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import AudioDemo from './components/AudioDemo'
import Community from './components/Community'

export default function App() {
  return (
    <div className="bg-dark font-poppins overflow-x-hidden">
      <Navbar />
      <Hero />
      <Mission />
      <Revolution />
      <Problems />
      <Solution />
      <ProductGallery />
      <Features />
      <HowItWorks />
      <AudioDemo />
      <Community />
    </div>
  )
}
