'use client';
import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <section className="text-gray-700 body-font flex-grow py-12">
        <div className="container px-5 mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            Meet Our Team
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="shadow-xl rounded-lg bg-white">
              <CardHeader className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image 
                    src={'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'} 
                    width={800} 
                    height={600} 
                    alt="Ujjwal Kumar" 
                    className="rounded-full" 
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">UJJWAL KUMAR</h2>
                <div className="w-16 h-1 bg-indigo-500 rounded mx-auto mt-2 mb-4"></div>
              </CardHeader>
              
              <div className="p-6 text-center">
                <p className="text-base text-gray-700">
                  Software Developer | React.js | Next.js | Node.js | MongoDB | Cybersecurity & ML enthusiast
                </p>
              </div>
              
              <CardFooter className="text-center py-4">
                <p className="text-sm text-gray-500">
                  &quot;Motivated and talented college fresher seeking a challenging role in IT.&quot;
                </p>
              </CardFooter>
            </Card>

            <Card className="shadow-xl rounded-lg bg-white">
              <CardHeader className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image 
                    src={'https://img.freepik.com/free-vector/purple-man-with-blue-hair_24877-82003.jpg'} 
                    width={800} 
                    height={600} 
                    alt="Lokesh S" 
                    className="rounded-full" 
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">LOKESH S</h2>
                <div className="w-16 h-1 bg-indigo-500 rounded mx-auto mt-2 mb-4"></div>
              </CardHeader>
              
              <div className="p-6 text-center">
                <p className="text-base text-gray-700">
                  Full Stack Developer | Python | Django | Cloud Enthusiast | AI/ML Researcher
                </p>
              </div>
              
              <CardFooter className="text-center py-4">
                <p className="text-sm text-gray-500">
                  &quot;Passionate about building scalable applications and exploring new technologies.&quot;
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
