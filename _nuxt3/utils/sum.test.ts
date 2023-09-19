import {it, expect, test } from "vitest"
import {sum} from "./sum"
import { bench } from 'vitest'

test("1+2 to equal 3", ()=>{
    expect(sum(1, 2)).toBe(3)
})

function toUpperCase(s: string) {
  return s.toUpperCase()
}


it('toUpperCase', () => {
  const result = toUpperCase('foobar')
  expect(result).toMatchInlineSnapshot('"FOOBAR"')
})