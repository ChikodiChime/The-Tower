"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { layouts, Layout } from "@/data/dummyData";
import LayoutFilter from "@/components/LayoutFilter";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import { Bath, BedDouble, ChevronLeft, PencilRuler } from "lucide-react";

export default function FloorLayoutsPage() {
  const params = useParams();
  const { back } = useRouter();
  const { name, floor } = params;
  let floorNumber: string | undefined = undefined;
  if (typeof floor === "string") {
    floorNumber = floor.replace("floor-", ""); // "4"
  } else if (Array.isArray(floor)) {
    // If floor is an array, use the first item or join as needed
    floorNumber = floor[0]?.replace("floor-", "");
  }

  // Filter state
  const [roomFilter, setRoomFilter] = useState("");
  const [bathFilter, setBathFilter] = useState("");
  const [dimRange, setDimRange] = useState<[number, number]>([45, 500]);
  const [balconyFilter, setBalconyFilter] = useState("");

  // Filtering logic
  const filteredLayouts = layouts.filter((layout) => {
    const matchesRoom = roomFilter
      ? layout.roomCount === Number(roomFilter)
      : true;
    const matchesBath = bathFilter
      ? layout.bathCount === Number(bathFilter)
      : true;
    // Parse area as number (e.g. '120 sqm' -> 120)
    const areaNum = parseInt((layout.area || "").replace(/[^\d]/g, ""), 10);
    const matchesDim = areaNum >= dimRange[0] && areaNum <= dimRange[1];
    // Balcony logic: undefined means 'no', true means 'yes', false means 'no'
    let matchesBalcony = true;
    if (balconyFilter === "yes") {
      matchesBalcony = layout.balcony === true;
    } else if (balconyFilter === "no") {
      matchesBalcony = layout.balcony !== true;
    }
    return matchesRoom && matchesBath && matchesDim && matchesBalcony;
  });

  return (
    <div
      className="container mx-auto p-8"
      style={{ color: "var(--foreground)" }}
    >
      <div className="w-full max-w-5xl mb-6">
        <button
          className="px-3 py-2 rounded-lg flex cursor-pointer items-center gap-2 font-semibold shadow border transition hover:scale-105 hover:shadow-lg"
          style={{
            background: "var(--color-primary)",
            color: "var(--color-secondary)",
            borderColor: "var(--color-secondary)",
            borderWidth: "2px",
          }}
          onClick={() => back()}
        >
          <ChevronLeft />
          Back
        </button>
      </div>

      <PageTitle title={`Floor ${floorNumber}`} />

      <div
        className="lg:sticky top-0 z-30 mt-4"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <LayoutFilter
          roomFilter={roomFilter}
          setRoomFilter={setRoomFilter}
          bathFilter={bathFilter}
          setBathFilter={setBathFilter}
          dimRange={dimRange}
          setDimRange={setDimRange}
          balconyFilter={balconyFilter}
          setBalconyFilter={setBalconyFilter}
          layouts={layouts}
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filteredLayouts.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
            <svg
              width="56"
              height="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="mb-4 opacity-40"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" />
            </svg>
            <div className="text-lg font-semibold mb-2">
              No layouts match your filters
            </div>
            <div className="text-sm">
              Try adjusting your filters or reset them to see all available
              layouts.
            </div>
          </div>
        ) : (
          filteredLayouts.map((layout: Layout, index: number) => {
            const layoutId = layout.id.replace("unit-", "");
            return (
              <Link
                key={layout.id}
                href={`/towers/${name}/${floor}/${layout.id}`}
                className="block group"
              >
                <div
                  className="rounded-xl shadow-xl bg-[#bd98821a] border border-[var(--color-primary)] transition-all duration-300 group-hover:bg-[#130f0c]  group-hover:shadow-2xl cursor-pointer"
                  style={{
                    color: "var(--color-foreground)",
                    padding: "2rem",
                    boxShadow: "0 6px 32px 0 rgba(189,152,130,0.08)",
                    backdropFilter: "blur(8px)",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Unit ID badge */}
                  <div className="absolute top-4 right-4 text-xs font-mono text-white opacity-60">
                    #{layoutId}
                  </div>

                  {/* Main content grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 items-center w-full">
                    {/* Unit Number - Large display */}
                    <div className="flex flex-col items-center justify-center lg:col-span-1">
                      <span className="text-6xl font-bold tracking-wide text-white">
                        {layoutId}
                      </span>
                      <span className="text-sm text-gray-400 font-medium mt-1">
                        Unit
                      </span>
                    </div>

                    {/* Layout Image */}
                    <div className="flex justify-center items-center lg:col-span-1">
                      <img
                        src={layout.layout}
                        alt={layout.name}
                        className="rounded-lg shadow-md border border-gray-600 layout-thumbnail"
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="flex flex-col items-center justify-center lg:col-span-1">
                      <div className="flex items-center gap-3">
                        <span className="md:text-2xl font-semibold text-white">
                          {layout.unitType ?? "--"}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">
                        Apartment
                      </span>
                    </div>

                    {/* Bedrooms */}
                    <div className="flex flex-col items-center justify-center lg:col-span-1">
                      <div className="flex items-center gap-3">
                        <BedDouble
                          size={24}
                          className="text-[var(--color-primary)]"
                        />
                        <span className="md:text-2xl font-semibold text-white">
                          {layout.roomCount}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">
                        Bedrooms
                      </span>
                    </div>

                   

                    {/* Area */}
                    <div className="flex flex-col items-center justify-center lg:col-span-1">
                      <div className="flex items-center gap-3">
                        <PencilRuler
                          size={24}
                          className="text-[var(--color-primary)]"
                        />
                        <span className="md:text-2xl font-semibold text-white">
                          {layout.area}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">
                        Area
                      </span>
                    </div>

                    {/* Balcony */}
                    <div className="flex flex-col items-center justify-center lg:col-span-1">
                      {layout.balcony === true ? (
                        <>
                          <div className="flex items-center gap-3">
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              className="text-[var(--color-primary)]"
                            >
                              <rect x="5" y="10" width="14" height="7" rx="2" />
                              <path d="M3 17V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10" />
                            </svg>
                            <span className="md:text-2xl font-semibold text-green-400">
                              ✓
                            </span>
                          </div>
                          <span className="text-sm text-gray-400 font-medium">
                            Balcony
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              className="text-gray-500"
                            >
                              <rect x="5" y="10" width="14" height="7" rx="2" />
                              <path d="M3 17V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10" />
                            </svg>
                            <span className="md:text-2xl font-semibold text-gray-500">
                              ✗
                            </span>
                          </div>
                          <span className="text-sm text-gray-400 font-medium">
                            No Balcony
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
