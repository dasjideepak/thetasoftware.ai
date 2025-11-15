# Detailed Requirements

This document breaks down the assessment into specific, actionable tasks.

## Reference Design

**Figma Link**: [View the reference design here](https://www.figma.com/design/gZL1X2fSo0MzExOIXNW1hz/Sample-Pages?node-id=1-1390&t=00CymjmcEhM0QfRK-11)

You should replicate the "All Candidates Page" design as accurately as possible. Refer to this Figma file throughout your implementation for spacing, colors, and component details.

## What's Provided vs What You Build

| Component                 | Status             | Your Task                                      |
| ------------------------- | ------------------ | ---------------------------------------------- |
| `SearchInput.tsx`         | ✅ **Complete**    | Use as-is (already integrated into Sidebar)    |
| `Sidebar.tsx`             | ✅ **Complete**    | Use as-is (search, toggle, dropdown pre-built) |
| `CollapsibleSection.tsx`  | 🔶 **Skeleton**    | Add state management and expand/collapse logic |
| `CandidateCard.tsx`       | ❌ **Not started** | Build from scratch matching Figma design       |
| `Pagination.tsx`          | ❌ **Not started** | Build from scratch with navigation             |
| Backend `/api/candidates` | 🔶 **Partial**     | Add search filtering logic                     |

---

## Part 1: Frontend - Filter Sections in Sidebar

### 1.1 Complete the CollapsibleSection Component

**File Location**: `frontend/src/components/CollapsibleSection.tsx`

Use the provided `CollapsibleSection.tsx` skeleton as a starting point:

- [x] Add state management (`useState`) for open/closed state
- [x] Implement click handler to toggle state
- [x] Add conditional rendering for children (only show when open)
- [x] Make chevron rotate 90deg when collapsed (points right) vs expanded (points down)
- [x] The styling is already provided in the skeleton

### 1.2 Add Filter Sections to Sidebar

In the Sidebar component's filter sections area, add 8 CollapsibleSection components:

**Important:** For the core assessment, these filter sections are **visual only**. They should expand/collapse, but do not need functional checkboxes or filter logic.

- [x] Application Type
- [x] Jobs
- [x] CRM
- [x] Profile Details
- [x] Source
- [x] Responsibility
- [x] Pipeline Tasks
- [x] Education

**Example:**

```tsx
<CollapsibleSection title="Application Type">
  {/* Empty is fine for core requirements */}
</CollapsibleSection>
```

**Note:** The CollapsibleSection skeleton already has the correct styling. You just need to make it functional.

---

## Part 2: Frontend - Main Content

### 2.1 Results Summary

- [x] Display "Showing X candidate applications" (X = current filtered count)
- [x] Include info tooltip icon (visual only, doesn't need to show tooltip)
- [x] **OPTIONAL:** Show active filter tags (e.g., "Active", "Open Jobs")

### 2.2 Action Buttons (Visual Only)

- [x] "Generate Report" button (styled to match design)
- [x] "+ Add Candidate" button (styled to match design)
- [x] "Bulk Actions" button (styled to match design)
- [x] **These buttons don't need click functionality**

### 2.3 Candidate List Header

- [x] Two columns: "Name" and "Job/Status"
- [x] Match the design styling

### 2.4 Candidate Card/Row Component

Each candidate should display:

- [x] **Name** (clickable link, blue text)
- [x] **Position/Company** (gray text below name)
- [x] **Job Title** (e.g., "Digital Marketing Specialist (O26)")
- [x] **Status** (e.g., "Application Review", "Former Manager")
- [x] **Action Link** (e.g., "Collect Feedback")

For candidates with interview stages:

- [x] **Availability section** with status badge ("Not Requested")
- [x] "Request Availability" link
- [x] **Interviews heading**
- [x] List of interview stages with "Schedule manually" and "Automated scheduling" links
- [x] Ellipsis menu (...) for each interview

**Component Structure Suggestion:**

```
<CandidateCard>
  <CandidateHeader /> {/* Name, position */}
  <CandidateJob /> {/* Job title, status */}
  <CandidateAvailability /> {/* If applicable */}
  <CandidateInterviews /> {/* If applicable */}
</CandidateCard>
```

### 2.5 Data Display

- [x] Display 5 candidates per page
- [x] Match the exact layout from the Figma design
- [x] Include proper spacing and borders between candidates

---

## Part 3: Frontend - Pagination

### 3.1 Pagination Component

**Important:** With 20 candidates at 5 per page, you'll have exactly **4 pages**.

- [x] Show page numbers: **1, 2, 3, 4** (simple, no ellipsis needed)
- [x] Highlight current page (gray background, border)
- [x] Left/right arrow buttons (← →)
- [x] **Clicking a page changes the displayed candidates**
- [x] Disable left arrow on page 1
- [x] Disable right arrow on page 4

### 3.2 Pagination Logic

- [x] **Use client-side pagination** for this assessment
- [x] Fetch all candidates from backend once
- [x] Slice in frontend: `candidates.slice((page-1) * 5, page * 5)`
- [x] Calculate total pages: `Math.ceil(filteredCandidates.length / 5)`

### 3.3 Edge Cases

Handle these scenarios:

- **Empty search results**: Display a "No candidates found" message or empty state
- **Page out of bounds**: Show empty candidate list but keep pagination visible
- **API errors**: Log errors to console (displaying error UI is optional bonus)

---

## Part 4: Backend - FastAPI

### 4.1 Main Endpoint: GET /api/candidates

**Query Parameters:**

```
search: str = ""        # Search term (optional)
```

**Response Format:**

```json
{
  "candidates": [...],    # Array of ALL matching candidates
  "total": 20            # Total count after filtering
}
```

### 4.2 Filtering Logic

- [x] Filter by search term (search in `name`, `position`, and `company` fields)
- [x] Make search case-insensitive (use `.lower()`)
- [x] If no search term, return all candidates

**Note:** Pagination will be handled client-side. The backend returns all matching candidates.

### 4.3 CORS Setup (Already Done)

- CORS is already configured in the starter code
- No action needed!

---

## Part 5: Integration & Testing

### 5.1 Connect Frontend to Backend

- [x] Use fetch to call FastAPI endpoint
- [x] Handle loading states (optional: show skeleton loaders)
- [x] Handle errors gracefully

### 5.2 Testing

- [x] Test search filtering (type in search box, candidates filter)
- [x] Test pagination navigation (click pages, candidates change)
- [x] Verify visual accuracy matches Figma
- [x] Verify no console errors

### 5.3 Visual Polish

- [x] Match spacing from design
- [x] Match colors from design (see designs/specs.md)
- [x] Add hover states to interactive elements

---

## Stretch Goals (If you finish early)

### Enhanced Functionality

- [x] Make the sort dropdown actually work (change sort order of candidates)
- [x] Make filter sections expand/collapse on click
- [x] Add filter functionality (filter by job, source, etc.)
- [ ] URL state management (page number in URL query params)
- [x] Loading states while fetching from API
- [x] Hover animations and transitions

### Code Quality

- [x] Comprehensive TypeScript types for all props
- [x] Extract reusable components
- [x] Add JSDoc comments to functions
- [x] Clean up any console warnings

---

## Time Management Tips

**Time Budget:** 1 hour and 30 minutes total

**Focus areas:**

1. **Filter sections** - Complete CollapsibleSection, add 8 sections
2. **Candidate cards** - Build CandidateCard component matching design (main focus)
3. **Pagination** - Build Pagination component with navigation
4. **Backend** - Implement search filter logic
5. **Integration** - Wire components together, test functionality

**If you finish early:**

- Polish visual details (hover states, transitions)
- Add loading states
- Improve error handling

**Remember:** We value working core functionality and visual accuracy over advanced features!

---

## Summary: What to Build

**You're building:**

1. ✅ Filter sections (8 collapsed rows in sidebar)
2. ✅ Action buttons (3 buttons: Generate Report, Add Candidate, Bulk Actions)
3. ✅ Candidate cards matching design exactly (with interview stages)
4. ✅ Pagination component with working navigation
5. ✅ FastAPI endpoint with search filtering

**Pre-built for you:**

- ✅ Sidebar with search, toggle, dropdown, reset button (complete)
- ✅ SearchInput with 300ms debounce (complete)
- ✅ CollapsibleSection skeleton (you add state & logic)
- ✅ TypeScript types
- ✅ Project setup (React + Vite + TailwindCSS + FastAPI)

---

## Evaluation Criteria

Your submission will be evaluated on 100 points:

### 1. Visual Accuracy (25 points)

- CandidateCard matches design spacing, colors, and typography (15 pts)
- Filter sections styled correctly with expand/collapse functionality (7 pts)
- Pagination matches design (3 pts)
- Proper use of TailwindCSS utilities
- **Note**: We evaluate designs visually. Your implementation should closely approximate the Figma reference. Match colors exactly, spacing within 2-4px, and use the correct typography scale. Exact pixel perfection is not required.
- **Bonus**: All 8 filter sections implemented (+2 pts, not required for full 25)

### 2. Component Structure (25 points)

- Well-organized, modular components
- Logical component hierarchy for CandidateCard
- Reusable components where appropriate
- Clean file structure and imports

### 3. Functionality (35 points)

- Search filtering works correctly (debounced via pre-built component)
- Pagination works correctly (page changes, correct candidates shown)
- Backend endpoint implements search and pagination properly
- All candidate information displays correctly
- Interview stages display for applicable candidates

### 4. TypeScript Usage (15 points)

- Proper type definitions for all component props
- **No use of `any` type** (explicit or implicit)
- Correct typing for API responses using defined types
- Good use of interfaces/types from types/candidate.ts

### Bonus Points

- Clean, readable code with good naming
- Helpful comments where logic is complex
- Error handling for API calls
- Accessibility considerations (ARIA labels, keyboard navigation)
