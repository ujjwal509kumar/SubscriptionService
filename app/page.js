'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import Image from 'next/image';

export default function Home() {
    const router = useRouter();

    const handleExploreBlogs = () => {
        router.push('/pages/exploreblogs');
    };

    return (
        <main className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <section className="flex-grow bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-screen-xl">
                    <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between">
                        <div className="lg:w-1/2 text-center lg:text-left lg:pr-8 mb-8 lg:mb-0">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                                Discover the Best Blogs for You
                                <br />
                                Explore Now!
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Dive into our curated collection of insightful blogs on a variety of topics. Stay informed and inspired with the latest trends and knowledge.
                            </p>
                            <Button
                                onClick={handleExploreBlogs}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                            >
                                Explore Blogs
                            </Button>
                        </div>

                        {/* Image Section */}
                        <div className="lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0">
                            <Card className="w-full max-w-md rounded-lg shadow-lg overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1657639028182-24e11504c7c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    width={800}
                                    height={600}
                                    alt="Inspiring Blog"
                                    className="object-cover w-full h-full"
                                />
                            </Card>
                        </div>
                    </div>

                    {/* Subscription Accordion Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
                            Why Subscribe to Us?
                        </h2>
                        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-md text-gray-800 font-semibold hover:bg-gray-200 transition">
                                    <span>Exclusive Content</span>
                                </AccordionTrigger>
                                <AccordionContent className="p-4 text-gray-700">
                                    Access articles and insights not available to the general public. Enjoy content designed to deepen your understanding of various topics.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-md text-gray-800 font-semibold hover:bg-gray-200 transition">
                                    <span>Ad-Free Experience</span>
                                </AccordionTrigger>
                                <AccordionContent className="p-4 text-gray-700">
                                    Enjoy an ad-free experience, allowing you to focus entirely on the content without interruptions.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-md text-gray-800 font-semibold hover:bg-gray-200 transition">
                                    <span>Monthly Newsletters</span>
                                </AccordionTrigger>
                                <AccordionContent className="p-4 text-gray-700">
                                    Receive monthly newsletters featuring top content, trending topics, and exclusive insights delivered directly to your inbox.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
