# React + TypeScript Learning

A hands-on learning repository for building job-ready React + TypeScript skills.

## Learning Approach

Learn → Practice → Build → Debug → Explain → Commit → Push

## Day 1 — React Fundamentals

### Topics Learned

- JSX
- Functional Components
- Props
- TypeScript Props
- Conditional Rendering
- Array Rendering with `map()`
- React `key`
- Object Props
- Reusable Components

### Practice

- Header Component
- UserCard Component
- ProductCard Component
- EmployeeCard Component
- Dynamic User List
- Dynamic Product List

### Key Learnings

- React components are reusable pieces of UI.
- Props are read-only data passed from parent to child.
- `map()` is used to render UI dynamically from arrays.
- Each item in a dynamic list should have a stable `key`.
- TypeScript helps define the expected shape of component props.
- Passing an object as a prop can be useful when a component works with a complete domain entity.

## Project Structure

src/
├── components/
│   ├── Header.tsx
│   ├── UserCard.tsx
│   ├── ProductCard.tsx
│   └── EmployeeCard.tsx
└── App.tsx

## Learning Approach

Learn → Practice → Build → Refactor → Explain → Commit → Push

## Day 2 - State, Events and Forms

### Topics Learned

- useState
- State updates
- Functional state updates
- Controlled inputs
- Event handling
- TypeScript event typing
- Form submission
- Immutable state updates
- map()
- filter()
- Derived data

### Practice

- Employee form
- Add employee
- Delete employee
- Search employee

### Key Learnings

- React state controls dynamic UI.
- Controlled inputs keep form values in React state.
- State should not be mutated directly.
- Functional updates are useful when the next state depends on the previous state
- Derived data can be calculated instead of stored separately.

## Day 3 — API Integration with React + TypeScript

### Topics Learned

- useEffect
- fetch()
- async/await
- API response handling
- TypeScript API response types
- Loading state
- Error handling
- response.ok
- try/catch/finally
- Retry functionality
- Controlled search input
- Array filter()
- Derived data
- API data transformation/mapping

### Practice

- Fetched employee data from DummyJSON API
- Displayed API data in React UI
- Added loading state
- Added error state and Retry functionality
- Added employee search
- Added "No employees found" state
- Transformed API user data into application Employee model

### Key Learnings

- useEffect can be used to perform API-related side effects.
- fetch() returns a Response object, which can be parsed using response.json().
- response.ok should be checked to handle HTTP errors such as 404 or 500.
- The original API data should be kept as the source data while search results can be derived using filter().
- Derived data does not always need separate state.
- API models and application models can be different.
- Data transformation helps reduce coupling between the backend response and UI components.
- TypeScript provides compile-time type checking but does not validate API responses at runtime.

### API Used

DummyJSON Users API:

https://dummyjson.com/users

## Day 4 — React Router and SPA Structure

### Topics Learned

- Client-side routing
- BrowserRouter
- Routes and Route
- Nested routes
- Outlet
- Link and NavLink
- Index route
- Dynamic routes
- useParams
- Page vs component structure

### Practice

- Dashboard route
- Employees route
- Products route
- Employee details route
- Dynamic employee ID route
- 404 Not Found route
- Shared application layout
- View Details navigation

### Key Learnings

- Client-side routing allows navigation between views without full document navigation.
- Layout routes can render child routes through Outlet.
- Dynamic route parameters can be accessed using useParams.
- Link is useful for normal application navigation, while NavLink is useful when active-link styling is needed.
- Pages represent route-level screens, while components represent reusable UI building blocks.

## Day 5 — Route-based API Fetching

### Topics Learned

- Dynamic route parameters
- useParams
- Route-based API calls
- useEffect dependencies
- Single-resource API fetching
- Loading state
- Error handling
- Retry functionality
- API model vs application model
- Data transformation

### Practice

- Employee details route
- Fetch employee by ID
- Dynamic `/employees/:id` route
- API response mapping
- Loading and error states
- Retry functionality
- Back to employee list

### Key Learnings

- Route parameters can drive API requests.
- A route parameter can be used as a dependency of useEffect.
- List and detail API responses can have different TypeScript models.
- API data can be transformed into an application-specific model before storing it in state.
- Async data can be represented with nullable state such as `Employee | null`.

## Day 6 — State Management with Context API & Redux Toolkit

### Part 1 — State Management Decisions

Learned how to decide where application state should live:

* Local component state using `useState`
* Lifting state up
* Context API for shared state
* Redux Toolkit for shared/complex application state

### Part 2 — Theme Context

Implemented a Theme Context with a custom `useTheme()` hook.

Learned:

* `createContext`
* `useContext`
* Context Provider
* Custom hooks
* Sharing theme state across components

### Part 3 — Redux Toolkit Favorites

Implemented Redux Toolkit for managing favorite employees.

Created:

