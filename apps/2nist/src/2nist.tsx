import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app-container">
        <header>
          <h1>2nist Application</h1>
          <p>Your custom 2nist application is now running!</p>
        </header>
        
        <main>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              You clicked {count} times
            </button>
            <p>
              This is your customized 2nist app. Edit <code>src/2nist.tsx</code> to modify this component.
            </p>
          </div>
          
          <div className="info-section">
            <h2>Getting Started</h2>
            <p>You can now start building your 2nist application by:</p>
            <ul>
              <li>Adding new components in the src directory</li>
              <li>Installing additional dependencies as needed</li>
              <li>Implementing your application logic</li>
            </ul>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
