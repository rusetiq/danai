export const gradients = {
  primary: "bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 md:from-purple-500/15 md:via-blue-500/15 md:to-pink-500/15",
  
  background: "bg-gradient-to-b from-purple-500/5 via-blue-500/5 to-purple-500/5 md:from-purple-500/15 md:via-blue-500/15 md:to-purple-500/15",
  
  glass: {
    primary: "bg-gradient-to-r from-purple-500/5 to-pink-500/5 md:from-purple-500/15 md:to-pink-500/15",
    secondary: "bg-gradient-to-r from-blue-500/5 to-cyan-500/5",
    accent: "bg-gradient-to-r from-emerald-500/5 to-green-500/5"
  },
  
  borders: {
    primary: "border-purple-500/10 md:border-purple-500/30",
    secondary: "border-blue-500/20",
    accent: "border-cyan-500/20"
  },
  
  textGlow: {
    primary: "drop-shadow-[0_0_8px_rgba(147,51,234,0.3)] drop-shadow-[0_0_12px_rgba(59,130,246,0.2)] drop-shadow-[0_0_16px_rgba(6,182,212,0.1)]",
    enhanced: "drop-shadow-[0_0_15px_rgba(147,51,234,0.4)] drop-shadow-[0_0_25px_rgba(59,130,246,0.3)] drop-shadow-[0_0_35px_rgba(6,182,212,0.2)]"
  },
  
  buttons: {
    primary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
    secondary: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
    outline: "hover:bg-gradient-to-r hover:from-purple-500/5 hover:to-blue-500/5 md:hover:from-purple-500/15 md:hover:to-blue-500/15"
  },
  
  orbs: {
    purple: "bg-gradient-to-r from-purple-500 to-pink-500",
    blue: "bg-gradient-to-r from-blue-500 to-cyan-500", 
    green: "bg-gradient-to-r from-green-500 to-emerald-500",
    orange: "bg-gradient-to-r from-orange-500 to-yellow-500"
  },
  
  icons: {
    primary: "text-purple-500",
    secondary: "text-blue-500",
    accent: "text-cyan-400",
    warning: "text-yellow-400",
    success: "text-emerald-400"
  }
}

export const gradientClasses = {
  sectionBackground: gradients.background,
  
  glassPrimary: `${gradients.glass.primary} ${gradients.borders.primary}`,
  glassSecondary: `${gradients.glass.secondary} ${gradients.borders.secondary}`,
  glassAccent: `${gradients.glass.accent} ${gradients.borders.accent}`,
  
  buttonPrimary: gradients.buttons.primary,
  buttonSecondary: gradients.buttons.secondary,
  buttonOutline: gradients.buttons.outline,
  
  textGlowPrimary: gradients.textGlow.primary,
  textGlowEnhanced: gradients.textGlow.enhanced,
  
  orbPurple: gradients.orbs.purple,
  orbBlue: gradients.orbs.blue,
  orbGreen: gradients.orbs.green,
  orbOrange: gradients.orbs.orange,
  
  borders: gradients.borders,
  buttons: gradients.buttons
}

export const componentClasses = {
  glassCard: `glass rounded-3xl p-8 md:p-12 text-center border ${gradients.borders.primary} ${gradients.glass.primary}`,
  
  glassBadge: `glass rounded-full px-6 py-3 text-sm border ${gradients.borders.primary} ${gradients.glass.primary}`,
  
  primaryButton: `glass rounded-xl ${gradients.buttons.primary} text-white px-8 py-4 text-lg shadow-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 group`,
  
  outlineButton: `glass rounded-xl px-8 py-4 text-lg bg-transparent border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 group`,
  
  orbsContainer: "absolute inset-0 opacity-15 md:opacity-40 pointer-events-none"
}
