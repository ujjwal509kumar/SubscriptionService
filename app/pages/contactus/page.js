'use client';
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900">We are here for you</h2>
            <p className="mt-4 text-lg text-gray-600">
              We can help. Our team of experts is on hand to answer your questions.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Google Map Embed */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22036.856482962903!2d77.48426043894004!3d12.916844800614276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f1e2d2b1ff3%3A0x2e0fa12643b34936!2sMailasandra%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1704266888459!5m2!1sen!2sin"
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Details */}
            <Card className="shadow-xl rounded-lg">
              <CardHeader className="bg-white text-center py-6">
                <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">Our Address</h4>
                  <p className="mt-2 text-gray-700">Global Village, Mailasandra, Bangalore</p>
                </div>
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">Hours</h4>
                  <p className="mt-2 text-gray-700">Monday - Friday: 9am - 5pm</p>
                  <p className="mt-2 text-gray-700">Saturday: 10am - 4pm</p>
                  <p className="mt-2 text-gray-700">Sunday: Closed</p>
                </div>
                <div className="pb-6">
                  <h4 className="text-lg font-semibold text-gray-900">Contact</h4>
                  <p className="mt-2 text-gray-700">Dev1 Email: <a href="mailto:ujjwal509kumar@gmail.com" className="text-indigo-600 underline">Click here</a></p>
                  <p className="mt-2 text-gray-700">Dev2 Email: <a href="mailto:lokeshlokey32@gmail.com" className="text-indigo-600 underline">Click here</a></p>
                  <p className="mt-2 text-gray-700">Phone: <a href="tel:+12345678901" className="text-indigo-600 underline">+1 23456 78901</a></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
