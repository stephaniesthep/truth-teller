import { useState, useRef, useCallback } from 'react'
import WebcamCapture from './components/WebcamCapture'

function App() {
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const handleCameraStart = useCallback(() => {
    setIsRecording(true)
    setError(null)
    setStatus('Camera started successfully')
  }, [])

  const handleCameraStop = useCallback(() => {
    setIsRecording(false)
    setStatus('Camera stopped')
  }, [])

  const handleCameraError = useCallback((errorMessage: string) => {
    setError(errorMessage)
    setIsRecording(false)
    setStatus(null)
  }, [])

  const handleScreenshot = useCallback((imageSrc: string) => {
    setStatus('Screenshot captured successfully!')
    // Create download link
    const link = document.createElement('a')
    link.download = `truth-teller-screenshot-${Date.now()}.png`
    link.href = imageSrc
    link.click()
  }, [])

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">Truth Teller</h1>
        <p className="app-subtitle">Advanced Emotion Detection System</p>
      </header>

      <main>
        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {status && (
          <div className="status-message">
            {status}
          </div>
        )}

        <WebcamCapture
          onCameraStart={handleCameraStart}
          onCameraStop={handleCameraStop}
          onCameraError={handleCameraError}
          onScreenshot={handleScreenshot}
        />
      </main>
    </div>
  )
}

export default App