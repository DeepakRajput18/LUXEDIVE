import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface AccordionItem {
    id: string
    title: string
    content: React.ReactNode
}

interface AccordionProps {
    items: AccordionItem[]
    className?: string
}

export function Accordion({ items, className }: AccordionProps) {
    const [openId, setOpenId] = useState<string | null>(null)

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <div className={cn("space-y-2", className)}>
            {items.map((item) => {
                const isOpen = openId === item.id
                return (
                    <div key={item.id} className="border border-luxe-gray/10 rounded-lg overflow-hidden bg-luxe-dark/30">
                        <button
                            onClick={() => toggle(item.id)}
                            className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                        >
                            <span className="font-medium text-luxe-white">{item.title}</span>
                            <ChevronDown className={cn("w-5 h-5 text-luxe-gray transition-transform", isOpen && "transform rotate-180")} />
                        </button>
                        <div
                            className={cn(
                                "overflow-hidden transition-all duration-300 ease-in-out",
                                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            )}
                        >
                            <div className="p-4 pt-0 text-luxe-gray text-sm leading-relaxed border-t border-luxe-gray/5">
                                {item.content}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
