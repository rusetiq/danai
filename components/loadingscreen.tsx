import { useState, useEffect } from "react"
import { Heart , Sparkles } from "lucide-react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [pulseActive, setPulseActive] = useState(false)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    const pulseInterval = setInterval(() => {
      setPulseActive(true)
      setTimeout(() => setPulseActive(false), 600)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(pulseInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes expandPulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        @keyframes logoGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(147, 51, 234, 0.3))
                    drop-shadow(0 0 20px rgba(59, 130, 246, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.6))
                    drop-shadow(0 0 40px rgba(59, 130, 246, 0.4))
                    drop-shadow(0 0 60px rgba(6, 182, 212, 0.3));
          }
        }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0.4) 100%
          );
          background-size: 1000px 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .pulse-ring {
          animation: expandPulse 1.5s ease-out;
        }
        .logo-glow {
          animation: logoGlow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 md:from-purple-500/10 md:via-blue-500/10 md:to-pink-500/10" />
      
      <div className="absolute inset-0 opacity-10 md:opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8 px-4">
        <div className="relative">
          {pulseActive && (
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/50 md:border-purple-500/70 pulse-ring" />
          )}
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center float-animation logo-glow">
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold shimmer-text">
            CharityConnect UAE
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Connecting communities across the UAE
          </p>
        </div>

        <div className="w-64 md:w-80 space-y-2">
          <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-bar" />
            </div>
          </div>
          <p className="text-xs md:text-sm text-center text-muted-foreground">
            {Math.min(Math.round(progress), 100)}% loaded
          </p>
        </div>

        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
