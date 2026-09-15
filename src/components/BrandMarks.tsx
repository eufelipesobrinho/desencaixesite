type BrandLinesProps = {
  className?: string;
};

export function BrandLines({ className = "" }: BrandLinesProps) {
  return (
    <svg
      className={`brand-lines ${className}`}
      viewBox="0 0 220 70"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 54V12h132" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="54" r="3.2" fill="currentColor" />
      <circle cx="140" cy="12" r="3.2" fill="currentColor" />
      <path d="M212 18v40H86" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="212" cy="18" r="3.2" fill="currentColor" />
      <circle cx="86" cy="58" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function PuzzleMark({ className = "" }: BrandLinesProps) {
  return (
    <svg
      className={`puzzle-mark ${className}`}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="#D96B5C" d="M4 4h16v7.2c-2.4 0-4.4 2-4.4 4.4S17.6 20 20 20v8H4V4Z" />
      <path fill="#D4B84A" d="M4 28h16v16H4V35.6c2.4 0 4.4-2 4.4-4.4S10.4 28 8 28H4Z" />
      <path fill="#7AAB4A" d="M28 4h16v16H36.4c0-2.4-2-4.4-4.4-4.4S27.6 13.6 27.6 16H20V4h8Z" />
      <path fill="#7EC4D6" d="M20 28h8v-8c2.4 0 4.4-2 4.4-4.4h11.6v24H20V28Z" />
    </svg>
  );
}
