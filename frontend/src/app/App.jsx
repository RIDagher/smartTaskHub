import React from 'react'
import { Button } from '@/components/ui/button'
import Navbar from './assets/features/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
        <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
    </div>
  )
}

export default App
