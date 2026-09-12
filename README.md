# React + TypeScript Learning

A hands-on learning repository for building job-ready React + TypeScript skills.

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