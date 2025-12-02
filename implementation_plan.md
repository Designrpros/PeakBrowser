# Build Fix Plan

## Problem
The build failed due to `react/no-unescaped-entities` errors in `src/app/course/page.tsx`. There are unescaped double quotes in the JSX.
There are also linting warnings for unused variables in several files.

## Steps

### 1. Fix Errors in `src/app/course/page.tsx`
- Locations: Lines 350, 384, 388, 415.
- Action: Replace `"` with `"` or proper escaping.

### 2. Fix Warnings
- `src/app/docs/page.tsx`: Remove unused `Command` and `PenTool`.
- `src/components/NavBar.tsx`: Remove or underscore unused `isWebApp`.
- `src/components/WebApp/Kanban.tsx`: Remove unused `handleDragLeave`.

## Verification
- Run `npm run build` to ensure success.