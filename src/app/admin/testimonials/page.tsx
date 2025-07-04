'use client';

import { useState, useEffect } from 'react';
import { RiStarLine, RiEditLine, RiDeleteBinLine, RiAddLine, RiStarFill, RiCheckLine, RiCloseLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';

interface Testimonial {
  id: string;
  rating: number;
  review: string;
  country: string;
  videoUrl?: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
  service: {
    id: string;
    title: string;
    slug: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials');
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, isApproved: boolean) => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, isApproved }),
      });

      if (!response.ok) throw new Error('Failed to update testimonial');
      
      setTestimonials(prev => 
        prev.map(t => t.id === id ? { ...t, isApproved } : t)
      );
      
      toast.success(isApproved ? 'Testimonial approved' : 'Testimonial unapproved');
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast.error('Failed to update testimonial');
    }
  };

  const handleFeature = async (id: string, isFeatured: boolean) => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, isFeatured }),
      });

      if (!response.ok) throw new Error('Failed to update testimonial');
      
      setTestimonials(prev => 
        prev.map(t => t.id === id ? { ...t, isFeatured } : t)
      );
      
      toast.success(isFeatured ? 'Testimonial featured' : 'Testimonial unfeatured');
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast.error('Failed to update testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete testimonial');
      
      setTestimonials(prev => prev.filter(t => t.id !== id));
      toast.success('Testimonial deleted successfully');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      index < rating ? (
        <RiStarFill key={index} className="h-4 w-4 text-yellow-400" />
      ) : (
        <RiStarLine key={index} className="h-4 w-4 text-gray-300" />
      )
    ));
  };

  return (
    <div className="relative space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Testimonials</h1>
        <button className="inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2 rounded-lg shadow hover:bg-amber-600 transition-all text-lg font-semibold">
          <RiAddLine className="h-5 w-5" /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12">
          <RiStarLine className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No testimonials</h3>
          <p className="mt-1 text-sm text-gray-500">No testimonials have been submitted yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`bg-white shadow-lg ring-1 ring-gray-900/5 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-amber-200 transition-shadow ${
                testimonial.isFeatured ? 'ring-2 ring-amber-400' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {testimonial.user?.name || 'Anonymous'}
                    </h3>
                    {testimonial.isFeatured && (
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{testimonial.service.title}</p>
                  <p className="text-xs text-gray-400">{testimonial.country}</p>
                </div>
                
                {/* Status indicators */}
                <div className="flex flex-col items-end gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    testimonial.isApproved ? 'bg-green-400' : 'bg-red-400'
                  }`} title={testimonial.isApproved ? 'Approved' : 'Pending approval'} />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {testimonial.rating}/5
                </span>
              </div>

              {/* Review */}
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                {testimonial.review}
              </p>

              {/* Video indicator */}
              {testimonial.videoUrl && (
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <span>📹</span>
                  <span>Has video</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-400">
                  {new Date(testimonial.createdAt).toLocaleDateString()}
                </div>
                
                <div className="flex items-center gap-1">
                  {/* Approve/Unapprove */}
                  <button
                    onClick={() => handleApprove(testimonial.id, !testimonial.isApproved)}
                    className={`p-2 rounded-full transition-colors ${
                      testimonial.isApproved 
                        ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                        : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                    }`}
                    title={testimonial.isApproved ? 'Unapprove' : 'Approve'}
                  >
                    <RiCheckLine className="h-4 w-4" />
                  </button>

                  {/* Feature/Unfeature */}
                  <button
                    onClick={() => handleFeature(testimonial.id, !testimonial.isFeatured)}
                    className={`p-2 rounded-full transition-colors ${
                      testimonial.isFeatured 
                        ? 'text-amber-600 hover:text-amber-700 hover:bg-amber-50' 
                        : 'text-gray-400 hover:text-amber-600 hover:bg-amber-50'
                    }`}
                    title={testimonial.isFeatured ? 'Unfeature' : 'Feature'}
                  >
                    <RiStarFill className="h-4 w-4" />
                  </button>

                  {/* Edit */}
                  <button
                    className="text-gray-400 hover:text-amber-500 p-2 rounded-full transition-colors"
                    title="Edit testimonial"
                  >
                    <RiEditLine className="h-4 w-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-gray-400 hover:text-red-500 p-2 rounded-full transition-colors"
                    title="Delete testimonial"
                  >
                    <RiDeleteBinLine className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 