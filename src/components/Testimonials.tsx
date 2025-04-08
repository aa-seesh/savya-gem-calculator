
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    title: "Loyal Customer",
    content: "The dynamic pricing system at Savya Jewellery gives me confidence that I'm paying a fair price based on actual material value. The transparency is refreshing.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    title: "First-time Buyer",
    content: "I was initially skeptical about the pricing model, but the detailed breakdown convinced me. I appreciate knowing exactly what I'm paying for.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Meera Patel",
    title: "Wedding Collection Customer",
    content: "We purchased our wedding jewelry from Savya and were impressed by the craftsmanship and fair pricing. The ability to see the making charge separately was very helpful.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-12 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-navy-dark mb-2">
            Customer Experiences
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear what our customers have to say about their jewelry and shopping experience with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-navy-dark">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? "text-gold fill-gold" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
