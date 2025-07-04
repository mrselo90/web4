'use client';

import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const offices = [
  {
    city: 'Istanbul',
    address: ['Veliefendi, Prof. Dr. Turan Güneş Cd. No:103 Zeytinburnu/Istanbul'],
    phone: '+90 544 474 98 81',
    email: 'info@volahealthistanbul.com',
  },
];

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    treatment: 'dental',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        treatment: 'dental',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </button>
            
            <h1 className="text-lg font-semibold text-gray-900">Contact Us</h1>
            
            <button
              onClick={() => router.push('/')}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
              aria-label="Close and go to home"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative isolate bg-gradient-to-b from-primary-100/20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-8">
          <div className="relative px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-24 lg:static lg:px-8 lg:py-32">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Contact Vola Health Istanbul</h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
                We're here to help you start your medical tourism journey. Contact us for a free consultation or to learn more about our services.
              </p>
              <dl className="mt-8 sm:mt-10 space-y-6 sm:space-y-8 text-base leading-7 text-gray-600">
                {offices.map((office) => (
                  <div key={office.city} className="mt-6 first:mt-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{office.city} Office</h2>
                    <div className="mt-2 sm:mt-3 space-y-1">
                      {office.address.map((line) => (
                        <p key={line} className="text-sm sm:text-base">{line}</p>
                      ))}
                    </div>
                    <div className="mt-4 sm:mt-6">
                      <a
                        href={`tel:${office.phone}`}
                        className="flex items-center gap-x-2 text-primary hover:text-primary-600 text-sm sm:text-base"
                      >
                        <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        {office.phone}
                      </a>
                      <a
                        href={`mailto:${office.email}`}
                        className="mt-2 flex items-center gap-x-2 text-primary hover:text-primary-600 text-sm sm:text-base"
                      >
                        <EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        {office.email}
                      </a>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              {status === 'success' && (
                <div className="mb-6 rounded-md bg-green-50 p-3 sm:p-4">
                  <div className="flex flex-col">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs sm:text-sm font-medium text-green-800">
                          Thank you! Your consultation request has been received. We'll contact you soon.
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => router.push('/contact/success')}
                        className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-500"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 rounded-md bg-red-50 p-3 sm:p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs sm:text-sm font-medium text-red-800">
                        {errorMessage || 'Something went wrong. Please try again.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-x-4 sm:gap-x-8 gap-y-4 sm:gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-xs sm:text-sm font-semibold leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2 sm:mt-2.5">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3 sm:px-3.5 py-1.5 sm:py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs sm:text-sm font-semibold leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2 sm:mt-2.5">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3 sm:px-3.5 py-1.5 sm:py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-xs sm:text-sm font-semibold leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2 sm:mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3 sm:px-3.5 py-1.5 sm:py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold leading-6 text-gray-900">
                    Phone number
                  </label>
                  <div className="mt-2 sm:mt-2.5">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3 sm:px-3.5 py-1.5 sm:py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="treatment" className="block text-xs sm:text-sm font-semibold leading-6 text-gray-900">
                    Interested in
                  </label>
                  <div className="mt-2 sm:mt-2.5">
                    <select
                      id="treatment"
                      name="treatment"
                      required
                      value={formData.treatment}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3 sm:px-3.5 py-1.5 sm:py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:text-base"
                    >
                      <option value="dental">Dental Services</option>
                      <option value="facial">Facial Services</option>
                      <option value="body">Body Services</option>
                      <option value="other">Other Services</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-xs sm:text-sm font-semibold leading-6 text-gray-900">
                    Message
                  </label>
                  <div className="mt-2 sm:mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3 sm:px-3.5 py-1.5 sm:py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full sm:w-auto rounded-md bg-primary px-3 sm:px-3.5 py-2 sm:py-2.5 text-center text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    status === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Map section */}
      <div className="relative h-64 sm:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.8674977588477!2d29.0054!3d41.0748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzI5LjMiTiAyOcKwMDAnMTkuNCJF!5e0!3m2!1sen!2str!4v1625136234567!5m2!1sen!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>
    </div>
  );
} 