"use client"
import React from "react"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full p-3 border border-border/50 rounded-xl resize-none ${className}`}
    />
  )
}
