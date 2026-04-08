// src/lib/post-snippets/python-oop-snippets.ts

export const pythonOopSnippets = {
  classBasics: `# Classes and objects
class Dog:
    species = "Canis familiaris"  # class attribute

    def __init__(self, name, breed, age):
        self.name = name      # instance attributes
        self.breed = breed
        self.age = age

    def bark(self):
        return f"{self.name} says: Woof!"

    def __str__(self):
        return f"{self.name} ({self.breed}, {self.age}y)"

    def __repr__(self):
        return f"Dog(name={self.name!r}, breed={self.breed!r})"

rex = Dog("Rex", "Labrador", 3)
print(rex)            # Rex (Labrador, 3y)
print(rex.bark())     # Rex says: Woof!
print(rex.species)    # Canis familiaris`,

  inheritance: `# Inheritance
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclasses must implement speak()")

    def __str__(self):
        return f"{type(self).__name__}({self.name!r})"

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

class Duck(Animal):
    def speak(self):
        return f"{self.name} says Quack!"

animals = [Dog("Rex"), Cat("Whiskers"), Duck("Donald")]
for animal in animals:
    print(animal.speak())  # polymorphism in action`,

  dataclasses: `from dataclasses import dataclass, field
from typing import List

@dataclass
class Product:
    name: str
    price: float
    stock: int = 0
    tags: List[str] = field(default_factory=list)

    # computed property
    @property
    def in_stock(self) -> bool:
        return self.stock > 0

    def apply_discount(self, pct: float) -> "Product":
        return Product(
            name=self.name,
            price=round(self.price * (1 - pct / 100), 2),
            stock=self.stock,
            tags=self.tags
        )

laptop = Product("Laptop", 999.99, 10, ["electronics", "computers"])
print(laptop)
print(f"In stock: {laptop.in_stock}")

sale = laptop.apply_discount(10)
print(f"Sale price: \${sale.price}")`,
}
