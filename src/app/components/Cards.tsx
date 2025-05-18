'use client';
import { motion } from "motion/react";

const Cards = () => {
  const cards = [
    {
      title: 'JavaScript Utilities Collection',
      category: 'Libraries',
      describe:
        'A hand-picked collection of must-use JavaScript utility libraries like Lodash, Day.js, and Zod. Save time writing boilerplate code and focus on building.',
      tags: ['JavaScript', 'Productivity', 'Libraries'],
      image: 'https://images.unsplash.com/photo-1636384960943-b50b6384ebb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJsYWNrJTIwYW5kJTIwYmx1ZSUyMHRlY2h8ZW58MHx8MHx8fDA%3D',
    },
    {
      title: 'Free Public APIs for Developers',
      category: 'APIs',
      describe:
        'Explore a curated list of free public APIs — from weather data to AI tools. Instantly usable for your side projects, dashboards, or portfolio builds.',
      tags: ['APIs', 'Free', 'Data'],
      image: 'https://images.unsplash.com/photo-1683755300283-a07a69ae26f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJsYWNrJTIwYW5kJTIwYmx1ZSUyMHRlY2h8ZW58MHx8MHx8fDA%3D',
    },
    {
      title: 'Dev-Ready Boilerplates & Starter Kits',
      category: 'Templates',
      describe:
        'Get a jumpstart with battle-tested starter kits for React, Next.js, Node.js, and more. Perfect for building apps faster without starting from scratch.',
      tags: ['Starter', 'Templates', 'Fullstack'],
      image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34',
    },
    {
      title: 'UI/UX Resources & Design Tools',
      category: 'Tools',
      describe:
        'Browse essential tools like Figma plugins, color palette generators, icon packs, and Tailwind CSS kits — everything to level up your design game as a dev.',
      tags: ['UI/UX', 'Frontend', 'Design'],
      image: 'https://images.unsplash.com/photo-1692125440608-4364afbf849b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGJsYWNrJTIwYW5kJTIwYmx1ZSUyMHRlY2h8ZW58MHx8MHx8fDA%3D',
    },
   
  ];

  return (
    <div className="w-full mt-20 px-4 overflow-hidden mask-x-from-70% mask-x-to-100%">
      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((card, index) => (
          <motion.div
                key={index}
            className="relative w-[320px] h-[360px] rounded-2xl overflow-hidden  border border-[#1f1f1f] transition-shadow "
          >
            {/* Background image */}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover absolute inset-0 z-0"
            />

            {/* Overlay content */}
            <div className="absolute bottom-0 z-10 bg-black/80 backdrop-blur-md w-full p-4 text-white">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-sm text-[#00AEEF] font-medium">{card.category}</p>
              <p className="text-xs mt-2 text-gray-200">{card.describe}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#0251EF] px-2 py-1 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
