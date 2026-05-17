export const MARKER_COLORS = {
  person: '#6B1F2E',
  place:  '#B04E18',
  event:  '#1B5A66',
};

export const MARKER_SVGS = {
  person: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="#6B1F2E"/>
    <circle cx="32" cy="32" r="28" fill="none" stroke="#F5EFE2" stroke-opacity="0.25" stroke-width="1.5"/>
    <path d="M38 18 L46 26 L28 44 L18 46 L20 36 Z" fill="#F5EFE2" opacity="0.9"/>
    <path d="M18 46 L20 36 L28 44 Z" fill="#C49532"/>
  </svg>`,

  place: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="#B04E18"/>
    <circle cx="32" cy="32" r="28" fill="none" stroke="#F5EFE2" stroke-opacity="0.25" stroke-width="1.5"/>
    <path d="M22 42 L22 38 L26 38 L26 34 L30 34 L30 30 L34 30 L34 34 L38 34 L38 38 L42 38 L42 42 Z" fill="#F5EFE2"/>
    <rect x="30" y="38" width="4" height="4" fill="#B04E18"/>
  </svg>`,

  event: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="#1B5A66"/>
    <circle cx="32" cy="32" r="28" fill="none" stroke="#F5EFE2" stroke-opacity="0.25" stroke-width="1.5"/>
    <circle cx="32" cy="32" r="14" fill="none" stroke="#F5EFE2" stroke-width="1.2" opacity="0.4"/>
    <circle cx="32" cy="32" r="9"  fill="none" stroke="#F5EFE2" stroke-width="1.2" opacity="0.7"/>
    <circle cx="32" cy="32" r="3.5" fill="#F5EFE2"/>
  </svg>`,
};
