import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial, index = 0 }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="card p-6">
      <div className="flex items-start gap-4 mb-4">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1">
          <h4 className="text-white font-medium">{testimonial.name}</h4>
          <p className="text-white/50 text-sm">{testimonial.location}</p>
        </div>
        <Quote size={24} className="text-primary-500/30" />
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className={i < testimonial.rating ? 'text-primary-400 fill-primary-400' : 'text-white/20'} />
        ))}
      </div>
      <p className="text-white/70 text-sm leading-relaxed mb-4">"{testimonial.text}"</p>
      <p className="text-white/40 text-xs">Attended: {testimonial.event}</p>
    </motion.div>
  );
};

export default TestimonialCard;
