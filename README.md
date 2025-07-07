# Truth Teller - Emotion Detection System

A real-time emotion detection web application built with React Router v7, TypeScript, and Vite. This is the foundation for an advanced facial expression analysis system.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3001` (or the port shown in terminal)

## 📱 Features

### Current Implementation (MVP)
- ✅ **Real-time Webcam Feed**: Access and display live camera feed
- ✅ **Screenshot Functionality**: Capture and download screenshots from live feed
- ✅ **Camera Permission Handling**: Proper error handling for camera access
- ✅ **Responsive Design**: Works on different screen sizes
- ✅ **Status Updates**: Real-time feedback for user actions

### Planned Features (Roadmap)
- 🔄 **Face Detection**: MediaPipe integration for face tracking
- 🔄 **Emotion Classification**: TensorFlow.js CNN models
- 🔄 **Intensity Analysis**: Emotion strength measurement
- 🔄 **Visual Overlays**: Real-time emotion display on face
- 🔄 **Micro-expressions**: Advanced facial analysis
- 🔄 **Analytics Dashboard**: Emotion history and statistics

## 🎮 How to Use

1. **Start Camera**: Click "Start Camera" to begin webcam feed
2. **Take Screenshot**: Click "📸 Take Screenshot" to capture and download image
3. **Stop Camera**: Click "Stop Camera" to end the session

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v7
- **Build Tool**: Vite
- **Styling**: CSS3 with custom properties
- **Camera API**: WebRTC getUserMedia()

## 📁 Project Structure

```
truth-teller/
├── docs/                          # Documentation
│   └── emotion-detection-roadmap.md
├── src/
│   ├── components/
│   │   └── WebcamCapture.tsx      # Camera component
│   ├── App.tsx                    # Main application
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Deployment

This project is configured for easy deployment to Netlify:

1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Connect to Netlify**: Link your repository to Netlify
3. **Auto-deploy**: Netlify will automatically build and deploy using the configuration in `netlify.toml`

For detailed deployment instructions, see [`DEPLOYMENT.md`](DEPLOYMENT.md).

**Live Demo**: [Deploy your own instance to see it in action!]

### Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

**Note**: Camera access requires HTTPS in production or localhost for development.

## 🔒 Privacy & Security

- **Local Processing**: All camera processing happens in your browser
- **No Data Upload**: Images and video never leave your device
- **Permission Based**: Requires explicit camera permission
- **Secure Context**: Works only in secure contexts (HTTPS/localhost)

## 🚧 Next Steps

Follow the detailed roadmap in [`docs/emotion-detection-roadmap.md`](docs/emotion-detection-roadmap.md) to implement:

1. **Phase 1**: Basic face detection with MediaPipe
2. **Phase 2**: TensorFlow.js emotion classification
3. **Phase 3**: Advanced emotion analysis
4. **Phase 4**: Visual overlays and UI enhancements
5. **Phase 5**: Testing and optimization

## 🐛 Troubleshooting

### Camera Not Working
- Ensure camera permissions are granted
- Check if another application is using the camera
- Try refreshing the page
- Verify camera is properly connected

### Build Errors
- Run `pnpm install` to ensure all dependencies are installed
- Check Node.js version (requires Node 16+)
- Clear cache: `rm -rf node_modules pnpm-lock.yaml && pnpm install`

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

This is a learning project following the roadmap. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Current Status**: ✅ Basic webcam functionality implemented
**Next Milestone**: Face detection integration with MediaPipe