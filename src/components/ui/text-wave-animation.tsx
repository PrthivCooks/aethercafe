"use client"

import { useEffect } from "react"

interface AnimatedTextWaveProps {
  text?: string
  count?: number
  backgroundColor?: string
  colors?: string[]
  animationDuration?: number
  fontSize?: string
  staggerDelay?: number
  heightFactor?: number
}

export function AnimatedTextWave({
  text = "✦",
  count = 5,
  backgroundColor = "transparent",
  colors = [
    "#D4AF37", // Gold
    "#B89B82",
    "#8C715A",
    "#665140",
    "#38312B",
  ],
  animationDuration = 2,
  fontSize = "8vw",
  staggerDelay = 200,
  heightFactor = 2,
}: AnimatedTextWaveProps) {
  useEffect(() => {
    let rainbowEnd = ""
    let rainbowEnd2 = ""

    colors.slice().reverse().forEach((c, i) => {
      rainbowEnd += `,0 ${(i - Math.floor(colors.length/2)) * heightFactor}vh ${i * 2}px ${c}`
    })

    colors.forEach((c, i) => {
      rainbowEnd2 += `,0 ${(i - Math.floor(colors.length/2)) * -heightFactor}vh ${i * 2}px ${c}`
    })

    rainbowEnd = rainbowEnd.substring(1)
    rainbowEnd2 = rainbowEnd2.substring(1)

    const styleSheet = document.createElement("style")
    styleSheet.textContent = `
      @keyframes coffeeShadow {
        0% { text-shadow: ${rainbowEnd}; }
        100% { text-shadow: ${rainbowEnd2}; }
      }
    `
    document.head.appendChild(styleSheet)

    const hearts = document.querySelectorAll(".wave-span")
    hearts.forEach((heart, i) => {
      const element = heart as HTMLElement
      element.style.animation = `coffeeShadow ${animationDuration}s cubic-bezier(0.3, 0, 0.7, 1) infinite alternate both`
      element.style.animationDelay = `${-1000 + i * staggerDelay}ms`
    })

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [colors, animationDuration, staggerDelay, heightFactor])

  return (
    <div className="w-full flex gap-1 items-center justify-center overflow-hidden"
      style={{ 
        height: "60vh",
        backgroundColor
      }}
    >
      <h1 className="font-black flex flex-wrap justify-center gap-4"
        style={{
          fontSize: fontSize,  
          color: "transparent", 
        }}
      >
        {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className="wave-span"
              style={{
                display: "inline-block",
              }}
            >
              {text}
            </span>
          )
        )}
      </h1>
    </div>
  )
}
