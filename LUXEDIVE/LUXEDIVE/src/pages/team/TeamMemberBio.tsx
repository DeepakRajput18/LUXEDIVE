import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { teamData } from '../../data/teamData';
import type { TeamMember } from '../../data/teamData';
import { ArrowLeft, Briefcase, Award, Car } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function TeamMemberBio() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [member, setMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        const foundMember = teamData.find(m => m.slug === slug);
        if (foundMember) {
            setMember(foundMember);
        } else {
            // Optional: redirect to About or show not found state
            // navigate('/about', { replace: true });
        }
    }, [slug, navigate]);

    if (!member) {
        return (
            <div className="min-h-screen bg-[#0b0d10] text-white flex flex-col items-center justify-center font-sans">
                <h2 className="text-3xl font-serif text-white mb-4">Team Member Not Found</h2>
                <Link to="/about" className="text-luxe-gold hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
                    Returns to About
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0b0d10] text-white font-sans overflow-x-hidden pt-24 pb-16">
            <Helmet>
                <title>{member.name} - LUXEDIVE</title>
            </Helmet>

            <div className="container mx-auto px-6 lg:px-12 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-luxe-gray hover:text-luxe-gold transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
            </div>

            {/* 1. Hero Section */}
            <section className="container mx-auto px-6 lg:px-12 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
                    <div className="w-full lg:w-5/12">
                        <div className="aspect-[3/4] relative overflow-hidden rounded-sm border border-white/5">
                            <img
                                src={member.images.portrait}
                                alt={member.name}
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-7/12">
                        <div className="mb-6">
                            <h1 className="text-5xl lg:text-7xl font-serif text-white mb-2">{member.name}</h1>
                            <p className="text-luxe-gold text-sm font-bold uppercase tracking-[0.2em]">{member.role}</p>
                        </div>

                        <p className="text-luxe-gray text-lg font-light leading-relaxed max-w-2xl mb-8 whitespace-pre-line">
                            {member.bio}
                        </p>

                        <div>
                            <p className="text-white text-xs font-bold tracking-widest uppercase mb-3">Expertise</p>
                            <div className="flex flex-wrap gap-2">
                                {member.expertiseTags.map((tag, idx) => (
                                    <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-white/80 tracking-wide">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* 2. Experience Section */}
                    <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        <div className="flex items-center gap-3 mb-10">
                            <Briefcase className="w-5 h-5 text-luxe-gold" />
                            <h2 className="text-2xl font-serif text-white">Professional Experience</h2>
                        </div>

                        <div className="space-y-10 pl-4 border-l border-white/10 ml-2">
                            {member.experience.map((exp, idx) => (
                                <div key={idx} className="relative pl-6">
                                    <div className="absolute w-2 h-2 bg-luxe-gold rounded-full -left-[5px] top-1.5 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                                    <div className="text-xs font-bold text-luxe-gold tracking-widest uppercase mb-1">{exp.duration}</div>
                                    <h3 className="text-lg font-medium text-white mb-1">{exp.role}</h3>
                                    <p className="text-sm text-luxe-gray font-light uppercase tracking-wide mb-3">{exp.company}</p>
                                    <ul className="text-sm text-gray-400 leading-relaxed font-light list-disc pl-4 space-y-1.5">
                                        {exp.description.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="space-y-20">
                        {/* 3. Qualifications Section */}
                        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                            <div className="flex items-center gap-3 mb-8">
                                <Award className="w-5 h-5 text-luxe-gold" />
                                <h2 className="text-2xl font-serif text-white">Qualifications & Certifications</h2>
                            </div>

                            <ul className="space-y-4">
                                {member.qualifications.map((qual, idx) => (
                                    <li key={idx} className="flex gap-4 items-start bg-white/5 border border-white/5 p-4 rounded-sm">
                                        <div className="w-1.5 h-1.5 bg-luxe-gold mt-2 rounded-full shrink-0"></div>
                                        <p className="text-luxe-gray font-light">{qual}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* 4. Fleet Expertise Section */}
                        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                            <div className="flex items-center gap-3 mb-8">
                                <Car className="w-5 h-5 text-luxe-gold" />
                                <h2 className="text-2xl font-serif text-white">Specialized Fleet Experience</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {member.fleetExpertise.map((fleet, idx) => (
                                    <div key={idx} className="bg-[#121212] border border-white/10 p-4 rounded-sm hover:border-luxe-gold/50 transition-colors">
                                        <p className="text-sm font-medium text-white">{fleet}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* 5. Gallery Section */}
            {member.images.gallery && member.images.gallery.length > 0 && (
                <section className="container mx-auto px-6 lg:px-12 mt-32 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                    <div className="text-center mb-16">
                        <p className="text-luxe-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Behind the Scenes</p>
                        <h2 className="text-3xl lg:text-4xl font-serif text-white">Moments at LUXEDIVE</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {member.images.gallery.map((imgSrc, idx) => (
                            <div key={idx} className="aspect-[4/5] md:aspect-square relative overflow-hidden rounded-sm group">
                                <img
                                    src={imgSrc}
                                    alt={`Gallery image ${idx + 1}`}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

        </div>
    );
}