* Redux store using `configureStore`
* Favorites slice using `createSlice`
* Typed Redux hooks using `useAppDispatch` and `useAppSelector`
* Redux `<Provider>`
* `addFavorite` and `removeFavorite` actions
* Duplicate favorite protection

### Redux State Design

Redux stores only employee IDs:

```ts
favoriteEmployeeIds: number[]
```

Employee details remain in API/application state.

This avoids duplicating employee objects and keeps a clear separation between:

* API/Application state → employee details
* Redux state → favorite employee relationship

### Employee Favorites Flow

```text
Employee API
     ↓
Employee details
     ↓
Employee ID
     ↓
Redux Favorites
     ↓
favoriteEmployeeIds[]
     ↓
isFavorite
     ↓
Add Favorite / Remove Favorite
```

### Key Concepts Learned

* Redux Store
* Slice
* Actions
* Reducers
* `configureStore`
* `createSlice`
* `useSelector`
* `useDispatch`
* Redux Toolkit + TypeScript
* Immer and mutation-style reducer syntax
* Global vs local state
* Avoiding duplicated state
* State invariants / duplicate protection

## Day 7 — Favorites Page with Redux Integration

### What I built

Created a dedicated **Favorites page** that reads favorite employee IDs from Redux and displays the corresponding employee details fetched from the API.

### Features implemented

* Created a dedicated `Favorites.tsx` page.
* Read `favoriteEmployeeIds` from Redux using `useAppSelector`.
* Fetched employee data from the API.
* Added API response error handling.
* Added loading and error states.
* Added Retry functionality.
* Mapped API user data into the application's `Employee` model.
* Used `filter()` and `includes()` to match employee details with favorite employee IDs.
* Added an empty state when no employees are marked as favorites.
* Added `View Details` navigation for favorite employees.
* Added `/favorites` route using React Router.
* Added Favorites navigation link using `NavLink`.

### Redux + API Data Flow

Redux Store
    ↓
favoriteEmployeeIds
    ↓
Favorites Page
    ↓
Fetch employee details from API
    ↓
filter() + includes()
    ↓
Favorite employee details
    ↓
Display in UI


### State Ownership

Redux
→ favoriteEmployeeIds

API / Application State
→ employee details

React Router
→ page navigation

### Key Concepts Learned

* Reading shared Redux state with `useAppSelector`.
* Keeping only IDs in Redux instead of duplicating complete employee objects.
* Using `filter()` to create a filtered employee array.
* Using `includes()` to check whether an employee ID exists in the favorite IDs list.
* Combining Redux state with API data.
* Handling loading, error, retry, and empty states.
* Connecting Redux state with React Router pages.
* Keeping API-owned employee details separate from Redux-owned favorite relationships.

### Architecture Principle

> **API owns employee details; Redux owns the favorite relationship.**

This avoids duplicating employee data in Redux and keeps a clear separation of responsibilities.

### Testing Completed

* Add an employee to favorites.
* Display multiple favorite employees.
* Remove an employee from favorites.
* Verify the empty favorites state.
* Navigate between Employees, Favorites, and Employee Details pages.
* Verify that Redux favorite state is shared correctly between pages.
* Verify API error and Retry handling.

## Day 16 — Hands-on React Testing

### Testing tools
- Vitest
- React Testing Library
- `@testing-library/user-event`
- `@testing-library/jest-dom`

### EmployeeCard tests
- Verify employee information is displayed correctly.
- Verify Active and Inactive states.
- Verify employee status toggles when the button is clicked.

### Employee API tests
- Verify loading state while an API request is pending.
- Verify employee data after a successful API response.
- Verify error handling when the API request fails.
- Verify Retry makes another API request.
- Verify employee search and case-insensitive filtering.
- Verify the empty state when no employees match the search.
- Verify Redux Add Favorite and Remove Favorite interactions.

### Key concepts learned
- Unit testing vs. integration testing
- `getByText`, `queryByText`, and `findByText`
- Mocking API requests with Vitest
- Testing asynchronous UI updates
- Testing user interactions with `userEvent`
- Testing Redux state changes through visible UI behavior

### Run tests

Run tests in watch mode:

```bash
npm run test
```

Run all tests once:

```bash
npm run test:run
```

### Progress
- EmployeeCard: 4 passing tests
- Employee API: 8 passing tests
- Total: 12 passing tests

## Day 17 — Advanced React Testing & Test Quality

### Testing improvements
- Tested the loading state while a Retry API request is pending.
- Tested successful recovery after an API failure.
- Verified that the error message disappears after a successful retry.
- Verified that employee data appears and the loading state clears after recovery.
- Created a `createAppStore()` factory to provide a fresh Redux store for each test.
- Improved test isolation to prevent Redux state from leaking between tests.

### Testing concepts learned
- `findByText()` for elements that appear asynchronously.
- `waitFor()` for assertions that need to be retried until they pass.
- `queryByText()` for checking whether an element is absent.
- Unit testing vs. integration testing.
- Testing API loading, error, retry, and recovery states.
- Testing Redux interactions through observable UI behavior.

