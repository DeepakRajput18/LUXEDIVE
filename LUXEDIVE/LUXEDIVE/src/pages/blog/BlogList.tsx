import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogService } from '../../services/blogService'
import type { BlogPost } from '../../services/blogService'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { SeoHelmet } from '../../components/SeoHelmet'
import { Calendar, User } from 'lucide-react'

export default function BlogList() {
    const [posts, setPosts] = useState<BlogPost[]>([])

    useEffect(() => {
        blogService.getPosts().then(setPosts)
    }, [])

    return (
        <div className="pb-20">
            <SeoHelmet title="The Luxe Life Blog" description="Latest trends in luxury mobility and lifestyle." />

            <div className="bg-luxe-dark py-20 border-b border-luxe-gray/10 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-luxe-white mb-4">The Luxe Life</h1>
                    <p className="text-luxe-gray max-w-2xl mx-auto">
                        Curated stories about automotive excellence, travel, and the finer things in life.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                            <Card className="h-full bg-transparent border-none hover:-translate-y-2 transition-transform duration-300">
                                <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                                    <img
                                        src={post.cover_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-white/90 text-black backdrop-blur">{post.tags[0]}</Badge>
                                    </div>
                                </div>
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-4 text-xs text-luxe-gray mb-3">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.published_at).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                                    </div>
                                    <h2 className="text-2xl font-serif text-luxe-white mb-3 group-hover:text-luxe-gold transition-colors">{post.title}</h2>
                                    <p className="text-luxe-gray text-sm line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
