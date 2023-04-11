import 'mocha'
import { expect } from 'chai'
import chalk from "chalk"
import { FunkoType } from '../../src/Ejercicio-FunkoAPP/Type/Type.js'
import { FunkoGenre } from '../../src/Ejercicio-FunkoAPP/Genre/Genre.js'
import { FunkoPop } from '../../src/Ejercicio-FunkoAPP/FunkoPop/FunkoPop.js'
import { User } from '../../src/Ejercicio-FunkoAPP/User/user.js'
const fs = require('fs');

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

describe('User class', () => {
  let user;
  let funko1;
  let funko2;

  beforeEach(() => {
    user = new User('TestUser');
    funko1 = new FunkoPop(
      0,
      'Chucky',
      'Chucky Muñeco Diabolico',
      FunkoType.POP,
      FunkoGenre.MOVIES_AND_TV,
      'Miedo',
      0
    );
    funko2 = new FunkoPop(
      1, 
      'Mickey Mouse',
      'The most famous character of Walt Disney',
      FunkoType.POP_BLACK_AND_WHITE,
      FunkoGenre.ANIMATION,
      'Disney',
      1
    );
    user.addFunko(funko1);
    user.addFunko(funko2);
  });

  afterEach(() => {
    // Limpiar archivos de prueba
    try {
      fs.unlinkSync(`./data/users/${user.name}.json`);
    } catch (err) {
      // Ignorar errores de archivo no encontrado
    }
  });

  describe('#listFunkos', () => {
    it('should print all Funko Pops in the collection', () => {
      // Implemente una función de espía o una función de burla para verificar si FunkoPop.print() se llama con los Funko Pops correctos
    });
  });

  describe('#searchFunko', () => {
    it('should find and print a Funko Pop if it exists in the collection', () => {
      const result = user.searchFunko(funko1);
      expect(result).to.equal(chalk.green(`${funko1.name} found in ${user.name}'s collection`));
      // También puede verificar si FunkoPop.print() se llama con el Funko Pop correcto
    });

    it("should return an error message if the Funko Pop doesn't exist in the collection", () => {
      const funkoNotInCollection = new FunkoPop(
        2,
        'Darth Vader',
        'The most famous character of Star Wars',
        FunkoType.POP,
        FunkoGenre.MOVIES_AND_TV,
        'Star Wars',
        2
      );
      const result = user.searchFunko(funkoNotInCollection);
      expect(result).to.equal(chalk.red(`${funkoNotInCollection.name} not in ${user.name}'s collection`));
    });
  });

  describe('#save', () => {
    it('should save the user and their collection to a JSON file', () => {
      user.save();

      const fileContent = fs.readFileSync(`./data/users/${user.name}.json`, 'utf-8');
      const savedUser = JSON.parse(fileContent);

      expect(savedUser.name).to.equal(user.name);
      expect(savedUser.collection).to.deep.equal(user.collection);
    });
  });

  describe('#load', () => {
    it('should load the user and their collection from a JSON file', () => {
      user.save();
      const loadedUser = new User(user.name);
      loadedUser.load();

      expect(loadedUser.name).to.equal(user.name);
      expect(loadedUser.collection).to.deep.equal(user.collection);
    });
  });
});