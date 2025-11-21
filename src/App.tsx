import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Azodha User Onboarding
          </h1>
          <p className="text-muted-foreground">
            Tailwind CSS + Shadcn/ui setup complete
          </p>
        </div>
        
        <div className="card bg-card text-card-foreground p-6 rounded-lg border shadow-sm">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Count is {count}
          </button>
          <p className="mt-4 text-sm text-muted-foreground">
            Edit <code className="px-1 py-0.5 bg-muted rounded text-xs">src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
