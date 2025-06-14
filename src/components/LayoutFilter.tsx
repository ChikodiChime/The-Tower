import React from "react";
import DualRangeSlider from "@/components/DualRangeSlider";
import { Layout } from "@/data/dummyData";

interface LayoutFilterProps {
  roomFilter: string;
  setRoomFilter: (val: string) => void;
  bathFilter: string;
  setBathFilter: (val: string) => void;
  dimRange: [number, number];
  setDimRange: (val: [number, number]) => void;
  balconyFilter: string;
  setBalconyFilter: (val: string) => void;
  layouts: Layout[];
}

const LayoutFilter: React.FC<LayoutFilterProps> = ({
  roomFilter,
  setRoomFilter,
  bathFilter,
  setBathFilter,
  dimRange,
  setDimRange,
  balconyFilter,
  setBalconyFilter,
  layouts,
}) => {
  return (
    <div className="sticky top-0 z-30 bg-[#bd98821a] w-full flex flex-col shadow-md rounded-xl mb-8 px-6 py-4 border border-[var(--color-primary)]"
    style={{ backdropFilter: "blur(8px)" }}
    >
      <div
        className=" grid grid-cols-1 md:grid-cols-4 gap-6 items-end "
        
      >
        <div className="flex flex-col w-full min-w-[120px]">
          <label className="block text-xs font-bold mb-1 text-[var(--color-primary)]">
            Rooms
          </label>
          <select
            className="border border-[var(--color-primary)] rounded-lg px-3 py-2 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-[var(--color-primary)] transition min-w-[80px]"
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
          >
            <option value="">All</option>
            {[...new Set(layouts.map((l) => l.roomCount))].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col min-w-[120px]">
          <label className="block text-xs font-bold mb-1 text-[var(--color-primary)]">
            Baths
          </label>
          <select
            className="border border-[var(--color-primary)] rounded-lg px-3 py-2 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-[var(--color-primary)] transition min-w-[80px]"
            value={bathFilter}
            onChange={(e) => setBathFilter(e.target.value)}
          >
            <option value="">All</option>
            {[...new Set(layouts.map((l) => l.bathCount))].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center flex-col ">
          <div className="flex flex-col w-full min-w-[240px]">
            <label className="block text-xs font-bold mb-2 text-[var(--color-primary)]">
              Dimension (sqm)
            </label>
            <DualRangeSlider
              min={45}
              max={500}
              value={dimRange}
              onChange={setDimRange}
            />
          </div>
          {(dimRange[0] !== 45 || dimRange[1] !== 500) && (
            <div className="inline-flex mt-4 w-fit items-center bg-[var(--color-primary)] text-white rounded px-3 py-1 text-xs shadow">
              <span>
                {dimRange[0]} – {dimRange[1]} sqm
              </span>
              <button
                className="ml-2 bg-white/20 hover:bg-white/40 rounded px-2 py-0.5 text-xs font-bold"
                onClick={() => setDimRange([45, 500])}
                aria-label="Reset dimension filter"
                type="button"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full min-w-[120px]">
          <label className="block text-xs font-bold mb-1 text-[var(--color-primary)]">
            Balcony
          </label>
          <select
            className="border border-[var(--color-primary)] rounded-lg px-3 py-2 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-[var(--color-primary)] transition min-w-[80px]"
            value={balconyFilter}
            onChange={(e) => setBalconyFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <button
        className=" ml-auto self-end mt-2 px-4 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold bg-white hover:bg-[var(--color-primary)] hover:text-white transition"
        onClick={() => {
          setRoomFilter("");
          setBathFilter("");
          setDimRange([45, 500]);
          setBalconyFilter("");
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default LayoutFilter;
