
import React, { useState } from 'react';
import BlochSphere from '../BlochSphere';
import ProbabilityChart from '../ProbabilityChart';

const CNOTSimulator = () => {
  const [controlQubit, setControlQubit] = useState('0');
  const [targetQubit, setTargetQubit] = useState('0');
  const [appliedCNOT, setAppliedCNOT] = useState(false);

  const applyCNOT = () => {
    setAppliedCNOT(!appliedCNOT);
  };

  const resetState = () => {
    setControlQubit('0');
    setTargetQubit('0');
    setAppliedCNOT(false);
  };

  const getQuantumState = () => {
    let finalControl = controlQubit;
    let finalTarget = targetQubit;
    
    if (appliedCNOT && controlQubit === '1') {
      finalTarget = targetQubit === '0' ? '1' : '0';
    }

    const stateString = finalControl + finalTarget;
    const probabilities: Record<string, number> = { '00': 0, '01': 0, '10': 0, '11': 0 };
    probabilities[stateString] = 1.0;

    // For 2-qubit systems, Bloch sphere representation is more complex
    // We'll show a simplified representation focusing on the target qubit
    const blochSphere = finalTarget === '0' ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 };
    
    return {
      state: `|${stateString}⟩`,
      probabilities,
      blochSphere
    };
  };

  const currentState = getQuantumState();

  return (
    <div className="quantum-card p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive CNOT Gate Simulator</h3>
        <div className="bg-gray-100 p-4 rounded-lg inline-block">
          <code className="text-lg text-purple-700 font-mono">CNOT|00⟩ = |00⟩, CNOT|10⟩ = |11⟩</code>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <h6 className="font-semibold text-gray-700 mb-2">Control Qubit</h6>
            <div className="space-x-2">
              <button
                onClick={() => setControlQubit('0')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  controlQubit === '0' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                |0⟩
              </button>
              <button
                onClick={() => setControlQubit('1')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  controlQubit === '1' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                |1⟩
              </button>
            </div>
          </div>
          <div className="text-center">
            <h6 className="font-semibold text-gray-700 mb-2">Target Qubit</h6>
            <div className="space-x-2">
              <button
                onClick={() => setTargetQubit('0')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  targetQubit === '0' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                |0⟩
              </button>
              <button
                onClick={() => setTargetQubit('1')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  targetQubit === '1' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                |1⟩
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={applyCNOT}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              appliedCNOT ? 'bg-green-500 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {appliedCNOT ? 'Remove CNOT' : 'Apply CNOT'}
          </button>
          <button
            onClick={resetState}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Visual Circuit */}
      <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
        <div className="space-y-4">
          {/* Control Qubit */}
          <div className="flex items-center justify-center">
            <div className="quantum-state mr-4 font-semibold">|{controlQubit}⟩ (ctrl)</div>
            <div className="qubit-wire w-32 h-1 bg-gray-800 mx-4"></div>
            {appliedCNOT && (
              <div className="w-4 h-4 bg-black rounded-full"></div>
            )}
            <div className="qubit-wire w-32 h-1 bg-gray-800 mx-4"></div>
          </div>
          
          {/* Target Qubit */}
          <div className="flex items-center justify-center">
            <div className="quantum-state mr-4 font-semibold">|{targetQubit}⟩ (target)</div>
            <div className="qubit-wire w-32 h-1 bg-gray-800 mx-4"></div>
            {appliedCNOT && (
              <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
                <span className="text-lg">⊕</span>
              </div>
            )}
            <div className="qubit-wire w-32 h-1 bg-gray-800 mx-4"></div>
            <div className="quantum-state ml-4 font-semibold text-purple-700">{currentState.state}</div>
          </div>
          
          {/* Connection line for CNOT */}
          {appliedCNOT && (
            <div className="flex justify-center">
              <div className="w-px h-8 bg-black ml-36"></div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="quantum-card p-4">
          <h5 className="font-semibold text-gray-700 mb-2">Target Qubit State</h5>
          <BlochSphere position={currentState.blochSphere} />
        </div>
        <div className="quantum-card p-4">
          <h5 className="font-semibold text-gray-700 mb-2">2-Qubit State Probabilities</h5>
          <ProbabilityChart probabilities={currentState.probabilities} />
        </div>
      </div>
    </div>
  );
};

export default CNOTSimulator;
