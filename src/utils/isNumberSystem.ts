import { type NumberSystem, BASES } from '../logic/getBase.js';

export default function isNumberSystem(value: string): value is NumberSystem {
  return value in BASES;
}
