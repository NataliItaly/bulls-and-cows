# DESIGN.md

# Bulls and Cows — Design Documentation

## 1. Data Structures and Algorithms

### 1.1. Game State

The current game state is represented by a TypeScript object (`State` interface/type) in `src/logic/state.ts`.

It contains the following information:

- `id` — unique identifier of the current game.
- `secret` — randomly generated secret combination.
- `length` — number of symbols in the secret.
- `base` — selected number system (2–36).
- `bulls` and `cows` — results of the last guess.
- `attempt` — number of guesses made.
- `possibleSecrets` — initial number of possible secret combinations.
- `startTime` — timestamp indicating when the game started.
- `previousGames` — array containing the history of completed games.

A single object is used to represent the game state because all properties describe one game and are updated together.

The state is stored in `localStorage` as JSON. This allows the application to restore game information after the browser page is refreshed.

### 1.2. Game History

Completed games are stored in an array of `PreviousGame` objects.

Each object contains:

- `id` — game identifier.
- `secret` — secret combination.
- `length` — combination length.
- `base` — selected number system.
- `attempt` — number of attempts required to complete the game.
- `duration` — game duration.
- `completedAt` — completion timestamp.

An array is suitable for storing game history because it provides a simple way to add new records, iterate over completed games, sort them and display them in the leaderboard.

The leaderboard uses the stored game records to compare players' results. Games are ranked primarily by the number of attempts and then by completion time.

### 1.3. `generateSecret`

File: `src/logic/generateSecret.ts`

The function generates a random secret combination without repeated symbols.

It uses a string containing all possible symbols (`0–9` and `a–z`) as the source alphabet.

The algorithm works as follows:

1. Create a string containing the first `base` available symbols.
2. Generate a random index within the current set of available symbols.
3. Add the selected symbol to the result.
4. Remove the selected symbol from the available string using `slice()` and `concat()`.
5. Repeat until the required combination length is reached.

Removing each selected symbol guarantees that the generated combination contains no duplicates.

The random number generator is passed as an optional argument, allowing deterministic values to be supplied in unit tests.

**Time complexity:** O(n × b), where `n` is the required secret length and `b` is the number of available symbols. Each iteration removes one symbol by creating a new string, which takes up to O(b) time.

**Space complexity:** O(b), because the algorithm stores the available symbols and the resulting combination.

### 1.4. `evaluateGuess`

File: `src/logic/evaluateGuess.ts`

The function compares the player's guess with the secret combination and returns an object containing the number of bulls and cows.

- A **bull** is a symbol that matches both the value and position in the secret.
- A **cow** is a symbol that exists in the secret but occupies a different position.

The algorithm uses `split()` and `filter()` to examine the secret symbols.

The first filtering operation counts bulls by checking whether the first occurrence of each symbol in the guess is at the same position.

The second filtering operation counts cows by checking whether each symbol exists in the guess at a different position.

The function returns an object with two properties: `bulls` and `cows`.

It assumes that both combinations contain unique symbols. Input validation is handled separately.

**Time complexity:** O(n²), where `n` is the combination length. For each symbol, the algorithm performs string searches using `indexOf()` and `includes()`, each of which can take O(n) time.

**Space complexity:** O(n), because `split()` and `filter()` create temporary arrays proportional to the combination length.

### 1.5. `countPossibleSecrets`

File: `src/logic/countPossibleSecrets.ts`

The function calculates the number of possible combinations for a given length and number system.

Since symbols cannot be repeated, the problem is equivalent to calculating permutations without repetition:

\[
P(b,n)=\frac{b!}{(b-n)!}
\]

The implementation uses recursion and memoization.

The recursive helper calculates the result using the following relationship:

\[
P(b,n)=b \times P(b-1,n-1)
\]

Base cases:

- When `length` is `0`, the result is `1`.
- When `length` is `1`, the result is equal to `base`.

A `Map` stores previously calculated results using the combination of `length` and `base` as a key. This avoids repeating calculations when the same arguments are requested again.

The public function validates its arguments and displays an error message when invalid values are provided.

**Time complexity:** O(n) for a single calculation that requires a new recursive result, where `n` is the requested combination length. Each recursive call reduces the length by one. Previously calculated results can be retrieved from the cache in O(1) average time.

**Space complexity:** O(n) for a single recursive calculation due to the call stack. The cache additionally stores previously calculated results, with O(K) space for K distinct argument pairs.

### 1.6. `isValidGuess`

File: `src/logic/isValidGuess.ts`

The function validates the player's guess by checking three conditions:

1. The guess must have the required length.
2. All symbols must be unique.
3. Every symbol must belong to the selected number system.

The function uses a `Set` to detect duplicate symbols. Since a `Set` stores only unique values, comparing its size with the original string length determines whether repeated symbols exist.

