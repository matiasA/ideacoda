import type { AppProps } from 'next/app'
import AnimatedBackground from '../components/AnimatedBackground'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedBackground />
      <Header />
      <main className="flex-grow p-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp