"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import { towersData, getFloorsForTower, Tower, Floor } from "@/data/dummyData";
import { Building, ChevronLeft, PencilRuler, Users } from "lucide-react";

const TowerDetailsPage = () => {
  const params = useParams();
  const { back } = useRouter();
  const { name: encodedName } = params as { name: string };
  const name = decodeURIComponent(encodedName);

  const tower: Tower = towersData.find((t: Tower) => t.name === name) || {
    id: 0,
    name: name,
    height: "",
    color: "",
    floors: 0,
    apartments: 0,
    occupancy: "",
  };
  const floors: Floor[] = getFloorsForTower(tower.id);

  return (
    <div
      className="container mx-auto p-8"
      style={{ color: "var(--foreground)" }}
    >
       <div className="w-full max-w-5xl mb-6">
       
       <button
         className="px-3 py-2 rounded-lg cursor-pointer flex items-center gap-2 font-semibold shadow border transition hover:scale-105 hover:shadow-lg"
         style={{
           background: "var(--color-primary)",
           color: "var(--color-secondary)",
           borderColor: "var(--color-secondary)",
           borderWidth: "2px",
         }}
         onClick={() => back()}
       >
         <ChevronLeft/>
         Back
       </button>
   </div>
      <PageTitle title={tower.name} />

      <div className="grid grid-cols-1 gap-8 mt-4">
        {floors.map((floor, index) => (
          <Link
            key={floor.id}
            href={`/towers/${encodeURIComponent(name)}/${floor.id}`}
            className="block group"
          >
            <motion.div
              className="rounded-xl shadow-xl bg-[#bd98821a] border border-[var(--color-primary)] transition-all duration-300 group-hover:bg-[#130f0c] group-hover:scale-105 group-hover:shadow-2xl cursor-pointer"
              style={{
                color: "var(--color-foreground)",
                padding: "2rem",
                boxShadow: "0 6px 32px 0 rgba(189,152,130,0.08)",
                backdropFilter: "blur(8px)",
                minHeight: "170px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
            >
              {/* Floor number badge */}
              <div className="absolute top-4 right-4 text-xs font-mono text-[var(--color-primary)] opacity-60">
                #{floor.number}
              </div>

              {/* Main content grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center w-full">
                {/* Floor Number - Large display */}
                <div className="flex flex-col items-center justify-center md:col-span-1">
                  <div className="flex items-baseline">
                    <span
                      className="text-6xl font-bold tracking-wide"
                      style={{ color: "#fff" }}
                    >
                      {floor.number}
                    </span>
                  </div>
                  <span className="text-lg text-primary font-medium mt-1">
                    Floor
                  </span>
                </div>

                {/* Apartments */}
                <div className="flex flex-col items-center justify-center gap-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <Building size={24} className="text-[var(--color-primary)]" />
                    <span
                      className=" md:text-2xl font-semibold"
                      style={{ color: "#fff" }}
                    >
                      {floor.apartments}
                    </span>
                  </div>
                  {/* <span className="text-sm text-gray-400 font-medium">
                    Apartments
                  </span> */}
                </div>

                {/* Occupancy */}
                <div className="flex flex-col items-center justify-center gap-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <Users size={24} className="text-[var(--color-primary)]" />
                    <span
                      className=" md:text-2xl font-semibold"
                      style={{ color: "#fff" }}
                    >
                      {floor.occupancy}
                    </span>
                  </div>
                  {/* <span className="text-sm text-gray-400 font-medium">
                    Occupancy
                  </span> */}
                </div>

                {/* Dimensions */}
                <div className="flex flex-col items-center justify-center gap-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <PencilRuler size={24} className="text-[var(--color-primary)]" />
                    <span
                      className=" md:text-2xl font-semibold"
                      style={{ color: "#fff" }}
                    >
                      {floor.height}
                    </span>
                  </div>
                  {/* <span className="text-sm text-gray-400 font-medium">
                    Height
                  </span> */}
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TowerDetailsPage;