const colorPalette = [
  { bg: '#A7C7E7', border: '#91B9E0' }, // Pastel Blue
  { bg: '#F4A6A6', border: '#E68C8C' }, // Pastel Red
  { bg: '#A9DFBF', border: '#82CE9E' }, // Pastel Green
  { bg: '#D7BDE2', border: '#C39BD3' }, // Pastel Purple
  { bg: '#A2D9CE', border: '#7FD6C8' }, // Pastel Cyan
  { bg: '#F5CBA7', border: '#F0B27A' }, // Pastel Orange
  { bg: '#C5CAE9', border: '#9FA8DA' }, // Pastel Indigo
  { bg: '#D7CCC8', border: '#BCAAA4' }, // Pastel Brown
  { bg: '#B39DDB', border: '#9575CD' }, // Pastel Deep Purple
  { bg: '#81D4FA', border: '#4FC3F7' }, // Pastel Light Blue
  { bg: '#AED581', border: '#9CCC65' }, // Pastel Light Green
];

export function getColor() {
  const index = Math.floor(Math.random() * colorPalette.length);
  return colorPalette[index];
}

export default colorPalette;