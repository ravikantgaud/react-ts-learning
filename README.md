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
