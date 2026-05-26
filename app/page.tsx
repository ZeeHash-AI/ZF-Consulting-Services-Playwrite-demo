/**
 * Zee AI Testing Dashboard (Next.js with Playwright execution buttons)
 * Author: Zee Hashmi
 */

'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg]);
  };

  const runMockTests = async () => {
    setRunning(true);
    setLogs([]);

    addLog('Zee AI mock engine started');
    await sleep(600);

    addLog('Loading test suite');
    await sleep(600);

    addLog('Running sample UI checks');
    await sleep(800);

    addLog('Generating mock report');
    await sleep(600);

    addLog('Mock tests completed');

    setRunning(false);
  };

  const runPlaywrightTests = async () => {
    setRunning(true);
    setLogs([]);

    addLog('Triggering Playwright test runner');

    try {
      const res = await fetch('/api/playwright-run', {
        method: 'POST'
      });

      addLog('Playwright execution started on backend');

      const data = await res.json();

      if (data.logs) {
        data.logs.forEach((l: string) => addLog(l));
      }

      addLog('Playwright tests finished');
    } catch (err) {
      addLog('Error running Playwright tests');
    }

    setRunning(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold">Zee AI Testing Dashboard</h1>

        <p className="mt-2 text-gray-600">
          Run AI driven and Playwright automated testing from one place
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={runMockTests}
            disabled={running}
            className="px-5 py-3 rounded-xl bg-gray-700 text-white disabled:opacity-50"
          >
            Run Mock Tests
          </button>

          <button
            onClick={runPlaywrightTests}
            disabled={running}
            className="px-5 py-3 rounded-xl bg-blue-600 text-white disabled:opacity-50"
          >
            Run Playwright Tests
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Execution Log</h2>
          <div className="mt-3 bg-black text-green-400 p-4 rounded-lg h-64 overflow-auto">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <Stat label="Test Suites" value="12" />
          <Stat label="Passed" value="128" />
          <Stat label="Failed" value="3" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-500">{label}</div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
