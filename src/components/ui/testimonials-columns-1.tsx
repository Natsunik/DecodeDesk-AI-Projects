"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-black"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-6 rounded-2xl border border-gray-600/50 bg-gray-900/90 backdrop-blur-sm shadow-lg shadow-purple-500/10 max-w-xs w-full hover:border-purple-500/50 transition-colors" key={i}>
                  <div className="text-white/90 text-sm leading-relaxed mb-4">{text}</div>
                  <div className="flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover border-2 border-purple-500/30"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-white">{name}</div>
                      <div className="leading-5 opacity-70 tracking-tight text-white/70 text-sm">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "DecodeDesk helped me understand what my GenZ team actually means in meetings! No more awkward 'what does that mean?' moments.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Chen",
    role: "Product Manager",
  },
  {
    text: "I created 3 viral TikToks using DecodeDesk's word generator! My followers love the new corporate buzzwords I invented.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Mike Rodriguez",
    role: "Content Creator",
  },
  {
    text: "Perfect for bridging the gap between our corporate clients and GenZ audience. Our campaigns are finally hitting the mark!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Jessica Park",
    role: "Marketing Director",
  },
  {
    text: "Finally, a tool that translates corporate speak into real talk! My team meetings are so much more productive now.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "David Kim",
    role: "Engineering Manager",
  },
  {
    text: "DecodeDesk's GenZ translation feature saved my presentation! Now I can communicate with every generation in the room.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Emily Watson",
    role: "Sales Director",
  },
  {
    text: "The word creation feature is genius! I've generated buzzwords that actually make sense and my team loves using them.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Alex Thompson",
    role: "Startup Founder",
  },
  {
    text: "As a GenZ employee, DecodeDesk helps me translate my ideas into corporate language that executives understand.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Zoe Martinez",
    role: "Junior Developer",
  },
  {
    text: "This tool revolutionized our internal communications. No more confusion between departments with different communication styles.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    name: "James Wilson",
    role: "Operations Director",
  },
  {
    text: "DecodeDesk made our cross-generational team collaboration seamless. Everyone finally speaks the same language!",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    name: "Lisa Chang",
    role: "HR Manager",
  },
];

export { testimonials };