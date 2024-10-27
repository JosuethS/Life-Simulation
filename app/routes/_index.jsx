import React from 'react';
import GameOfLifeGrid from './GameOfLifeGrid';
import "../css/index.css"

export const meta = () => {
  return [
    { title: "Life" },
    { name: "A Life Simulation", content: "a visual website" },
  ];
};


export default function Index() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <GameOfLifeGrid />
    </main>
  );
}
