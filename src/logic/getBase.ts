export type NumberSystem = 'bin' | 'oct' | 'dec' | 'hex';

const BASES: Record<NumberSystem, number> = {
  bin: 2,
  oct: 8,
  dec: 10,
  hex: 16,
};

export default function getBase(system: NumberSystem): number {
  const base = BASES[system];

  if (base === undefined) {
    throw new Error(`Unsupported number system: ${system}`);
  }

  return base;
}
