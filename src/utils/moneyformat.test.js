import {it,expect,describe} from 'vitest'
import { convertDollars } from './moneyformat'
describe('convertDollars',()=>{
  it('formats 1999 cents as $19.99',()=>{
    expect(convertDollars(1999)).toBe('$19.99')
  });

it('displays 2 decimals',()=>{
  expect(convertDollars(1090)).toBe('$10.90')
  expect(convertDollars(100)).toBe('$1.00')
  })
})
