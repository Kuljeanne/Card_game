import { it, expect } from "@jest/globals";
import { Card } from "../src/js/card";
import {shuffle } from "./func-for-tests"

it('should return card object', () => {
    const card = new Card('clubs','A');
    expect(card).toBeInstanceOf(Card)
      });

it('should return the array with the same length', () => {
    const array = [new Card('clubs','A'), new Card('hearts','10'), new Card('diamonds','Q'), new Card('spades','6')]
    expect(shuffle(array)).toHaveLength(array.length)
 });

it('should return each item to be Card instance', () => {
  const array = [new Card('clubs','A'), new Card('hearts','10'), new Card('diamonds','Q'), new Card('spades','6')]
  for(let i = 0; i < array.length; i++){
    expect(shuffle(array)[i]).toBeInstanceOf(Card)
  }
});
