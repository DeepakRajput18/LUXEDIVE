import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className={cn(
        "relative w-full max-w-lg rounded-xl bg-luxe-dark border border-luxe-gray/20 shadow-2xl p-6 transform transition-all animate-in fade-in zoom-in-95 duration-200",
        className
      )}>
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-xl font-serif text-luxe-white">{title}</h3>}
          <button onClick={onClose} className="text-luxe-gray hover:text-luxe-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
