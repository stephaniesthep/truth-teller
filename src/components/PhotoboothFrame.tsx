import './PhotoboothFrame.css';

interface PhotoboothFrameProps {
  imageData?: string;
  className?: string;
}

export default function PhotoboothFrame({ imageData, className = '' }: PhotoboothFrameProps) {
  return (
    <div className={`photobooth-container ${className}`}>
      {/* Background with gradient pattern */}

      {/* Main photobooth frame */}
      <div className="photobooth-frame">
        {/* Pattern overlay with reduced opacity */}
        <div className="pattern-overlay"></div>

        {/* Logo at the top */}
        <div className="logo-container">
          <h1 className="logo-title">Truth Teller</h1>
        </div>

        {/* Photo container */}
        <div className="photo-container">
          <div className="photo-frame">
            {imageData && (
              <img
                src={imageData}
                alt="Captured photo"
                className="captured-image"
              />
            )}
          </div>
        </div>

        {/* Bottom logo */}
        <div className="bottom-logo-container"></div>
      </div>
    </div>
  )
}
