import type { Book } from './types';

export function parseBookString(input: string, isAnthology: boolean): Book {
  let seriesInfo: string[] | undefined = [];
  let metadata: string[] | undefined = [];
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
    const cleaned = getCleaned(raw);
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

  if (seriesInfo.length === 0) {
    seriesInfo = undefined;
  }
  if (metadata.length === 0) {
    metadata = undefined;
  }
  return {
    title,
    metadata,
    seriesInfo,
    bookNumber,
    isAnthology,
  };
}

const numberWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

const getCleaned = (text: string) => {
  const cleaned = text
    .replace(
      /\bbook\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\b/i,
      ''
    )
    .trim();
  return cleaned
    .replace(/\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\b/i, '')
    .trim();
};

const extractBookNumber = (text: string): number | null => {
  text = text.toLowerCase();

  // Try to match "Book" followed by a number or number word
  const match =
    text.match(
      /\bbook\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\b/i
    ) ||
    text.match(/\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\b/i);

  if (!match) return null;

  const value = match[1];

  // Convert word to number if needed
  if (numberWords[value]) {
    return numberWords[value];
  }

  return parseInt(value, 10);
};
