import { useState, useEffect } from "react";
import { Button } from "./button";
import { Slider } from "./slider";

interface CostCalculatorProps {
  className?: string;
}

export function CostCalculator({ className }: CostCalculatorProps) {
  const [catsCount, setCatsCount] = useState(1);
  const [litterCost, setLitterCost] = useState(20);
  const [changeFrequency, setChangeFrequency] = useState(7); // days
  const [annualSavings, setAnnualSavings] = useState(0);

  useEffect(() => {
    // Calculate how many times they change litter per year
    const changesPerYear = 365 / changeFrequency;

    // Calculate current annual cost
    const annualCost = changesPerYear * litterCost * catsCount;

    // Calculate savings (50% of current cost)
    const savings = annualCost * 0.5;

    setAnnualSavings(savings);
  }, [catsCount, litterCost, changeFrequency]);

  return (
    <div
      className={`bg-[#FFFFFF]/95 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-[#E0EFC7] ${className}`}
    >
      <h3 className="text-3xl font-bold mb-6 text-center text-[#6A43FB]">
        Calculate Your Litter Savings
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Cats: {catsCount}
          </label>
          <Slider
            value={[catsCount]}
            max={15}
            min={1}
            step={1}
            onValueChange={(value) => setCatsCount(value[0])}
            className="my-4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cost of Litter per Change: ${litterCost}
          </label>
          <Slider
            value={[litterCost]}
            max={50}
            min={5}
            step={1}
            onValueChange={(value) => setLitterCost(value[0])}
            className="my-4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days Between Litter Changes: {changeFrequency}
          </label>
          <Slider
            value={[changeFrequency]}
            max={14}
            min={3}
            step={1}
            onValueChange={(value) => setChangeFrequency(value[0])}
            className="my-4"
          />
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-[#6A43FB]/10 to-[#43FBB4]/10 rounded-xl">
          <p className="text-center text-gray-700 mb-2">
            Your Estimated Annual Savings:
          </p>
          <p className="text-center text-4xl font-bold text-[#43FBB4]">
            ${annualSavings.toFixed(2)}
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            That's like getting{" "}
            <span className="font-semibold">
              {Math.round(annualSavings / litterCost)}
            </span>{" "}
            free litter changes per year!
          </p>
        </div>

        <Button className="w-full bg-gradient-to-r from-[#43FBB4] to-[#43FBB4]/80 hover:from-[#43FBB4]/90 hover:to-[#43FBB4] text-white font-bold py-3 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
          START SAVING NOW
        </Button>
      </div>
    </div>
  );
}
