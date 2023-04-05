import 'mocha'
import { expect } from 'chai'
import { FunkoType } from '../../src/Ejercicio-FunkoAPP/Type/Type.js'
import { FunkoGenre } from '../../src/Ejercicio-FunkoAPP/Genre/Genre.js'
import { FunkoPop } from '../../src/Ejercicio-FunkoAPP/FunkoPop/FunkoPop.js'


const Michael_Jordan = new FunkoPop(
  0,
  'Michael Jordan',
  'Funko POP! Michael Jordan – 54 NBA Chicago Bulls',
  FunkoType.POP,
  FunkoGenre.SPORTS,
  'NBA',
  0
)

describe('Funko class', () => {
  it('deberían tener diferentes tipos y géneros', () => {
    expect(FunkoType).to.be.a('object')
    expect(FunkoGenre).to.be.a('object')
  })
  it('deberían tener una identificación única', () => {
    expect(Michael_Jordan.id).to.be.a('number')
    expect(Michael_Jordan.id).to.equal(0)
  })
  it('deberían tener un nombre', () => {
    expect(Michael_Jordan.name).to.be.a('string')
    expect(Michael_Jordan.name).to.equal('Michael Jordan')
  })
  it('deberían tenewr una descripción', () => {
    expect(Michael_Jordan.description).to.be.a('string')
    expect(Michael_Jordan.description).to.equal(
      'Funko POP! Michael Jordan – 54 NBA Chicago Bulls'
    )
  })
  it('deberían tener un tipo', () => {
    expect(Michael_Jordan.type).to.be.a('string')
    expect(Michael_Jordan.type).to.equal(FunkoType.POP)
  })
  it('deberían tener un género', () => {
    expect(Michael_Jordan.genre).to.be.a('string')
    expect(Michael_Jordan.genre).to.equal(FunkoGenre.SPORTS)
  })
  it('deberían tener una marca', () => {
    expect(Michael_Jordan.brand).to.be.a('string')
    expect(Michael_Jordan.brand).to.equal('NBA')
  })
  it('deberían tener un id único dentro de su marca', () => {
    expect(Michael_Jordan.brandId).to.be.a('number')
    expect(Michael_Jordan.brandId).to.equal(0)
  })
  it('deberían tener un precio de mercado', () => {
    Michael_Jordan.marketPrice = 38
    expect(Michael_Jordan.marketPrice).to.be.a('number')
    expect(Michael_Jordan.marketPrice).to.equal(38)
  })
  it('deberían de poder ser exclusivos', () => {
    Michael_Jordan.exclusive = true
    expect(Michael_Jordan.exclusive).to.be.a('boolean')
    expect(Michael_Jordan.exclusive).to.equal(true)
  })
})