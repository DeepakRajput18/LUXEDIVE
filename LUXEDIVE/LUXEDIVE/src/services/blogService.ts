import { supabase } from '../lib/supabaseClient'

export type BlogPost = {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    cover_image: string
    author: string
    published_at: string
    tags: string[]
}

export const blogService = {
    async getPosts() {
        // Mock Data if table doesn't exist
        // In production: await supabase.from('posts').select('*').eq('published', true)
        return [
            {
                id: '1',
                slug: 'luxury-car-rental-tips-ahmedabad',
                title: '5 Tips for Renting a Supercar in Ahmedabad',
                excerpt: 'Everything you need to know before getting behind the wheel of a Lamborghini.',
                content: 'Full article content about luxury car rental tips...',
                cover_image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
                published_at: '2026-01-15',
                tags: ['Guide', 'Tips'],
                author: 'Luxe Team'
            },
            {
                id: '2',
                slug: 'grand-wedding-entrance-ideas',
                title: 'The Ultimate Guide to a Royal Wedding Entrance',
                excerpt: 'Why a Vintage Rolls Royce makes the perfect statement for your Baraat.',
                content: 'Full article content about wedding entrance ideas...',
                cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
                published_at: '2026-01-20',
                tags: ['Wedding', 'Trends'],
                author: 'Event Stylist'
            },
            {
                id: '3',
                slug: 'best-driving-roads-gujarat',
                title: 'Top 3 Scenic Routes for a Weekend Drive from Ahmedabad',
                excerpt: 'Discover the open roads of Polo Forest and Mt. Abu.',
                content: 'Full article content about scenic driving routes...',
                cover_image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
                published_at: '2026-01-25',
                tags: ['Travel', 'Explore'],
                author: 'Road Tripper'
            }
        ] as BlogPost[]
    },

    async getPostBySlug(slug: string) {
        const posts = await this.getPosts()
        return posts.find(p => p.slug === slug) || null
    }
}
