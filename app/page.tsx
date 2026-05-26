import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Store</h1>
        <p className="text-lg text-muted-foreground">
          Your project structure is being set up. Check that all components are working correctly!
        </p>
      </div>
      <Footer />
    </main>
  )
}
