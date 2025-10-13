import * as React from 'react'
import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  const [colors, setColors] = React.useState<string[]>([])

  React.useEffect(() => {
    const generateRandomColor = () => {
      const hue = Math.floor(Math.random() * 360)
      const saturation = 60 + Math.floor(Math.random() * 20)
      const lightness = 30 + Math.floor(Math.random() * 10)
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }

    const generateGradient = () => {
      const color1 = generateRandomColor()
      const color2 = generateRandomColor()
      return `linear-gradient(135deg, ${color1}, ${color2})`
    }

    setColors([generateGradient(), generateGradient(), generateGradient()])
  }, [])

  return (
    <div
      data-slot="card"
      className={cn(
        'relative flex flex-col gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 py-6 shadow-xl overflow-hidden backdrop-blur-sm text-neutral-100',
        className
      )}
      {...props}
    >
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ background: colors[0] || 'transparent' }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-25 animate-pulse"
        style={{ background: colors[1] || 'transparent', animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ background: colors[2] || 'transparent', animationDelay: '2s' }}
      />

      <div className="relative z-10">
        {props.children}
      </div>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('text-lg font-semibold text-white tracking-tight', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-neutral-400', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-content" className={cn('px-6', className)} {...props} />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 border-t border-neutral-800 pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
