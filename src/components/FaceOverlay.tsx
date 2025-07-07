import { useEffect, useRef } from 'react'

interface FaceDetection {
  x: number
  y: number
  width: number
  height: number
  confidence: number
}

interface FaceOverlayProps {
  faces: FaceDetection[]
  videoWidth: number
  videoHeight: number
  className?: string
}

const FaceOverlay: React.FC<FaceOverlayProps> = ({
  faces,
  videoWidth,
  videoHeight,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = videoWidth
    canvas.height = videoHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw face detection boxes
    faces.forEach((face) => {
      // Draw bounding box
      ctx.strokeStyle = '#ec4899'
      ctx.lineWidth = 3
      ctx.setLineDash([])
      ctx.strokeRect(face.x, face.y, face.width, face.height)

      // Draw confidence label
      ctx.fillStyle = '#ec4899'
      ctx.font = 'bold 16px Inter, sans-serif'
      
      const confidenceText = `Face ${Math.round(face.confidence * 100)}%`
      const textMetrics = ctx.measureText(confidenceText)
      const textWidth = textMetrics.width
      const textHeight = 20

      // Background for text
      ctx.fillStyle = 'rgba(236, 72, 153, 0.8)'
      ctx.fillRect(
        face.x,
        face.y - textHeight - 5,
        textWidth + 10,
        textHeight + 5
      )

      // Text
      ctx.fillStyle = 'white'
      ctx.fillText(confidenceText, face.x + 5, face.y - 8)

      // Draw corner markers for a more modern look
      const cornerSize = 20
      ctx.strokeStyle = '#f472b6'
      ctx.lineWidth = 4
      ctx.setLineDash([])

      // Top-left corner
      ctx.beginPath()
      ctx.moveTo(face.x, face.y + cornerSize)
      ctx.lineTo(face.x, face.y)
      ctx.lineTo(face.x + cornerSize, face.y)
      ctx.stroke()

      // Top-right corner
      ctx.beginPath()
      ctx.moveTo(face.x + face.width - cornerSize, face.y)
      ctx.lineTo(face.x + face.width, face.y)
      ctx.lineTo(face.x + face.width, face.y + cornerSize)
      ctx.stroke()

      // Bottom-left corner
      ctx.beginPath()
      ctx.moveTo(face.x, face.y + face.height - cornerSize)
      ctx.lineTo(face.x, face.y + face.height)
      ctx.lineTo(face.x + cornerSize, face.y + face.height)
      ctx.stroke()

      // Bottom-right corner
      ctx.beginPath()
      ctx.moveTo(face.x + face.width - cornerSize, face.y + face.height)
      ctx.lineTo(face.x + face.width, face.y + face.height)
      ctx.lineTo(face.x + face.width, face.y + face.height - cornerSize)
      ctx.stroke()
    })
  }, [faces, videoWidth, videoHeight])

  return (
    <canvas
      ref={canvasRef}
      className={`face-overlay ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10
      }}
    />
  )
}

export default FaceOverlay