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
