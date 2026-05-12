export interface TeamMember {
    slug: string;
    name: string;
    role: string;
    bio: string;
    expertiseTags: string[];
    experience: {
        role: string;
        company: string;
        duration: string;
        description: string[];
    }[];
    qualifications: string[];
    fleetExpertise: string[];
    images: {
        portrait: string;
        gallery: string[];
    };
}

export const teamData: TeamMember[] = [
    {
        slug: "vikram-singh-adani",
        name: "Vikram Singh Adani",
        role: "Chief Executive Officer",
        bio: "Vikram Singh Adani is the founding visionary behind LUXEDIVE, established in 2026 with the ambition to redefine luxury automotive experiences in India. With a strong background in premium brand development and executive leadership within high-end service industries, he leads LUXEDIVE’s strategic growth, elite partnerships, and brand positioning.\n\nHis focus is precision, discretion, and delivering an automotive experience that exceeds traditional luxury standards.",
        expertiseTags: ["Corporate Strategy", "Luxury Retail", "Fleet Acquisition"],
        experience: [
            {
                role: "Founder & Chief Executive Officer",
                company: "LUXEDIVE",
                duration: "Since 2026",
                description: [
                    "Strategic luxury brand development",
                    "Premium client relationship management",
                    "High-value partnership structuring",
                    "Automotive experience curation"
                ]
            },
            {
                role: "Managing Director of Operations",
                company: "Prestige Auto Group",
                duration: "Prior to 2026",
                description: [
                    "Scaled premium vehicle operations across three regional markets",
                    "Engineered white-glove delivery protocols for UHNW individuals",
                    "Oversaw multi-million dollar fleet expansion and maintenance budgets"
                ]
            },
            {
                role: "Head of Luxury Partnerships",
                company: "Echelon Hospitality",
                duration: "Early Career",
                description: [
                    "Cultivated strategic alliances between luxury five-star resorts and automotive brands",
                    "Designed VIP transit experiences that redefined traditional concierge services",
                    "Managed top-tier corporate mobility accounts for executive boards"
                ]
            }
        ],
        qualifications: [
            "Executive Leadership & Luxury Brand Strategy",
            "Business Management & Operational Structuring",
            "Premium Service Experience Design",
            "High-Performance Automotive Market Knowledge"
        ],
        fleetExpertise: [
            "Rolls Royce Phantom & Ghost",
            "Lamborghini Aventador SVJ",
            "Ferrari SF90 Stradale",
            "Mercedes-Maybach S-Class",
            "Porsche 911 Turbo S"
        ],
        images: {
            portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800",
            gallery: [
                "https://images.unsplash.com/photo-1697207566650-aeb52ef9031c?w=600&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1618445902270-40c36803f5b0?w=600&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1675434303097-210c75b61d3f?w=600&auto=format&fit=crop&q=60"
            ]
        }
    },
    {
        slug: "ananya-iyer",
        name: "Ananya Iyer",
        role: "Head of Fleet Operations",
        bio: "Ananya Iyer oversees the operational precision of LUXEDIVE’s elite fleet. As a founding operations leader since 2026, she ensures each vehicle meets uncompromising standards in presentation, mechanical performance, and client readiness.\n\nHer expertise lies in luxury fleet coordination, chauffeur protocol management, and operational excellence in high-value automotive environments.",
        expertiseTags: ["Operations Management", "Vehicle Diagnostics", "Process Optimization"],
        experience: [
            {
                role: "Head of Fleet Operations",
                company: "LUXEDIVE",
                duration: "Since 2026",
                description: [
                    "Luxury vehicle logistics & scheduling",
                    "Chauffeur compliance & background verification",
                    "Quality control inspections",
                    "Event-based fleet deployment"
                ]
            },
            {
                role: "Senior Dispatch Coordinator",
                company: "Global Exotics",
                duration: "Prior to 2026",
                description: [
                    "Coordinated cross-border transport of ultra-luxury and hypercars",
                    "Developed premium client hand-over checklists",
                    "Managed real-time GPS tracking and route optimization"
                ]
            },
            {
                role: "Automotive Quality Assurance Lead",
                company: "Prestige Imports",
                duration: "Prior to Global Exotics",
                description: [
                    "Inspected imported luxury vehicles for cosmetic and mechanical perfection",
                    "Liaised with OEM technicians for specialized and complex repairs",
                    "Maintained stringent quality control metrics before vehicle deployment"
                ]
            }
        ],
        qualifications: [
            "Automotive Operations Management",
            "Premium Hospitality Service Standards",
            "Vehicle Safety & Inspection Protocol",
            "Fleet Performance Coordination"
        ],
        fleetExpertise: [
            "Bentley Flying Spur",
            "Rolls Royce Cullinan",
            "Lamborghini Huracan STO",
            "Porsche Panamera Turbo S",
            "Range Rover Autobiography"
        ],
        images: {
            portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
            gallery: [
                "https://www.carstreetindia.com/carstreet-login/uploads/showroom-gallery/66cc720f6b327_WhatsApp%20Image%202023-06-05%20at%2017.04.00%20(5).webp",
                "https://media.istockphoto.com/id/936987338/photo/man-signing-car-insurance-document-or-lease-paper-writing-signature-on-contract-or-agreement.webp?a=1&b=1&s=612x612&w=0&k=20&c=Cc_p867rzPZr5CnLovzKX_NBuHJLnnDSsvtiL1k85aA=",
                "https://images.unsplash.com/photo-1560264280-88b68371db39?w=600&auto=format&fit=crop&q=60"
            ]
        }
    },
    {
        slug: "rohan-mehta",
        name: "Rohan Mehta",
        role: "Sales Strategist",
        bio: "Rohan Mehta leads LUXEDIVE’s strategic client acquisition and premium sales positioning. As a founding member since 2026, he develops exclusive relationships with high-net-worth clients and corporate partners seeking unparalleled automotive experiences.\n\nHis approach combines luxury hospitality psychology with performance-driven automotive sales strategy.",
        expertiseTags: ["Client Relations", "B2B Sales", "Event Logistics"],
        experience: [
            {
                role: "Sales Strategist",
                company: "LUXEDIVE",
                duration: "Since 2026",
                description: [
                    "High-value client consultation",
                    "Private luxury event coordination",
                    "Corporate mobility partnerships",
                    "Premium membership structuring"
                ]
            },
            {
                role: "Luxury Account Director",
                company: "Elite Concierge Co.",
                duration: "Prior to 2026",
                description: [
                    "Managed a portfolio of UHNW individuals providing travel and lifestyle management",
                    "Negotiated exclusive access to premium events and venues",
                    "Exceeded quarterly luxury sales targets by an average of 14%"
                ]
            },
            {
                role: "VIP Services Manager",
                company: "The Grand Resort",
                duration: "Early Career",
                description: [
                    "Orchestrated seamless arrival and departure experiences for high-profile guests",
                    "Trained front-line staff in elite hospitality protocol",
                    "Developed specialized itineraries for diplomatic and celebrity clientele"
                ]
            }
        ],
        qualifications: [
            "Luxury Sales Strategy",
            "Client Experience Personalization",
            "Premium Negotiation Frameworks",
            "Automotive Brand Positioning"
        ],
        fleetExpertise: [
            "Ferrari 296 GTB",
            "McLaren 720S",
            "Aston Martin DB12",
            "Porsche GT2 RS",
            "Mercedes-AMG GT R"
        ],
        images: {
            portrait: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800",
            gallery: [
                "https://images.unsplash.com/photo-1717251219555-594954907361?w=600&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1717251219558-40dae5f9b195?w=600&auto=format&fit=crop&q=60",
                "https://plus.unsplash.com/premium_photo-1661391553955-0cf4c7ead9c2?w=600&auto=format&fit=crop&q=60"
            ]
        }
    }
];
