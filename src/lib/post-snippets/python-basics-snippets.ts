// src/lib/post-snippets/python-basics-snippets.ts

export const pythonBasicsSnippets = {
  helloWorld: `# Your first Python program
print("Hello, Python!")
print("Python makes things simple.")

name = "Rupa"
print(f"Hello, {name}!")`,

  variables: `# Python variables — no type declarations needed
name = "Alice"
age = 25
price = 9.99
is_active = True

# Python infers the type
print(type(name))      # <class 'str'>
print(type(age))       # <class 'int'>
print(type(price))     # <class 'float'>
print(type(is_active)) # <class 'bool'>

# Multiple assignment
x = y = z = 0
a, b, c = 1, 2, 3
print(a, b, c)  # 1 2 3`,

  stringOps: `# String operations
name = "  Python Developer  "
print(name.strip())          # "Python Developer"
print(name.strip().upper())  # "PYTHON DEVELOPER"
print(name.strip().lower())  # "python developer"
print(len(name.strip()))     # 16

# f-strings (use these always)
lang = "Python"
version = 3.12
print(f"{lang} {version} is awesome!")

# String methods
sentence = "the quick brown fox"
print(sentence.title())      # The Quick Brown Fox
print(sentence.replace("fox", "cat"))  # the quick brown cat
print(sentence.split(" "))   # ['the', 'quick', 'brown', 'fox']
print("python" in sentence)  # False`,

  numbersOps: `# Numbers and math
a = 17
b = 5

print(a + b)   # 22  — addition
print(a - b)   # 12  — subtraction
print(a * b)   # 85  — multiplication
print(a / b)   # 3.4 — true division (always float)
print(a // b)  # 3   — floor division (drops decimal)
print(a % b)   # 2   — modulo (remainder)
print(a ** b)  # 1419857 — power (17^5)

# Math module
import math
print(math.sqrt(16))    # 4.0
print(math.ceil(3.2))   # 4
print(math.floor(3.9))  # 3
print(round(3.14159, 2)) # 3.14`,

  controlFlow: `# if / elif / else
score = 82

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Score: {score}, Grade: {grade}")

# One-liner (ternary)
status = "pass" if score >= 60 else "fail"
print(f"Status: {status}")

# For loop
for i in range(1, 6):
    print(f"  {i}: {'*' * i}")

# While loop
count = 3
while count > 0:
    print(f"  Countdown: {count}")
    count -= 1
print("  Blastoff!")`,

  listOps: `# Lists — ordered, mutable
fruits = ["apple", "banana", "cherry"]

# Access
print(fruits[0])    # apple
print(fruits[-1])   # cherry (last item)
print(fruits[1:])   # ['banana', 'cherry']

# Modify
fruits.append("date")
fruits.insert(1, "avocado")
fruits.remove("banana")
print(fruits)

# List comprehension
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens   = [n for n in numbers if n % 2 == 0]
squares = [n ** 2 for n in numbers]
print("Evens:", evens)
print("Squares:", squares)

# Useful list operations
print(len(fruits))         # count
print(sorted(fruits))      # sorted copy
print("apple" in fruits)   # membership test`,

  functions: `# Functions
def greet(name, greeting="Hello"):
    """Return a greeting string."""
    return f"{greeting}, {name}!"

print(greet("Alice"))            # Hello, Alice!
print(greet("Bob", "Hi"))        # Hi, Bob!
print(greet(greeting="Hey", name="Eve")) # keyword args

# *args — variable positional arguments
def total(*numbers):
    return sum(numbers)

print(total(1, 2, 3))        # 6
print(total(10, 20, 30, 40)) # 100

# **kwargs — variable keyword arguments
def describe(**info):
    for key, value in info.items():
        print(f"  {key}: {value}")

describe(name="Rupa", role="dev", lang="Python")`,
}