// src/lib/post-snippets/python-advanced-snippets.ts

export const pythonAdvancedSnippets = {
  decorators: `import time
import functools

# A simple decorator
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__!r} took {end - start:.4f}s")
        return result
    return wrapper

def retry(times=3):
    """Decorator factory — returns a decorator"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Attempt {attempt} failed: {e}")
                    if attempt == times:
                        raise
        return wrapper
    return decorator

@timer
def slow_sum(n):
    return sum(range(n))

@retry(times=3)
def flaky_operation():
    import random
    if random.random() < 0.7:
        raise ValueError("Random failure!")
    return "success"

result = slow_sum(1_000_000)
print(f"Result: {result}")`,

  generators: `# Generators — lazy sequences
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Only computes values as needed
fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
print(first_10)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Generator expression (like list comprehension but lazy)
squares_gen = (x ** 2 for x in range(1_000_000))
print(next(squares_gen))  # 0
print(next(squares_gen))  # 1

# Reading huge files with generators
def read_lines(filename):
    with open(filename) as f:
        for line in f:
            yield line.strip()

# Generator pipeline
def parse_csv_line(line):
    return line.split(",")

# lines = read_lines("data.csv")
# rows  = (parse_csv_line(line) for line in lines)
# Only one line in memory at a time — works for any file size`,

  comprehensions: `# All four comprehension types
numbers = range(1, 11)

# List comprehension
squares = [n**2 for n in numbers]
print("Squares:", squares)

# Dict comprehension
square_map = {n: n**2 for n in numbers}
print("Dict:", square_map)

# Set comprehension — deduplicates automatically
words = ["hello", "world", "hello", "python", "world"]
unique = {w.upper() for w in words}
print("Unique:", unique)

# Nested comprehension — flatten a matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [cell for row in matrix for cell in row]
print("Flat:", flat)

# Filtering
evens   = [n for n in numbers if n % 2 == 0]
even_sq = {n: n**2 for n in numbers if n % 2 == 0}
print("Even squares:", even_sq)`,
}

