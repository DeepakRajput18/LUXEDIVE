import { useState } from 'react'
import { cn } from '../../lib/utils'

interface Tab {
    id: string
    label: string
}

interface TabsProps {
    tabs: Tab[]
    activeTab: string
    onChange: (id: string) => void
    className?: string
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
    return (
        <div className={cn("flex space-x-1 rounded-xl bg-luxe-gray/10 p-1", className)}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={cn(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-luxe-gold focus:outline-none focus:ring-2",
                            isActive
                                ? "bg-luxe-gold text-luxe-black shadow"
                                : "text-luxe-gray hover:bg-white/[0.12] hover:text-white"
                        )}
                    >
                        {tab.label}
                    </button>
                )
            })}
        </div>
    )
}
