import type { Book, BookAmazon, TitleData } from './types';

export function parseAmazonTitleString(input: BookAmazon): Book {
  const seriesInfos: string[] = [];
  const metadatas: string[] = [];
  let bookNumber: number | null = null;

  // Extract content inside parentheses
  const parenRegex = /\(([^)]+)\)/g;
  const parenMatches = input.title.match(parenRegex) || [];

  // Extract and clean seriesInfo, look for bookNumber
  for (const match of parenMatches) {
    const raw = match.slice(1, -1).trim(); // Remove parentheses
    const number = extractBookNumber(raw);
    if (number !== null && bookNumber === null) {
      bookNumber = number;
    }
    const cleaned = getCleaned(raw);
    if (cleaned) {
      seriesInfos.push(cleaned);
    }
  }

  // Remove all parentheses content from the original string
  const cleanedInput = input.title.replace(parenRegex, '').trim();

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
        metadatas.push(cleaned);
      }
    }
  }
  let seriesInfo;
  let metadata;
  if (seriesInfos.length > 0) {
    seriesInfo = seriesInfos[seriesInfos.length - 1];
  }

  if (metadatas.length > 0) {
    if (!seriesInfo) {
      seriesInfo = metadatas[0];
    } else {
      metadata = metadatas.join(', ');
    }
  }

  let authors = input.authors[0].split(':').filter((s) => s.length > 1);
  const author = authors.length > 1 ? 'Multiple' : (authors.pop() ?? '');
  authors = authors.filter((a) => !!a);

  return {
    authorLF: author,
    author: author.split(', ').reverse().join(' '),
    aditionalAuthors: authors.length > 0 ? authors : undefined,
    ownedOnAmazon: true,
    title,
    seriesInfo,
    bookNumber,
  };
}

export function parseGoodreadTitleString(input: string): TitleData {
  const seriesInfos: string[] = [];
  const metadatas: string[] = [];

  // Extract content inside parentheses
  const parenRegex = /\(([^)]+)\)/g;
  const parenMatches = input.match(parenRegex) || [];
  const matchNr = input.match(/#(\d+(?:\.\d+)?)/);
  const bookNumber = matchNr ? Number(matchNr[1]) : null;

  // Extract and clean seriesInfo, look for bookNumber
  for (const match of parenMatches) {
    const raw = match.slice(1, -1);
    const result = raw.match(/^[^,#]*/)?.[0] ?? input;
    seriesInfos.push(result);
  }

  // Remove all parentheses content from the original string
  const title = input.replace(parenRegex, '').trim();

  let seriesInfo;
  let metadata;
  if (seriesInfos.length > 0) {
    seriesInfo = seriesInfos[seriesInfos.length - 1];
  }

  if (metadatas.length > 0) {
    if (!seriesInfo) {
      seriesInfo = metadatas[0];
    } else {
      metadata = metadatas.join(', ');
    }
  }

  return {
    title,
    seriesInfo,
    bookNumber,
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

export function extractNumber(str: string) {
  const num = Number(str.replace(/\D+/g, ''));
  return num > 0 ? num : undefined;
}
