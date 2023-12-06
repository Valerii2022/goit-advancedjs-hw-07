interface KeyInterface {
  getSignature(): number;
}

interface PersonInterface {
  getKey(): KeyInterface;
}

interface HouseInterface {
  comeIn(person: Person): void;
  openDoor(key: Key): void;
}

class Key implements KeyInterface {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person implements PersonInterface {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

class House implements HouseInterface {
  protected door: boolean;
  protected key: Key;
  protected tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
    this.door = false;
  }

  comeIn(person: Person): void {
    if (this.door) this.tenants.push(person);
  }

  openDoor(key: Key): void {}
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  openDoor(key: Key) {
    if (key.getSignature() === this.key.getSignature()) this.door = true;
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
