import 'mocha'
import { expect } from 'chai'
import chalk from "chalk"
import { FunkoType } from '../../src/FunkoAPP/Type/Type.js'
import { FunkoGenre } from '../../src/FunkoAPP/Genre/Genre.js'
import { FunkoPop } from '../../src/FunkoAPP/FunkoPop/FunkoPop.js'
import { User } from '../../src/FunkoAPP/User/user.js'


const Chucky = new FunkoPop(
  0,
  'Chucky',
  'Chucky Muñeco Diabolico',
  FunkoType.POP,
  FunkoGenre.MOVIES_AND_TV,
  'Miedo',
  0
)

const Mickey_Mouse = new FunkoPop(
  1, 
  'Mickey Mouse',
  'The most famous character of Walt Disney',
  FunkoType.POP_BLACK_AND_WHITE,
  FunkoGenre.ANIMATION,
  'Disney',
  1
)

const Darth_Vader = new FunkoPop(
  2,
  'Darth Vader',
  'The most famous character of Star Wars',
  FunkoType.POP,
  FunkoGenre.MOVIES_AND_TV,
  'Star Wars',
  2
)

const The_Mandalorian = new FunkoPop(
  3,
  'The Mandalorian',
  'Important character of Starr Wars',
  FunkoType.POP,
  FunkoGenre.MOVIES_AND_TV,
  'Star Wars',
  3
)

const Michelangelo = new FunkoPop(
  4,
  'Michelangelo',
  'Wife of Mickey Mouse',
  FunkoType.POP,
  FunkoGenre.ANIMATION,
  'Tortugas Ninja',
  4)

Chucky.marketPrice = 40
Mickey_Mouse.marketPrice = 35
Darth_Vader.marketPrice = 50
The_Mandalorian.marketPrice = 15
Michelangelo.marketPrice = 5

const user = new User('Star Wars', Darth_Vader, The_Mandalorian)

describe('User class', () => {
  it('deberían tener un nombre', () => {
    expect(user.name).to.be.a('string')
    expect(user.name).to.equal('Star Wars')
  });
  it('deberían tener una colección de Funkos', () => {
    expect(user.collection).to.be.a('array')
    expect(user.collection).to.have.lengthOf(2)
  });
  it('debería poder añadir Funkos a su colección', () => {
    expect(user.addFunko(Chucky)).to.be.equal(chalk.green(Chucky.name + ' added to ' + user.name + '\'s collection'))
    expect(user.collection).to.have.lengthOf(3)
  });
  it('deberían ser informados si intentan agregar un Funko que ya está en su colección', () => {
    expect(user.addFunko(Darth_Vader)).to.be.equal(chalk.red('Already exists a Funko Pop with id ' + Darth_Vader.id + ' in ' + user.name + '\'s collection'))
    expect(user.collection).to.have.lengthOf(3)
  });
  it('deberían poder modificar un Funko si su identificación está en su colección', () => {
    Darth_Vader.name = 'Darth Vader modified'
    expect(user.modifyFunko(Darth_Vader)).to.be.equal(chalk.green('Funko Pop with id ' + Darth_Vader.id + ' modified in ' + user.name + '\'s collection'))
    expect(user.collection).to.have.lengthOf(3)
  });
  it('deberían ser informados si intentan modificar un Funko que no está en su colección', () => {
    expect(user.modifyFunko(Michelangelo)).to.be.equal(chalk.red('Funko Pop with id ' + Michelangelo.id + ' not in ' + user.name + '\'s collection'))
    expect(user.collection).to.have.lengthOf(3)
  });
  it('deberían poder eliminar Funkos de su colección', () => {
    expect(user.removeFunko(The_Mandalorian)).to.be.equal(chalk.green(The_Mandalorian.name + ' removed from ' + user.name + '\'s collection'))
    expect(user.collection).to.have.lengthOf(2)
  });
  it('deberían ser informado si intentan eliminar un Funko que no está en su colección.', () => {
    expect(user.removeFunko(Michelangelo)).to.be.equal(chalk.red('Funko Pop with id ' + Michelangelo.id + ' not in ' + user.name + '\'s collection'))
    expect(user.collection).to.have.lengthOf(2)
  });
  it('deberían poder buscar Funkos en su colección.', () => {
    expect(user.searchFunko(Darth_Vader)).to.be.equal(chalk.green(Darth_Vader.name + ' found in ' + user.name + '\'s collection'))
    expect(user.searchFunko(The_Mandalorian)).to.be.equal(chalk.red(The_Mandalorian.name + ' not in ' + user.name + '\'s collection'))
  });
});