### Files updated
- `src/app/store.ts`
- `src/features/EmployeeApi.test.tsx`
- `README.md`

### Validation
- TypeScript check: `npx tsc --noEmit`
- Test command: `npm run test:run`
- EmployeeCard tests: 4 passed
- Employee API tests: 10 passed
- Total: 14 tests passed across 2 test files

### Testing maintainability
- Debug log cleanup
- Reusable renderWithProviders() test helper
- Fresh Redux store per test
- Shared mock employee fixtures
- getByText() vs queryByText() vs findByText()
- Flaky-test prevention and asynchronous UI assertions
- Validation commands: npx tsc --noEmit and npm run test:run

## Day 23 — Advanced React Testing

### Topics Learned

- Asynchronous React testing
- API race conditions
- AbortController
- useEffect cleanup
- Stale response prevention using an `isActive` flag
- Loading, success, and error state transitions
- API retry testing
- Deferred Promises
- Testing out-of-order API responses
- `findByText()` vs. `waitFor()`
- Testing component unmount and request cancellation

### Practice

- Tested loading state disappearance after a successful API response.
- Tested API error handling.
- Tested Retry functionality with sequential mocked API responses.
- Verified that a successful retry displays employee data and removes the error message.
- Tested AbortController cleanup when the component unmounts.
- Created a deferred Promise helper to control API response timing.
- Simulated multiple search requests resolving out of order.
- Verified that an older API response cannot overwrite the latest search result.

### Key Concepts Learned

- `findBy` waits for an element to appear asynchronously.
- `waitFor` retries an assertion until it passes or times out.
- `AbortController` attempts to cancel an ongoing API request.
- The cleanup function of `useEffect` runs before the effect executes again when its dependencies change.
- Each effect execution can maintain its own `isActive` flag.
- An `isActive` flag prevents stale API responses from updating component state.
- AbortController and stale-response protection solve related but different problems.
- API race conditions can cause older responses to overwrite newer results if they are not handled properly.
- Testing out-of-order responses helps verify that search results remain consistent.

### Files Updated

- `src/features/EmployeeApi.tsx`
- `src/features/EmployeeApi.test.tsx`
- `README.md`

### Validation

- TypeScript check: `npx tsc --noEmit`
- Test command: `npm run test:run`
- EmployeeCard tests: 4 passed
- Employee API tests: 16 passed
- EmployeeForm tests: 7 passed
- **Total: 27 tests passed across 3 test files**

### Testing Principles

- Test asynchronous behaviour through observable UI changes.
- Verify both successful and unsuccessful API scenarios.
- Test request cancellation and stale-response protection.
- Prefer isolated, deterministic tests using controlled API responses.

## Day 24 – Advanced Vitest Mocking and Mock Cleanup

### Topics Covered

- `vi.fn()` vs `vi.spyOn()`
- `mockReturnValue()` vs `mockImplementation()`
- `mockResolvedValueOnce()` vs `mockRejectedValueOnce()`
- Default mock implementations and one-time overrides
- `mockClear()` vs `mockReset()` vs `mockRestore()`
- `vi.clearAllMocks()` vs `vi.resetAllMocks()` vs `vi.restoreAllMocks()`
- Centralized mock cleanup using `afterEach()`
- Spying on existing service methods and global `fetch`

### Hands-on Practice

Created an employee service with:
- `getEmployeeCount()` – Returns the employee count.
- `getEmployees()` – Fetches employees from an API and handles unsuccessful HTTP responses.

Created `employeeService.test.ts` to verify:

1. Spying on an existing service method.
2. Overriding the original return value using `mockReturnValue()`.
3. Restoring the original implementation using `mockRestore()`.
4. Mocking global `fetch` using `vi.spyOn()`.
5. Testing successful API responses using `mockResolvedValue()`.
6. Testing unsuccessful API responses using `rejects.toThrow()`.
7. Cleaning up spies centrally using `afterEach()` and `vi.restoreAllMocks()`.

### Key Learnings

- `vi.fn()` creates a new mock function, while `vi.spyOn()` monitors an existing method.
- `mockReturnValue()` provides a fixed value, while `mockImplementation()` executes custom logic.
- One-time mock implementations take priority over default implementations.
- `mockClear()` clears call history without removing the implementation.
- `mockReset()` clears call history and removes the mock implementation.
- `mockRestore()` restores the original implementation of a spy.
- Global cleanup methods apply corresponding operations across mocks.
- Mocking `fetch` allows testing service logic without making real API requests.

### Files Created / Updated

- `src/services/employeeService.ts`
- `src/services/employeeService.test.ts`

### Validation

- Full project test suite: 30 tests passed across 4 test files.
- TypeScript validation: `npx tsc --noEmit` completed successfully (exit code 0).

### Important Testing Principles

- Mock only external dependencies when testing service logic.
- Restore spies to prevent test pollution.
- Use `afterEach()` for centralized cleanup.
- Verify observable results and expected function calls.