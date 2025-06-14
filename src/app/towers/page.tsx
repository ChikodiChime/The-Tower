"use client";
import PageTitle from "@/components/PageTitle";
import Towers from "@/components/Towers";
import { Building2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function TowersPage() {
  return (
    <main className="flex flex-col py-16 px-6 md:px-12 lg:px-24 justify-center w-full max-w-screen-xl mx-auto gap-12">
      {/* Page Heading */}
      <div className="text-center space-y-2">
        <PageTitle title="The Towers" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto"
        >
          Select a tower to view its floors, layouts, and unique apartment
          plans. Each tower offers a variety of spacious, modern units designed
          for comfort.
        </motion.p>
      </div>

      {/* Towers Display */}
      <div className="w-full">
        <Towers />
      </div>

      <div className="bg-white/5 relative backdrop-blur-sm mt-40 rounded-xl p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Why choose The Towers?
          </h3>
          <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground leading-relaxed">
            <li>Modern architectural design with smart layouts</li>
            <li>Spacious units with natural light on every floor</li>
            <li>Balconies and shared amenities in every tower</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl md:absolute bottom-0 right-10 overflow-hidden shadow-md"
        >
        
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="250"
              height="250"
              viewBox="0 0 24 24"
              >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              color="currentColor"
            >
              <path d="m9 19l3-4l3 4m-6-5h6M2 22v-8c0-.943 0-1.414.293-1.707S3.057 12 4 12h3c.943 0 1.414 0 1.707.293S9 13.057 9 14v8M3 12v-2c0-.943 0-1.414.293-1.707S4.057 8 5 8h1c.943 0 1.414 0 1.707.293S8 9.057 8 10v2" />
              <path d="M4 8V5.5c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C4.801 4 5.034 4 5.5 4s.699 0 .883.076a1 1 0 0 1 .54.541C7 4.801 7 5.034 7 5.5V8m8 14v-8c0-.943 0-1.414.293-1.707S16.057 12 17 12h3c.943 0 1.414 0 1.707.293S22 13.057 22 14v8M2 22h20M5.5 4V2M16 12v-2c0-.943 0-1.414.293-1.707S17.057 8 18 8h1c.943 0 1.414 0 1.707.293S21 9.057 21 10v2" />
              <path d="M17 8V5.5c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C17.801 4 18.034 4 18.5 4s.699 0 .883.076a1 1 0 0 1 .54.541c.077.184.077.417.077.883V8m-1.5-4V2m-13 20v-2m13 2v-2" />
            </g>
          </svg>
        </motion.div>
      </div>
    </main>
  );
}
