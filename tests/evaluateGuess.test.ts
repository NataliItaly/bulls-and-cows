import { describe, expect, it } from 'vitest';
import evaluateGuess from '../src/logic/evaluateGuess';

describe('evaluateGuess', () => {
  it('should return an object with property cows and bulls', () => {
    const result = evaluateGuess('1234', '2456');
    expect(result).toHaveProperty('bulls');
    expect(result).toHaveProperty('cows');
  });

  it('should return object with bulls property equal to secret length if the secret was guessed', () => {
    const secret = '1234';
    const result = evaluateGuess(secret, '1234');
    expect(result.bulls).toEqual(secret.length);
  });

  it('should return object with cows property equal to secret length if all the numbers from secret was guessed', () => {
    const secret = '1234';
    const result = evaluateGuess(secret, '3421');
    expect(result.cows).toEqual(secret.length);
  });

  it('should return object with correct count of bulls', () => {
    const secret = '1234';
    const result = evaluateGuess(secret, '1256');
    expect(result.cows).toEqual(0);
    expect(result.bulls).toEqual(2);
  });

  it('should return object with correct count of cows and bulls property', () => {
    const secret = '1234';
    const result = evaluateGuess(secret, '1243');
    expect(result.cows).toEqual(2);
    expect(result.bulls).toEqual(2);
  });

  it('should return object with correct count of cows and bulls property if one of the digits was not guessed', () => {
    const secret = '1234';
    const result = evaluateGuess(secret, '1345');
    expect(result.cows).toEqual(2);
    expect(result.bulls).toEqual(1);
  });

  it('should return object with correct count of cows', () => {
    const secret = '1234';
    const result = evaluateGuess(secret, '5643');
    expect(result.cows).toEqual(2);
    expect(result.bulls).toEqual(0);
  });

  it('should return object with cows and bulls property equal to 0', () => {
    const secret = '1234';
    const result = evaluateGuess(secret, '5678');
    expect(result.cows).toEqual(0);
    expect(result.bulls).toEqual(0);
  });

  it('should calculate correct result with leading zero', () => {
    const secret = '0234';
    const result = evaluateGuess(secret, '0234');
    expect(result.cows).toEqual(0);
    expect(result.bulls).toEqual(4);
  });
});
