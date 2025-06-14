"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { layouts, Layout } from "@/data/dummyData";
import PageTitle from "@/components/PageTitle";
import ImageCarousel from "@/components/ImageCarousel";
import { Bath, BedDouble, PencilRuler, ChevronLeft } from "lucide-react";

export default function LayoutDetailsPage() {
  const params = useParams();
  const { back } = useRouter();
  const { id, floor, unit } = params;
  const layout = layouts.find((l: Layout) => l.id === unit);
  console.log(params, "uj");

  if (!layout) {
    return (
      <div className="container mx-auto p-8 text-[var(--foreground)]">
        <div className="text-xl font-bold mb-4">Layout not found.</div>
        <Link href={`/towers/${id}/${floor}`}>
          <span className="underline text-blue-600 hover:text-blue-800">
            Back
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 flex flex-col items-center text-[var(--foreground)]">
      {/* Back Button */}
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
          <ChevronLeft />
          Back
        </button>
      </div>

      {/* Page Title */}
      <PageTitle title={layout.unitType} />
      <span className="lg:-mt-10 mt-0">Apartment</span>

      {/* Main Card */}
      <div className="w-full max-w-5xl   rounded-2xl bg-[#bd98821a] border border-[var(--color-primary)] shadow-xl p-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <img src={layout.layout} alt={layout.name} />
          <ImageCarousel
            images={[
              { src: "/images/Bathroom.jpg", alt: "Bathroom" },
              { src: "/images/Bed_A.jpg", alt: "Bedroom A" },
              { src: "/images/Kitchen_B.jpg", alt: "Kitchen B" },
              { src: "/images/Type-A.jpeg", alt: "Type A" },
              { src: "/images/Type-B.jpg", alt: "Type B" },
              { src: "/images/Type-C.jpg", alt: "Type C" },
              { src: "/images/Type-D.jpg", alt: "Type D" },
            ]}
          />
        </div>
        {/* Image Carousel */}

        {/* Layout Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 text-sm sm:text-base">
          <InfoItem
            icon={<PencilRuler className="w-5 h-5" />}
            label="Area"
            value={layout.area}
          />
          <InfoItem
            icon={<BedDouble className="w-5 h-5" />}
            label="Unit Type"
            value={layout.unitType}
          />
          <InfoItem
            icon={<Bath className="w-5 h-5" />}
            label="Baths"
            value={layout.bathCount}
          />
          
            {layout.balcony === true ? (
              <>
                <InfoItem
                  icon={<svg
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
                  </svg>}
                  label="Balcony"
                  value={'✓'}
                />
                
              </>
            ) : (
             
               <>
                <InfoItem
                  icon={<svg
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
                  </svg>}
                  label="No Balcony"
                  value={'✗'}
                />
                
              </>
             
            )}
          </div>
        </div>
      </div>

  );
}

// Helper Component
const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
}) => (
  <div className="flex items-center space-x-3">
    <div className="text-primary">{icon}</div>
    <div className="flex flex-col">
      <span className="text-xs text-white">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  </div>
);
