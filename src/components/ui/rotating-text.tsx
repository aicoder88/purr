import { useState } from 'react';
import { useInterval } from '@/lib/hooks/useInterval';

interface RotatingTextProps {
  texts: string[];
  interval?: number;
}

export function RotatingText({ texts, interval = 2000 }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useInterval(() => {
    setIndex((prevIndex) => (prevIndex + 1) % texts.length);
  }, interval);

  return (
    <span
      className="block bg-clip-text text-transparent pb-2"
      style={{
        backgroundImage: "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 50%, #A78BFA 100%)",
        lineHeight: "1.3",
        minHeight: "1.4em",
        display: "flex",
        alignItems: "center",
        fontSize: "98%"
      }}
    >
      {texts[index]}
    </span>
  );
} 