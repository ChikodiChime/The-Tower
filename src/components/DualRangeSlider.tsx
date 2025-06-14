"use client";
import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface DualRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function DualRangeSlider({ min, max, value, onChange }: DualRangeSliderProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex items-center" style={{ minWidth: 180, padding: "0 10px" }}>
        <RangeSlider
          min={min}
          max={max}
          value={value}
          step={1}
          onInput={(vals: number[]) => onChange([vals[0], vals[1]])}
          className="range-slider-primary text-primary"
        />
      </div>
      <div className="flex gap-2 mt-2 text-xs">
        <span><span className="font-bold">{value[0]}</span> sqm</span>
        <span>–</span>
        <span> <span className="font-bold">{value[1]}</span> sqm</span>
      </div>
    </div>
  );
}
