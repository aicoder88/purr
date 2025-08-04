import { useState, useEffect } from "react";
import { Button } from "./button";
import { Slider } from "./slider";
import { motion } from "framer-motion";
import { Leaf, Car, TreePine, Cat, DollarSign, Clock } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CostCalculatorProps {
  className?: string;
}

interface EnvironmentalImpact {
  carbonSaved: number; // kg
  treesEquivalent: number;
  carsRemoved: number;
  catsSaved: number;
}

export function CostCalculator({ className }: CostCalculatorProps) {
  const [catsCount, setCatsCount] = useState(1);
  const [litterCost, setLitterCost] = useState(20);
  const [changeFrequency, setChangeFrequency] = useState(7); // days
  const [annualSavings, setAnnualSavings] = useState(0);
  const [tenYearSavings, setTenYearSavings] = useState(0);
  const [environmentalImpact, setEnvironmentalImpact] =
    useState<EnvironmentalImpact>({
      carbonSaved: 0,
      treesEquivalent: 0,
      carsRemoved: 0,
      catsSaved: 0,
    });
  const [tenYearEnvironmentalImpact, setTenYearEnvironmentalImpact] =
    useState<EnvironmentalImpact>({
      carbonSaved: 0,
      treesEquivalent: 0,
      carsRemoved: 0,
      catsSaved: 0,
    });


  // Calculate savings and environmental impact
  useEffect(() => {
    // Calculate how many times they change litter per year
    const changesPerYear = 365 / changeFrequency;

    // Calculate current annual cost
    const annualCost = changesPerYear * litterCost * catsCount;

    // Calculate savings (50% of current cost)
    const savings = annualCost * 0.5;
    const tenYearSave = savings * 10;

    // Calculate environmental impact
    // Assumptions:
    // - Each litter change saved reduces carbon by 0.5kg
    // - 1 tree absorbs about 25kg CO2 per year
    // - Average car emits 4.6 metric tons of CO2 per year
    const litterChangesSaved = changesPerYear * 0.5; // 50% reduction
    const carbonSaved = litterChangesSaved * 0.5; // kg of carbon per change
    const treesEquivalent = carbonSaved / 25;
    const carsRemoved = carbonSaved / 4600;
    const catsSaved = Math.ceil(litterChangesSaved / 10); // Arbitrary: every 10 litter changes saved helps one shelter cat

    setAnnualSavings(savings);
    setTenYearSavings(tenYearSave);
    setEnvironmentalImpact({
      carbonSaved,
      treesEquivalent,
      carsRemoved,
      catsSaved,
    });
    setTenYearEnvironmentalImpact({
      carbonSaved: carbonSaved * 10,
      treesEquivalent: treesEquivalent * 10,
      carsRemoved: carsRemoved * 10,
      catsSaved: catsSaved * 10,
    });
  }, [catsCount, litterCost, changeFrequency]);

  // Generate data for the savings graph
  const generateSavingsData = () => {
    const data = [];
    for (let year = 1; year <= 10; year++) {
      data.push({
        year,
        savings: annualSavings * year,
      });
    }
    return data;
  };

  const savingsData = generateSavingsData();


  const generateSavingsChartData = () => {
    return {
      labels: savingsData.map((data) => `${data.year}yr`),
      datasets: [
        {
          label: "Savings ($)",
          data: savingsData.map((data) => data.savings),
          borderColor: "#5B2EFF",
          backgroundColor: "rgba(91, 46, 255, 0.2)",
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: "#03E46A",
        },
      ],
    };
  };

  const savingsChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"line">) => `$${tooltipItem.raw as number}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Years",
        },
      },
      y: {
        title: {
          display: true,
          text: "Savings ($)",
        },
        beginAtZero: true,
      },
    },
  };

  const yearlyImpactMetrics = [
    {
      title: "Carbon Saved",
      value: environmentalImpact.carbonSaved.toFixed(2),
      unit: "kg",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      description: "CO₂ not released into the atmosphere",
      color: "bg-green-500",
    },
    {
      title: "Trees Equivalent",
      value: environmentalImpact.treesEquivalent.toFixed(2),
      unit: "",
      icon: <TreePine className="h-5 w-5 text-emerald-600" />,
      description: "As if you planted this many trees",
      color: "bg-emerald-500",
    },
    {
      title: "Cars Removed",
      value: environmentalImpact.carsRemoved.toFixed(3),
      unit: "",
      icon: <Car className="h-5 w-5 text-blue-500" />,
      description: "Equivalent to removing cars from the road",
      color: "bg-blue-500",
    },
    {
      title: "Cats Helped",
      value: environmentalImpact.catsSaved,
      unit: "",
      icon: <Cat className="h-5 w-5 text-purple-500" />,
      description: "Shelter cats that could be helped with your savings",
      color: "bg-purple-500",
    },
  ];

  const tenYearImpactMetrics = [
    {
      title: "Carbon Saved",
      value: tenYearEnvironmentalImpact.carbonSaved.toFixed(2),
      unit: "kg",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      description: "CO₂ not released into the atmosphere",
      color: "bg-green-500",
    },
    {
      title: "Trees Equivalent",
      value: tenYearEnvironmentalImpact.treesEquivalent.toFixed(2),
      unit: "",
      icon: <TreePine className="h-5 w-5 text-emerald-600" />,
      description: "As if you planted this many trees",
      color: "bg-emerald-500",
    },
    {
      title: "Cars Removed",
      value: tenYearEnvironmentalImpact.carsRemoved.toFixed(3),
      unit: "",
      icon: <Car className="h-5 w-5 text-blue-500" />,
      description: "Equivalent to removing cars from the road",
      color: "bg-blue-500",
    },
    {
      title: "Cats Helped",
      value: tenYearEnvironmentalImpact.catsSaved,
      unit: "",
      icon: <Cat className="h-5 w-5 text-purple-500" />,
      description: "Shelter cats that could be helped with your savings",
      color: "bg-purple-500",
    },
  ];

  return (
    <div
      className={`bg-[#FFFFFF]/95 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-[#E0EFC7] dark:border-gray-800 ${className}`}
    >
      <motion.h3
        className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#5B2EFF] to-[#03E46A] dark:from-[#3694FF] dark:to-[#FF5050] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Calculate Your Purrify Impact
      </motion.h3>

      <div className="space-y-6">
        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white/50 p-4 rounded-xl shadow-sm border border-[#E0EFC7]/50 flex flex-col justify-between"
          >
            <div className="flex justify-center mb-2">
              <Cat className="h-5 w-5 text-[#5B2EFF]" />
            </div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-center">
              Number of Cats: {catsCount}
            </label>
            <Slider
              value={[catsCount]}
              max={15}
              min={1}
              step={1}
              onValueChange={(value) => setCatsCount(value[0])}
              className="mt-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white/50 p-4 rounded-xl shadow-sm border border-[#E0EFC7]/50 flex flex-col justify-between"
          >
            <div className="flex justify-center mb-2">
              <DollarSign className="h-5 w-5 text-[#03E46A]" />
            </div>
            <label className="block text-sm font-medium text-gray-700 text-center">
              Cost of Litter per Change: ${litterCost}
            </label>
            <Slider
              value={[litterCost]}
              max={50}
              min={5}
              step={1}
              onValueChange={(value) => setLitterCost(value[0])}
              className="mt-5"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white/50 p-4 rounded-xl shadow-sm border border-[#E0EFC7]/50 flex flex-col justify-between"
          >
            <div className="flex justify-center mb-2">
              <Clock className="h-5 w-5 text-[#FF3131]" />
            </div>
            <label className="block text-sm font-medium text-gray-700 text-center">
              Days Between Litter Changes: {changeFrequency}
            </label>
            <Slider
              value={[changeFrequency]}
              max={14}
              min={3}
              step={1}
              onValueChange={(value) => setChangeFrequency(value[0])}
              className="mt-auto"
            />
          </motion.div>
        </div>

        {/* Financial Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-gradient-to-r from-[#5B2EFF]/10 to-[#03E46A]/10 rounded-xl"
        >
          <h4 className="text-xl font-bold mb-4 text-center text-[#5B2EFF]">
            Financial Impact
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Annual Savings */}
            <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-[#E0EFC7]/50 text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Annual Savings
              </p>
              <div className="flex items-center justify-center mb-2">
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-[#5B2EFF] to-[#03E46A] flex items-center justify-center text-white text-xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3,
                  }}
                >
                  ${Math.round(annualSavings)}
                </motion.div>
              </div>
              <p className="text-2xl font-bold text-[#03E46A]">
                ${annualSavings.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                That&apos;s like getting {Math.round(annualSavings / litterCost)}{" "}
                free litter changes per year!
              </p>
            </div>

            {/* 10-Year Savings */}
            <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-[#E0EFC7]/50 text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">
                10-Year Savings
              </p>
              <div className="flex items-center justify-center mb-2">
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 flex items-center justify-center text-white text-xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.4,
                  }}
                >
                  ${Math.round(tenYearSavings)}
                </motion.div>
              </div>
              <p className="text-2xl font-bold text-[#FF3131]">
                ${tenYearSavings.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Over a decade, that&apos;s {Math.round(tenYearSavings / litterCost)}{" "}
                litter changes saved!
              </p>
            </div>
          </div>

          {/* Savings Graph */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-3 text-center">
              10-Year Savings Projection
            </p>
            <div className="bg-white/70 rounded-lg p-4 border border-[#E0EFC7]">
              <Line
                data={generateSavingsChartData()}
                options={savingsChartOptions}
              />
            </div>
          </div>
        </motion.div>

        {/* Environmental Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 bg-gradient-to-r from-[#03E46A]/10 to-[#5B2EFF]/10 rounded-xl"
        >
          <h4 className="text-xl font-bold mb-4 text-center text-[#03E46A]">
            Environmental Impact
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-[#E0EFC7]/50">
              <h5 className="text-center font-semibold text-[#5B2EFF] mb-3 flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" /> Yearly Impact
              </h5>
              <div className="grid grid-cols-2 gap-3">
                {yearlyImpactMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.title}
                    className="bg-white/80 p-3 rounded-lg flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className="mb-1">{metric.icon}</div>
                    <h6 className="text-xs font-medium text-gray-700">
                      {metric.title}
                    </h6>
                    <p className="text-lg font-bold text-[#5B2EFF]">
                      {metric.value}
                      {metric.unit}
                    </p>
                    <div className="w-full h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <motion.div
                        className={`h-full ${metric.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-[#E0EFC7]/50">
              <h5 className="text-center font-semibold text-[#FF3131] mb-3 flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" /> 10-Year Impact
              </h5>
              <div className="grid grid-cols-2 gap-3">
                {tenYearImpactMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.title}
                    className="bg-white/80 p-3 rounded-lg flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className="mb-1">{metric.icon}</div>
                    <h6 className="text-xs font-medium text-gray-700">
                      {metric.title}
                    </h6>
                    <p className="text-lg font-bold text-[#FF3131]">
                      {metric.value}
                      {metric.unit}
                    </p>
                    <div className="w-full h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <motion.div
                        className={`h-full ${metric.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Cat-Themed Special Callout */}
          <motion.div
            className="mt-6 bg-gradient-to-r from-[#5B2EFF]/20 to-[#FF3131]/20 p-5 rounded-lg flex items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-white/80 rounded-full p-3 shadow-md">
              <Cat className="h-12 w-12 text-[#5B2EFF]" />
            </div>
            <div>
              <h5 className="font-bold text-lg text-[#5B2EFF] mb-1">
                Purrfect Impact: Help {tenYearEnvironmentalImpact.catsSaved}{" "}
                Shelter Cats!
              </h5>
              <p className="text-sm text-gray-700">
                Your 10-year savings with Purrify could help approximately{" "}
                <span className="font-bold text-[#FF3131]">
                  {tenYearEnvironmentalImpact.catsSaved}
                </span>{" "}
                shelter cats get the care they need. That&apos;s a lot of happy
                purrs!
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button className="w-full bg-gradient-to-r from-[#03E46A] to-[#5B2EFF] hover:from-[#03E46A]/90 hover:to-[#5B2EFF]/90 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-lg">
            START SAVING NOW
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
