"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileText, Beaker, Circle, AlertTriangle, Cpu } from "lucide-react";

const categories = [
  {
    id: "narrative",
    icon: MessageSquare,
    title: "Narrative",
    description: "Classic storytelling with a twist. Whether it's drama, thriller or sci-fi—If it moves us, it belongs here.",
    color: "blue",
    glow: "category-icon-neon-blue"
  },
  {
    id: "documentary",
    icon: FileText,
    title: "Documentary",
    description: "Truth raw and unfiltered. Explore the world, people, and real-life stories through your lens.",
    color: "yellow",
    glow: "category-icon-neon-yellow"
  },
  {
    id: "experimental",
    icon: Beaker,
    title: "Experimental",
    description: "Break the rules. Play with structure, sound, or form. Surprise us with something we didn't expect.",
    color: "purple",
    glow: "category-icon-neon-purple"
  },
  {
    id: "animation",
    icon: Circle,
    title: "Animation",
    description: "From frame-by-frame to CGI wizardry—all animated techniques are welcome. Creativity has no limits.",
    color: "pink",
    glow: "category-icon-neon-pink"
  },
  {
    id: "dystopian",
    icon: AlertTriangle,
    title: "Dystopian Futures",
    description: "Near-future chaos, digital collapse, or quiet decline—show us the world when systems fail.",
    color: "red",
    glow: "category-icon-neon-red"
  },
  {
    id: "ai-identity",
    icon: Cpu,
    title: "AI & Identity",
    description: "What happens when machines dream, or when we become them? Stories about consciousness, code, and humanity.",
    color: "green",
    glow: "category-icon-neon-green"
  }
];

export default function CategoryOverview() {
  const { t } = useLanguage();

  return (
    <div className="py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-bold mb-8 quantum-text-glow text-white">
            Film Categories
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`p-4 rounded-full border border-${category.color}-500/30 ${category.glow}`}>
                      <IconComponent className={`w-8 h-8 text-${category.color}-400`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {category.title}
                    </h3>
                    <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={`text-${category.color}-300 hover:text-${category.color}-200 font-medium`}
                    >
                      SEE CHALLENGE DETAILS
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add wavy pattern CSS
const wavyPattern = `
  .wavy-pattern {
    background: 
      radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
      linear-gradient(45deg, transparent 30%, rgba(120, 219, 255, 0.05) 50%, transparent 70%);
    background-size: 100px 100px, 150px 150px, 200px 200px;
  }
`;
