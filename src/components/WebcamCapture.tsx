import { useState, useRef, useEffect, useCallback } from 'react'
import { useFaceDetection } from '../hooks/useFaceDetection'
import FaceOverlay from './FaceOverlay'

interface WebcamCaptureProps {
  onCameraStart: () => void
  onCameraStop: () => void
  onCameraError: (error: string) => void
  onScreenshot: (imageSrc: string) => void
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onCameraStart,
  onCameraStop,
  onCameraError,
  onScreenshot
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  
  const [isStreaming, setIsStreaming] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 })
  const [faceDetectionEnabled, setFaceDetectionEnabled] = useState(true)

  const {
    isDetecting,
    detectedFaces,
    startDetection,
    stopDetection,
    error: faceDetectionError
  } = useFaceDetection()

  const startCamera = useCallback(async () => {
    setIsLoading(true)
    
    try {
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user' // Front camera
        },
        audio: false
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        
        videoRef.current.onloadedmetadata = () => {
          const video = videoRef.current!
          setVideoSize({ width: video.videoWidth, height: video.videoHeight })
          setIsStreaming(true)
          setIsLoading(false)
          onCameraStart()
          
          // Start face detection after a short delay to ensure video is ready
          setTimeout(() => {
            if (canvasRef.current && faceDetectionEnabled) {
              startDetection(video, canvasRef.current)
            }
          }, 500)
        }
      }
    } catch (error) {
      setIsLoading(false)
      let errorMessage = 'Failed to access camera'
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Camera access denied. Please allow camera permissions and try again.'
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No camera found. Please connect a camera and try again.'
        } else if (error.name === 'NotSupportedError') {
          errorMessage = 'Camera not supported by this browser.'
        } else {
          errorMessage = `Camera error: ${error.message}`
        }
      }
      
      onCameraError(errorMessage)
    }
  }, [onCameraStart, onCameraError])

  const stopCamera = useCallback(() => {
    stopDetection()
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    
    setIsStreaming(false)
    setVideoSize({ width: 0, height: 0 })
    onCameraStop()
  }, [onCameraStop, stopDetection])

  const takeScreenshot = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) {
      onCameraError('Cannot take screenshot: camera not active')
      return
    }

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (!context) {
      onCameraError('Cannot take screenshot: canvas context not available')
      return
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw the current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert canvas to image data URL
    const imageSrc = canvas.toDataURL('image/png')
    onScreenshot(imageSrc)
  }, [isStreaming, onCameraError, onScreenshot])

  const toggleFaceDetection = useCallback(() => {
    if (faceDetectionEnabled && isDetecting) {
      stopDetection()
    } else if (!faceDetectionEnabled && isStreaming && videoRef.current && canvasRef.current) {
      startDetection(videoRef.current, canvasRef.current)
    }
    setFaceDetectionEnabled(!faceDetectionEnabled)
  }, [faceDetectionEnabled, isDetecting, isStreaming, startDetection, stopDetection])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div className="camera-container">
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <video
          ref={videoRef}
          className="video-feed"
          autoPlay
          playsInline
          muted
          style={{ display: isStreaming ? 'block' : 'none' }}
        />
        
        {isStreaming && videoSize.width > 0 && (
          <FaceOverlay
            faces={detectedFaces}
            videoWidth={videoSize.width}
            videoHeight={videoSize.height}
          />
        )}
      </div>
      
      {!isStreaming && !isLoading && (
        <div className="camera-placeholder" style={{
          width: '640px',
          height: '480px',
          backgroundColor: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: '2px dashed #646cff',
          maxWidth: '100%'
        }}>
          <p style={{ color: '#888', fontSize: '1.2em' }}>
            Click "Start Camera" to begin
          </p>
        </div>
      )}

      {isLoading && (
        <div className="camera-placeholder" style={{
          width: '640px',
          height: '480px',
          backgroundColor: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          maxWidth: '100%'
        }}>
          <p style={{ color: '#646cff', fontSize: '1.2em' }}>
            Loading camera...
          </p>
        </div>
      )}

      <div className="controls">
        {!isStreaming ? (
          <button
            className="btn btn-primary"
            onClick={startCamera}
            disabled={isLoading}
          >
            {isLoading ? 'Starting...' : 'Start Camera'}
          </button>
        ) : (
          <>
            <button
              className="btn btn-success"
              onClick={takeScreenshot}
            >
              📸 Take Screenshot
            </button>
            <button
              className={`btn ${faceDetectionEnabled ? 'btn-primary' : ''}`}
              onClick={toggleFaceDetection}
            >
              {faceDetectionEnabled ? '👤 Face Detection ON' : '👤 Face Detection OFF'}
            </button>
            <button
              className="btn"
              onClick={stopCamera}
            >
              Stop Camera
            </button>
          </>
        )}
      </div>

      {isStreaming && (
        <div className="detection-status" style={{
          marginTop: '1rem',
          padding: '0.5rem',
          backgroundColor: 'rgba(236, 72, 153, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(236, 72, 153, 0.2)'
        }}>
          <p style={{ margin: 0, color: '#be185d', fontWeight: '500' }}>
            Face Detection: {faceDetectionEnabled ? (isDetecting ? '🟢 Active' : '🟡 Starting...') : '🔴 Disabled'} |
            Faces Detected: {detectedFaces.length}
          </p>
          {faceDetectionError && (
            <p style={{ margin: '0.5rem 0 0 0', color: '#be185d', fontSize: '0.9em' }}>
              Detection Error: {faceDetectionError}
            </p>
          )}
        </div>
      )}

      {/* Hidden canvas for screenshot functionality */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default WebcamCapture