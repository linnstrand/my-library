import type { Book } from './types';

export function parseBookString(input: string, isAnthology: boolean): Book {
  const seriesInfo: string[] = [];
  const metadata: string[] = [];
  let bookNumber: number | null = null;

  // Extract content inside parentheses
  const parenRegex = /\(([^)]+)\)/g;
  const parenMatches = input.match(parenRegex) || [];

  // Extract and clean seriesInfo, look for bookNumber
  for (const match of parenMatches) {
    const raw = match.slice(1, -1).trim(); // Remove parentheses
    const number = extractBookNumber(raw);
    if (number !== null && bookNumber === null) {
      bookNumber = number;
    }
    const cleaned = raw.replace(/\bBook\s*\d+\b/i, '').trim();
    if (cleaned) {
      seriesInfo.push(cleaned);
    }
  }

  // Remove all parentheses content from the original string
  const cleanedInput = input.replace(parenRegex, '').trim();

  // Split title and rest at the first colon
  const [rawTitle, rest] = cleanedInput.split(/:(.+)/).map((s) => s.trim());
  const title = rawTitle;

  if (rest) {
    const parts = rest
      .split(/[,:]/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    for (const part of parts) {
      const number = extractBookNumber(part);
      if (number !== null && bookNumber === null) {
        bookNumber = number;
      }
      const cleaned = part.replace(/\bBook\s*\d+\b/i, '').trim();
      if (cleaned) {
        metadata.push(cleaned);
      }
    }
  }

  return {
    title,
    metadata,
    seriesInfo,
    bookNumber,
    isAnthology,
  };
}

function extractBookNumber(text: string): number | null {
  const match = text.match(/\bBook\s*(\d+)\b/i) || text.match(/\b(\d+)\b/);
  return match ? parseInt(match[1], 10) : null;
}
