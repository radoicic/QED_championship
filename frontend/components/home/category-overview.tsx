"use client";

import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  FileText,
  Beaker,
  Circle,
  AlertTriangle,
  Cpu,
  Info,
} from "lucide-react";

const categories = [
  {
    id: "narrative",
    icon: MessageSquare,
    title: "Narrative",
    description:
      "Classic storytelling with a twist. Whether it's drama, thriller or sci-fi—If it moves us, it belongs here.",
    color: "blue",
    glow: "shadow-[0_0_20px_#3b82f6] shadow-[0_0_40px_#3b82f6]",
  },
  {
    id: "documentary",
    icon: FileText,
    title: "Documentary",
    description:
      "Truth raw and unfiltered. Explore the world, people, and real-life stories through your lens.",
    color: "yellow",
    glow: "shadow-[0_0_20px_#f59e0b] shadow-[0_0_40px_#f59e0b]",
  },
  {
    id: "experimental",
    icon: Beaker,
    title: "Experimental",
    description:
      "Break the rules. Play with structure, sound, or form. Surprise us with something we didn't expect.",
    color: "purple",
    glow: "shadow-[0_0_20px_#8b5cf6] shadow-[0_0_40px_#8b5cf6]",
  },
  {
    id: "animation",
    icon: Circle,
    title: "Animation",
    description:
      "From frame-by-frame to CGI wizardry—all animated techniques are welcome. Creativity has no limits.",
    color: "pink",
    glow: "shadow-[0_0_20px_#ec4899] shadow-[0_0_40px_#ec4899]",
  },
  {
    id: "dystopian",
    icon: AlertTriangle,
    title: "Dystopian Futures",
    description:
      "Near-future chaos, digital collapse, or quiet decline—show us the world when systems fail.",
    color: "red",
    glow: "shadow-[0_0_20px_#dc2626] shadow-[0_0_40px_#dc2626]",
  },
  {
    id: "ai-identity",
    icon: Cpu,
    title: "AI & Identity",
    description:
      "What happens when machines dream, or when we become them? Stories about consciousness, code, and humanity.",
    color: "green",
    glow: "shadow-[0_0_20px_#10b981] shadow-[0_0_40px_#10b981]",
  },
];

export default function CategoryOverview() {
  return (
    <div className="py-8 bg-[#0f0f1b] wavy-pattern">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-[0_0_25px_#6ee7b7]">
            Film Categories
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map(({ id, icon: Icon, title, description, color, glow }) => (
              <div
                key={id}
                className="bg-[#1c1c2e] rounded-xl p-6 border border-gray-800 transition duration-300 hover:scale-105"
              >
                <div className={`mb-5 text-${color}-400`}>
                  <Icon className={`w-10 h-10 ${glow}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
                <p className="text-slate-300 mb-5 text-sm leading-relaxed">{description}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-${color}-300 hover:text-${color}-100 font-medium flex items-center gap-2`}
                >
                  SEE CHALLENGE DETAILS
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
