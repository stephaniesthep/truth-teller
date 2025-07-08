export default function PhotoboothFrame() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background with gradient pattern */}

      {/* Main photobooth frame */}
      <div className="relative p-6 rounded-lg shadow-2xl border-4 border-pink-400 max-w-md w-full overflow-hidden bg-pink-200">
        {/* Pattern overlay with reduced opacity */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            backgroundImage: `url('/images/frame-background.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.2,
          }}
        ></div>

        {/* Logo at the top */}
        <div className="text-center mb-4 relative z-10">
          <h1 className="text-2xl font-bold text-pink-600 font-serif italic">Truth Teller</h1>
        </div>

        {/* Photo container */}
        <div className="relative p-3 bg-white px-0 py-0 rounded-lg shadow-inner relative z-10">
          <div className="aspect-square overflow-hidden rounded-lg border-4 border-[rgba(244,114,182,1)]"></div>
        </div>

        {/* Bottom logo */}
        <div className="text-center mt-4 relative z-10"></div>
      </div>
    </div>
  )
}
