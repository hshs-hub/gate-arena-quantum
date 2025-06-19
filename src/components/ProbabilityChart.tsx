
import React from 'react';

interface ProbabilityChartProps {
  probabilities: Record<string, number>;
}

const ProbabilityChart = ({ probabilities }: ProbabilityChartProps) => {
  const entries = Object.entries(probabilities);
  
  return (
    <div className="space-y-3">
      {entries.map(([state, probability]) => (
        <div key={state} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="quantum-state font-semibold">|{state}⟩</span>
            <span className="text-gray-600">{(probability * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${probability * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProbabilityChart;
