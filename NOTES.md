# Submission Notes

**Candidate Name**: Deepak Sharma
**Date**: 15th Nov, 2025
**Time Spent**: 6-7 hours

## What I Completed

### Frontend

- [x] Sidebar search input
- [x] Full Text Search toggle
- [x] Sort dropdown
- [x] Collapsible filter sections
- [x] Reset Filters button
- [x] Candidate list display
- [x] Candidate card components
- [x] Pagination component
- [x] Search filtering functionality
- [x] Sort functionality
- [x] Pagination logic

### Backend

- [x] GET /api/candidates endpoint
- [x] Filtering by search term
- [x] Sorting logic
- [x] Pagination logic
- [x] CORS configuration

### Styling

- [x] Visual accuracy to design
- [x] Hover states
- [x] Focus states
- [x] Responsive layout (if attempted)

## What I Would Do With More Time

If I had more time, here's what I'd focus on:

**Testing** - I'd add unit tests for the main components and some integration tests to make sure everything works together.

**Performance** - For larger lists, I'd add virtualization so it doesn't slow down with hundreds of candidates. Could also memoize some components to prevent unnecessary re-renders.

**Better UX** - Would be nice to save the search and filter state in the URL so users can bookmark or share specific views. Some smooth animations would make it feel more polished too.

**More Features** - Keyboard shortcuts would be helpful (like Cmd+K for search). Bulk actions for selecting multiple candidates would be useful. Maybe add export to CSV.

**Code Organization** - I'd move the API calls into a separate service file to keep things cleaner. Error boundaries would help catch issues better. Some logging would make debugging easier.

**Accessibility** - Could improve keyboard navigation and make sure screen readers work well with all the dynamic content.

## Libraries/Packages Added

- `@tabler/icons-react` – installed for adding icon support in the React app

[If you added any packages beyond the starter, list them here with explanations]

## AI Tools Used

I used a few AI tools while building this:

- **Claude Code**: Helped me figure out FastAPI since I'm more familiar with Node.js backends. Used it mainly for the `/api/candidates` endpoint structure and getting the query params right. Also helped with the search and pagination logic and used it a couple times when I hit TypeScript errors or needed a quick answer on React patterns.
- **GitHub Copilot**: Had it running in the background for autocomplete. Mostly used it for React/TypeScript boilerplate and when I was stuck on UI stuff.

Overall, these tools saved me time, especially with FastAPI since it was new to me. They helped me move faster on syntax and patterns I wasn't super familiar with.

## Challenges & Solutions

**Filter state management** - Used a Record<string, boolean> pattern for filter state which keeps the API mapping straightforward. The main consideration was ensuring filter changes properly trigger re-fetches without unnecessary API calls.

**Design system consistency** - Replaced hardcoded hex values with Tailwind utilities based on designs/specs.md. Mapped design tokens to Tailwind's color scale (gray-900 for primary text, blue-600 for links) to maintain consistency while leveraging the utility classes.

**Event handling in nested components** - The card expansion needed careful event management to prevent inner link clicks from bubbling up. Used stopPropagation strategically to isolate interactive elements while maintaining the card-level expand behavior.

**API parameter transformation** - Different filter types required different serialization (arrays for multi-select, strings for booleans). Built a mapping function that normalizes the filter state into the expected API format.

**Responsive sidebar behavior** - Implemented a transform-based slide-in overlay for mobile that transitions to a static sidebar on desktop.

## Additional Notes

**Component architecture** - Broke down CandidateCard and CandidateList into smaller, focused components for better maintainability. CandidateCard splits into CandidateHeader, CandidateJob, CandidateAvailability, and CandidateInterviews. CandidateList uses separate components for loading, error, empty, and content states.

**Loading states** - Implemented skeleton loaders that match the candidate card layout. Shows during API fetches to provide visual feedback and maintain layout stability.

**Expandable candidate cards** - Cards with interviews are expandable on click. The expand icon only appears for candidates that have interviews. Initially collapsed, cards show only essential info (name, position, job title, status). Clicking expands to reveal availability and interview details. Used event isolation to prevent inner link clicks from triggering expansion.

**Error handling** - Added comprehensive error handling with user-friendly messages. Distinguishes between network errors and API errors, providing actionable feedback when the backend isn't running.

**Code organization** - Separated concerns with clear component boundaries. Each component has a single responsibility, making the codebase easier to maintain and test.

**Deployment** - Both frontend and backend are deployed to Vercel. The frontend is a static React build, and the backend FastAPI app runs on Vercel's serverless functions.
