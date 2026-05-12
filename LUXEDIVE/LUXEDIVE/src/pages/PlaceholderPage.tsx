import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Construction } from 'lucide-react'

interface PlaceholderProps {
  title: string
  description?: string
}

export default function PlaceholderPage({ title, description }: PlaceholderProps) {
  const navigate = useNavigate()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-luxe-black">
      <div className="w-16 h-16 bg-luxe-gold/10 rounded-full flex items-center justify-center mb-6">
        <Construction className="w-8 h-8 text-luxe-gold" />
      </div>
      <h1 className="text-4xl font-serif text-white mb-4">{title}</h1>
      <p className="text-luxe-gray max-w-md mx-auto mb-8">
        {description || "This page is currently under construction as part of the new luxury design system."}
      </p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
        <Button onClick={() => navigate('/')}>Return Home</Button>
      </div>
    </div>
  )
}
