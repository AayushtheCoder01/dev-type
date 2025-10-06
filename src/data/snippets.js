export const snippetsLibrary = {
  javascript: {
    easy: [
      {
        id: 'js-e-1',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Arrow function',
        code: `const greet = (name) => \`Hello, \${name}!\`
console.log(greet('World'))`
      },
      {
        id: 'js-e-2',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Array map',
        code: `const nums = [1, 2, 3]
const doubled = nums.map(n => n * 2)`
      },
      {
        id: 'js-e-3',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Destructuring',
        code: `const user = { name: 'Alice', age: 30 }
const { name, age } = user`
      },
      {
        id: 'js-e-4',
        language: 'javascript',
        difficulty: 'easy',
        description: 'For loop',
        code: `for (let i = 0; i < 5; i++) {
  console.log(i)
}`
      },
      {
        id: 'js-e-5',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Conditional',
        code: `const score = 85
const grade = score >= 90 ? 'A' : 'B'`
      },
      {
        id: 'js-e-6',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Array filter',
        code: `const numbers = [1, 2, 3, 4, 5]
const evens = numbers.filter(n => n % 2 === 0)`
      },
      {
        id: 'js-e-7',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Template literal',
        code: `const name = 'John'
const message = \`Welcome, \${name}!\``
      },
      {
        id: 'js-e-8',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Spread operator',
        code: `const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5]`
      },
      {
        id: 'js-e-9',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Object literal',
        code: `const person = {
  name: 'Sarah',
  age: 25,
  city: 'New York'
}`
      },
      {
        id: 'js-e-10',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Array find',
        code: `const users = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]
const user = users.find(u => u.id === 2)`
      },
      {
        id: 'js-e-11',
        language: 'javascript',
        difficulty: 'easy',
        description: 'String methods',
        code: `const text = 'Hello World'
const upper = text.toUpperCase()
const words = text.split(' ')`
      },
      {
        id: 'js-e-12',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Array includes',
        code: `const fruits = ['apple', 'banana', 'orange']
const hasApple = fruits.includes('apple')`
      },
      {
        id: 'js-e-13',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Default parameters',
        code: `function greet(name = 'Guest') {
  return \`Hello, \${name}!\`
}
console.log(greet())`
      },
      {
        id: 'js-e-14',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Object keys',
        code: `const obj = {a: 1, b: 2, c: 3}
const keys = Object.keys(obj)
const values = Object.values(obj)`
      },
      {
        id: 'js-e-15',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Array push/pop',
        code: `const stack = []
stack.push('first')
stack.push('second')
const last = stack.pop()`
      },
      {
        id: 'js-e-16',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Switch statement',
        code: `const day = 'Monday'
switch (day) {
  case 'Monday':
    console.log('Start of week')
    break
  default:
    console.log('Another day')
}`
      },
      {
        id: 'js-e-17',
        language: 'javascript',
        difficulty: 'easy',
        description: 'Array slice',
        code: `const numbers = [1, 2, 3, 4, 5]
const first3 = numbers.slice(0, 3)
const last2 = numbers.slice(-2)`
      },
      {
        id: 'js-e-18',
        language: 'javascript',
        difficulty: 'easy',
        description: 'JSON methods',
        code: `const obj = {name: 'John', age: 30}
const json = JSON.stringify(obj)
const parsed = JSON.parse(json)`
      }
    ],
    medium: [
      {
        id: 'js-m-1',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Async/await',
        code: `const data = await fetch('/api')
const json = await data.json()`
      },
      {
        id: 'js-m-2',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Array reduce',
        code: `const nums = [1, 2, 3, 4, 5]
const sum = nums.reduce((a, b) => a + b, 0)`
      },
      {
        id: 'js-m-3',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Class constructor',
        code: `class User {
  constructor(name) { this.name = name }
  greet() { return \`Hi, \${this.name}\` }
}`
      },
      {
        id: 'js-m-4',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Promise chain',
        code: `fetch('/api').then(r => r.json())
  .then(data => console.log(data))`
      },
      {
        id: 'js-m-5',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Closure',
        code: `const counter = () => {
  let count = 0
  return () => ++count
}`
      },
      {
        id: 'js-m-6',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Object methods',
        code: `const obj = { x: 10, y: 20 }
const sum = Object.values(obj).reduce((a,b) => a+b)`
      },
      {
        id: 'js-m-7',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Array destructuring',
        code: `const [first, second, ...rest] = [1, 2, 3, 4, 5]
const [a, , c] = ['x', 'y', 'z']`
      },
      {
        id: 'js-m-8',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Set operations',
        code: `const set = new Set([1, 2, 2, 3])
set.add(4)
set.delete(1)
console.log(set.has(2))`
      },
      {
        id: 'js-m-9',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Map operations',
        code: `const map = new Map()
map.set('key1', 'value1')
map.set('key2', 'value2')
console.log(map.get('key1'))`
      },
      {
        id: 'js-m-10',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Try-catch',
        code: `try {
  const result = JSON.parse(invalidJson)
} catch (error) {
  console.error('Parse error:', error.message)
}`
      },
      {
        id: 'js-m-11',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Module export',
        code: `export const utils = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
}
export default utils`
      },
      {
        id: 'js-m-12',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Array flat',
        code: `const nested = [1, [2, 3], [4, [5, 6]]]
const flat = nested.flat()
const deepFlat = nested.flat(2)`
      },
      {
        id: 'js-m-13',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Object assign',
        code: `const target = { a: 1 }
const source = { b: 2, c: 3 }
const merged = Object.assign(target, source)`
      },
      {
        id: 'js-m-14',
        language: 'javascript',
        difficulty: 'medium',
        description: 'Regular expression',
        code: `const text = 'Hello 123 World'
const numbers = text.match(/\\d+/g)
const hasDigits = /\\d/.test(text)`
      }
    ],
    hard: [
      {
        id: 'js-h-1',
        language: 'javascript',
        difficulty: 'hard',
        description: 'Async generator',
        code: `async function* gen() {
  yield await Promise.resolve(1)
  yield await Promise.resolve(2)
}`
      },
      {
        id: 'js-h-2',
        language: 'javascript',
        difficulty: 'hard',
        description: 'Proxy handler',
        code: `const handler = { get: (t, p) => t[p] || 'N/A' }
const proxy = new Proxy({name: 'John'}, handler)`
      },
      {
        id: 'js-h-3',
        language: 'javascript',
        difficulty: 'hard',
        description: 'Memoization',
        code: `const memo = fn => { const c = {}; return x => 
  c[x] ?? (c[x] = fn(x)) }`
      },
      {
        id: 'js-h-4',
        language: 'javascript',
        difficulty: 'hard',
        description: 'WeakMap usage',
        code: `const wm = new WeakMap()
const obj = {}; wm.set(obj, 'secret')`
      },
      {
        id: 'js-h-5',
        language: 'javascript',
        difficulty: 'hard',
        description: 'Custom iterator',
        code: `const iter = { [Symbol.iterator]: function*() {
  yield 1; yield 2; yield 3 } }`
      },
      {
        id: 'js-h-6',
        language: 'javascript',
        difficulty: 'hard',
        description: 'Currying function',
        code: `const curry = fn => (...args) =>
  args.length >= fn.length ? fn(...args) :
  (...more) => curry(fn)(...args, ...more)`
      },
      {
        id: 'js-h-7',
        language: 'javascript',
        difficulty: 'hard',
        description: 'Promise.all with error handling',
        code: `const promises = [fetch('/api1'), fetch('/api2')]
Promise.allSettled(promises).then(results => {
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      console.log(\`Promise \${i} resolved\`)
    }
  })
})`
      },
      {
        id: 'js-h-8',
        language: 'javascript',
        difficulty: 'hard',
        description: 'Debounce function',
        code: `const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}`
      },
      {
        id: 'js-h-9',
        language: 'javascript',
        difficulty: 'hard',
        description: 'Deep clone object',
        code: `const deepClone = obj => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof Array) return obj.map(deepClone)
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
  )
}`
      },
      {
        id: 'js-h-10',
        language: 'javascript',
        difficulty: 'hard',
        description: 'Function composition',
        code: `const compose = (...fns) => x => 
  fns.reduceRight((acc, fn) => fn(acc), x)
const addOne = x => x + 1
const double = x => x * 2
const addThenDouble = compose(double, addOne)`
      }
    ]
  },
  python: {
    easy: [
      {
        id: 'py-e-1',
        language: 'python',
        difficulty: 'easy',
        description: 'Function',
        code: `def greet(name):
    return f"Hello, {name}!"`
      },
      {
        id: 'py-e-2',
        language: 'python',
        difficulty: 'easy',
        description: 'List comprehension',
        code: `nums = [1, 2, 3, 4, 5]
squared = [x**2 for x in nums]`
      },
      {
        id: 'py-e-3',
        language: 'python',
        difficulty: 'easy',
        description: 'Dictionary',
        code: `person = {"name": "Alice", "age": 30}
print(f"{person['name']} is {person['age']}")`
      },
      {
        id: 'py-e-4',
        language: 'python',
        difficulty: 'easy',
        description: 'For loop',
        code: `for i in range(5):
    print(f"Count: {i}")`
      },
      {
        id: 'py-e-5',
        language: 'python',
        difficulty: 'easy',
        description: 'Lambda',
        code: `square = lambda x: x ** 2
result = square(5)`
      },
      {
        id: 'py-e-6',
        language: 'python',
        difficulty: 'easy',
        description: 'Filter',
        code: `nums = [1, 2, 3, 4, 5]
evens = list(filter(lambda x: x % 2 == 0, nums))`
      },
      {
        id: 'py-e-7',
        language: 'python',
        difficulty: 'easy',
        description: 'String formatting',
        code: `name = "Bob"
age = 25
message = f"{name} is {age} years old"`
      },
      {
        id: 'py-e-8',
        language: 'python',
        difficulty: 'easy',
        description: 'List methods',
        code: `fruits = ['apple', 'banana']
fruits.append('orange')
fruits.extend(['grape', 'kiwi'])
print(len(fruits))`
      },
      {
        id: 'py-e-9',
        language: 'python',
        difficulty: 'easy',
        description: 'Dictionary methods',
        code: `data = {'a': 1, 'b': 2}
keys = list(data.keys())
values = list(data.values())
items = list(data.items())`
      },
      {
        id: 'py-e-10',
        language: 'python',
        difficulty: 'easy',
        description: 'If-else statement',
        code: `score = 85
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
else:
    grade = 'C'`
      },
      {
        id: 'py-e-11',
        language: 'python',
        difficulty: 'easy',
        description: 'String methods',
        code: `text = "Hello World"
upper = text.upper()
words = text.split()
joined = "-".join(words)`
      },
      {
        id: 'py-e-12',
        language: 'python',
        difficulty: 'easy',
        description: 'Tuple unpacking',
        code: `point = (10, 20)
x, y = point
coordinates = (x, y, 0)`
      },
      {
        id: 'py-e-13',
        language: 'python',
        difficulty: 'easy',
        description: 'Set operations',
        code: `set1 = {1, 2, 3}
set2 = {3, 4, 5}
union = set1 | set2
intersection = set1 & set2`
      },
      {
        id: 'py-e-14',
        language: 'python',
        difficulty: 'easy',
        description: 'Enumerate function',
        code: `items = ['a', 'b', 'c']
for index, value in enumerate(items):
    print(f"{index}: {value}")`
      }
    ],
    medium: [
      {
        id: 'py-m-1',
        language: 'python',
        difficulty: 'medium',
        description: 'Decorator',
        code: `def logger(func):\n    def wrapper(*args):\n        print(f"Calling {func.__name__}")\n        return func(*args)\n    return wrapper`
      },
      {
        id: 'py-m-2',
        language: 'python',
        difficulty: 'medium',
        description: 'Class method',
        code: `class Math:\n    @staticmethod\n    def add(a, b): return a + b`
      },
      {
        id: 'py-m-3',
        language: 'python',
        difficulty: 'medium',
        description: 'Generator',
        code: `def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n): yield a; a, b = b, a+b`
      },
      {
        id: 'py-m-4',
        language: 'python',
        difficulty: 'medium',
        description: 'List comprehension with condition',
        code: `numbers = range(1, 11)
evens_squared = [x**2 for x in numbers if x % 2 == 0]
matrix = [[i*j for j in range(3)] for i in range(3)]`
      },
      {
        id: 'py-m-5',
        language: 'python',
        difficulty: 'medium',
        description: 'Exception handling',
        code: `try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
finally:
    print("Cleanup code")`
      },
      {
        id: 'py-m-6',
        language: 'python',
        difficulty: 'medium',
        description: 'Class inheritance',
        code: `class Animal:
    def __init__(self, name): self.name = name
    def speak(self): pass

class Dog(Animal):
    def speak(self): return f"{self.name} barks"`
      },
      {
        id: 'py-m-7',
        language: 'python',
        difficulty: 'medium',
        description: 'Dictionary comprehension',
        code: `words = ['hello', 'world', 'python']
lengths = {word: len(word) for word in words}
filtered = {k: v for k, v in lengths.items() if v > 4}`
      }
    ],
    hard: [
      {
        id: 'py-h-1',
        language: 'python',
        difficulty: 'hard',
        description: 'Metaclass',
        code: `class Meta(type):\n    def __new__(cls, name, bases, dct):\n        return super().__new__(cls, name, bases, dct)`
      },
      {
        id: 'py-h-2',
        language: 'python',
        difficulty: 'hard',
        description: 'Context manager',
        code: `class Timer:\n    def __enter__(self): self.start = time.time()\n    def __exit__(self, *args): print(time.time()-self.start)`
      }
    ]
  },
  typescript: {
    easy: [
      {
        id: 'ts-e-1',
        language: 'typescript',
        difficulty: 'easy',
        description: 'Interface',
        code: `interface User { id: number; name: string }\nconst user: User = { id: 1, name: "Alice" }`
      },
      {
        id: 'ts-e-2',
        language: 'typescript',
        difficulty: 'easy',
        description: 'Generic',
        code: `function identity<T>(arg: T): T { return arg }\nconst result = identity<string>("Hello")`
      },
      {
        id: 'ts-e-3',
        language: 'typescript',
        difficulty: 'easy',
        description: 'Type alias',
        code: `type Point = { x: number; y: number }\nconst p: Point = { x: 10, y: 20 }`
      },
      {
        id: 'ts-e-4',
        language: 'typescript',
        difficulty: 'easy',
        description: 'Enum usage',
        code: `enum Color { Red, Green, Blue }\nconst favorite: Color = Color.Blue\nconsole.log(Color[favorite])`
      },
      {
        id: 'ts-e-5',
        language: 'typescript',
        difficulty: 'easy',
        description: 'Array typing',
        code: `const numbers: number[] = [1, 2, 3]\nconst strings: Array<string> = ['a', 'b', 'c']`
      },
      {
        id: 'ts-e-6',
        language: 'typescript',
        difficulty: 'easy',
        description: 'Optional properties',
        code: `interface Config {\n  host: string\n  port?: number\n}\nconst config: Config = { host: 'localhost' }`
      },
      {
        id: 'ts-e-7',
        language: 'typescript',
        difficulty: 'easy',
        description: 'Function typing',
        code: `function add(a: number, b: number): number {\n  return a + b\n}\nconst multiply = (x: number, y: number): number => x * y`
      },
      {
        id: 'ts-e-8',
        language: 'typescript',
        difficulty: 'easy',
        description: 'Class with types',
        code: `class Person {\n  constructor(public name: string, private age: number) {}\n  greet(): string { return \`Hello, I'm \${this.name}\` }\n}`
      }
    ],
    medium: [
      {
        id: 'ts-m-1',
        language: 'typescript',
        difficulty: 'medium',
        description: 'Type guard',
        code: `function isString(x: unknown): x is string {\n  return typeof x === 'string'\n}`
      },
      {
        id: 'ts-m-2',
        language: 'typescript',
        difficulty: 'medium',
        description: 'Union types',
        code: `type Result = { success: true; data: string } | \n  { success: false; error: string }`
      },
      {
        id: 'ts-m-3',
        language: 'typescript',
        difficulty: 'medium',
        description: 'Intersection types',
        code: `type Name = { name: string }\ntype Age = { age: number }\ntype Person = Name & Age\nconst person: Person = { name: 'John', age: 30 }`
      },
      {
        id: 'ts-m-4',
        language: 'typescript',
        difficulty: 'medium',
        description: 'Generic constraints',
        code: `interface Lengthwise { length: number }\nfunction logLength<T extends Lengthwise>(arg: T): T {\n  console.log(arg.length)\n  return arg\n}`
      },
      {
        id: 'ts-m-5',
        language: 'typescript',
        difficulty: 'medium',
        description: 'Utility types',
        code: `interface User { id: number; name: string; email: string }\ntype PartialUser = Partial<User>\ntype UserName = Pick<User, 'name'>\ntype WithoutId = Omit<User, 'id'>`
      },
      {
        id: 'ts-m-6',
        language: 'typescript',
        difficulty: 'medium',
        description: 'Keyof operator',
        code: `interface Person { name: string; age: number }\ntype PersonKeys = keyof Person\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key]\n}`
      }
    ],
    hard: [
      {
        id: 'ts-h-1',
        language: 'typescript',
        difficulty: 'hard',
        description: 'Conditional type',
        code: `type IsString<T> = T extends string ? true : false\ntype A = IsString<string>`
      },
      {
        id: 'ts-h-2',
        language: 'typescript',
        difficulty: 'hard',
        description: 'Mapped type',
        code: `type Readonly<T> = { readonly [P in keyof T]: T[P] }\ntype User = Readonly<{ name: string }>`
      }
    ]
  },
  java: {
    easy: [
      {
        id: 'java-e-1',
        language: 'java',
        difficulty: 'easy',
        description: 'Class',
        code: `public class Person {\n    private String name;\n    public Person(String n) { this.name = n; }\n}`
      },
      {
        id: 'java-e-2',
        language: 'java',
        difficulty: 'easy',
        description: 'ArrayList',
        code: `List<String> list = new ArrayList<>();\nlist.add("Java"); list.add("Python");`
      },
      {
        id: 'java-e-3',
        language: 'java',
        difficulty: 'easy',
        description: 'For loop',
        code: `for (int i = 0; i < 5; i++) {\n    System.out.println("Count: " + i);\n}`
      },
      {
        id: 'java-e-4',
        language: 'java',
        difficulty: 'easy',
        description: 'Enhanced for loop',
        code: `int[] numbers = {1, 2, 3, 4, 5};\nfor (int num : numbers) {\n    System.out.println(num);\n}`
      },
      {
        id: 'java-e-5',
        language: 'java',
        difficulty: 'easy',
        description: 'String methods',
        code: `String text = "Hello World";\nString upper = text.toUpperCase();\nString[] words = text.split(" ");`
      },
      {
        id: 'java-e-6',
        language: 'java',
        difficulty: 'easy',
        description: 'HashMap usage',
        code: `Map<String, Integer> map = new HashMap<>();\nmap.put("apple", 5);\nmap.put("banana", 3);\nint count = map.get("apple");`
      },
      {
        id: 'java-e-7',
        language: 'java',
        difficulty: 'easy',
        description: 'Method definition',
        code: `public static int add(int a, int b) {\n    return a + b;\n}\npublic static void main(String[] args) {\n    int sum = add(5, 3);\n}`
      },
      {
        id: 'java-e-8',
        language: 'java',
        difficulty: 'easy',
        description: 'If-else statement',
        code: `int score = 85;\nString grade;\nif (score >= 90) {\n    grade = "A";\n} else if (score >= 80) {\n    grade = "B";\n} else {\n    grade = "C";\n}`
      }
    ],
    medium: [
      {
        id: 'java-m-1',
        language: 'java',
        difficulty: 'medium',
        description: 'Stream API',
        code: `List<Integer> nums = Arrays.asList(1,2,3,4,5);\nList<Integer> evens = nums.stream()\n  .filter(n -> n % 2 == 0).collect(Collectors.toList());`
      },
      {
        id: 'java-m-2',
        language: 'java',
        difficulty: 'medium',
        description: 'Lambda',
        code: `Function<Integer, Integer> square = x -> x * x;\nInteger result = square.apply(5);`
      },
      {
        id: 'java-m-3',
        language: 'java',
        difficulty: 'medium',
        description: 'Exception handling',
        code: `try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.err.println("Error: " + e.getMessage());\n} finally {\n    System.out.println("Cleanup");\n}`
      },
      {
        id: 'java-m-4',
        language: 'java',
        difficulty: 'medium',
        description: 'Interface implementation',
        code: `interface Drawable {\n    void draw();\n}\nclass Circle implements Drawable {\n    public void draw() { System.out.println("Drawing circle"); }\n}`
      },
      {
        id: 'java-m-5',
        language: 'java',
        difficulty: 'medium',
        description: 'Abstract class',
        code: `abstract class Animal {\n    abstract void makeSound();\n    void sleep() { System.out.println("Sleeping"); }\n}\nclass Dog extends Animal {\n    void makeSound() { System.out.println("Woof"); }\n}`
      },
      {
        id: 'java-m-6',
        language: 'java',
        difficulty: 'medium',
        description: 'Optional usage',
        code: `Optional<String> optional = Optional.ofNullable(getValue());\nString result = optional.orElse("default");\noptional.ifPresent(System.out::println);`
      }
    ],
    hard: [
      {
        id: 'java-h-1',
        language: 'java',
        difficulty: 'hard',
        description: 'Generic method',
        code: `public static <T extends Comparable<T>> T max(T a, T b) {\n  return a.compareTo(b) > 0 ? a : b;\n}`
      },
      {
        id: 'java-h-2',
        language: 'java',
        difficulty: 'hard',
        description: 'Optional',
        code: `Optional<String> opt = Optional.ofNullable(getValue());\nString result = opt.orElse("default");`
      }
    ]
  }
}