To validate the symbols, the function creates a string containing the allowed characters for the selected base. It then uses `every()` and `includes()` to check each character. The `toLowerCase()` method allows uppercase letters to be accepted as well.

The function returns `true` only when all three conditions are satisfied.

**Time complexity:** O(n × b), where `n` is the guess length and `b` is the number of available symbols. Each character is checked against the allowed-symbol string using `includes()`, which can take O(b) time.

**Space complexity:** O(n + b), because the function creates a `Set`, a temporary character array and a string containing the allowed symbols.

## 2. Time and Space Complexity

Let:

- `n` — secret or guess length.
- `b` — number of available symbols in the selected number system.

| Function               | Time complexity | Space complexity | Explanation                                                                                                                                                           |
| ---------------------- | --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateSecret`       | O(n × b)        | O(b)             | The algorithm selects `n` symbols. Removing a selected symbol creates a new string from the remaining symbols, which requires copying up to `b` symbols.              |
| `evaluateGuess`        | O(n²)           | O(n)             | The function performs filtering operations over the secret. For each symbol, `includes()` and `indexOf()` may scan the guess, resulting in quadratic time complexity. |
| `isValidGuess`         | O(n × b)        | O(n + b)         | The function checks symbol uniqueness using a `Set` and verifies that every symbol belongs to the selected alphabet.                                                  |
| `countPossibleSecrets` | O(n)            | O(n)             | The recursive calculation reduces both `length` and `base` by one at each step. Memoization prevents repeated calculations of the same argument pair.                 |

The complexity of `generateSecret` depends on both the requested combination length and the size of the available alphabet.

The recursive calculation in `countPossibleSecrets` has a maximum recursion depth of `n`. The cache stores intermediate results and can also be reused by subsequent calls.

---

## 3. Clean Code Principles

The project follows several Clean Code principles to improve readability, maintainability and testability.

### 3.1. Single Responsibility Principle (SRP)

Each function is responsible for one specific task.

Examples:

- `src/logic/generateSecret.ts` — generates a secret combination.
- `src/logic/evaluateGuess.ts` — compares the guess with the secret.
- `src/logic/countPossibleSecrets.ts` — calculates the number of possible combinations.
- `src/logic/isValidGuess.ts` — validates a complete guess.
- `src/utils/createElement.ts` — creates and configures HTML elements.

Separating these responsibilities makes individual functions easier to understand, test and maintain.

### 3.2. Separation of Concerns

The application separates game logic, state management, utility functions and user interface code.

- `src/logic/` contains game rules, calculations and state management.
- `src/ui/` contains functions responsible for rendering screens and handling user interface interactions.
- `src/utils/` contains reusable helper functions.
- `src/css/` contains application styles.

This separation prevents game logic from depending directly on the presentation layer.

### 3.3. Pure Functions and Testability

Core game logic is implemented as independent functions that receive their input through parameters and return results.

For example, `evaluateGuess()` receives the secret and the guess and returns the comparison result.

`generateSecret()` accepts an optional random number generator. Injecting this dependency allows tests to provide predictable random values and verify the function's behaviour reliably.

This approach makes the core logic easier to test independently of the DOM.

### 3.4. Meaningful Names

Functions, variables and types use descriptive names that communicate their purpose.

Examples:

- `generateSecret`
- `evaluateGuess`
- `countPossibleSecrets`
- `isValidGuess`
- `PreviousGame`
- `NumberSystem`

Meaningful names reduce the need for additional comments and make the code easier to read.

### 3.5. Type Safety

TypeScript types are used to make the code more predictable and prevent invalid values from being used accidentally.

For example, `NumberSystem` restricts predefined number system identifiers to:

`'bin' | 'oct' | 'dec' | 'hex'`

The `BASES` object uses `Record<NumberSystem, number>`, ensuring that each supported number system has a corresponding numeric base.

Interfaces and types such as `State` and `PreviousGame` describe the structure of game data.

### 3.6. Avoiding Code Duplication (DRY)

Reusable utility functions help avoid repeating the same implementation in different parts of the application.

For example, `createElement()` centralizes DOM element creation and attribute assignment.

The `BASES` constant provides a single source of truth for predefined number system values instead of repeating these values throughout the application.

### 3.7. Input Validation

Validation is separated from the main game logic.

`isValidGuess()` checks whether a complete guess has the required length, contains valid symbols and has no repeated symbols.

`isValidSymbol()` checks whether an individual symbol belongs to the selected number system.

This separation makes validation reusable and keeps event handlers focused on user interaction.

---

## Conclusion

The application uses modular TypeScript code, explicit data structures and independent game logic functions.

The separation between game logic and UI, reusable utilities, type definitions and unit tests makes the project easier to maintain, extend and verify.
