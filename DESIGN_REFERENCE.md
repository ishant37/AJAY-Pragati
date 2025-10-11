# 🎨 PM-AJAY GIA Portal - Visual Design Reference

## Color Palette

### Primary Colors
```
Government Blue
#0B57A4
RGB(11, 87, 164)
Primary brand color
```

```
Action Green
#2E7D32
RGB(46, 125, 50)
Success & CTAs
```

### Background Colors

**Light Mode:**
```
Default: #F7F9FC
Paper: #FFFFFF
```

**Dark Mode:**
```
Default: #121212
Paper: #1E1E1E
```

### Status Colors
```
Success (Approved): #4CAF50 🟢
Warning (Pending): #FF9800 🟠
Error (Rejected): #F44336 🔴
Info (Review): #2196F3 🔵
```

---

## Typography

### Font Families
- Primary: **Roboto**
- Secondary: **Noto Sans**
- Fallback: Sans-serif

### Headings
```
H1: 2.5rem (40px) - Page titles
H2: 2rem (32px) - Section titles
H3: 1.75rem (28px) - Subsections
H4: 1.5rem (24px) - Card titles
H5: 1.25rem (20px) - Small headings
H6: 1rem (16px) - Labels
```

### Body Text
```
Body1: 1rem (16px) - Main content
Body2: 0.875rem (14px) - Secondary text
Caption: 0.75rem (12px) - Meta info
```

---

## Component Spacing

### Padding
```
Small: 8px (1 unit)
Medium: 16px (2 units)
Large: 24px (3 units)
X-Large: 32px (4 units)
```

### Margins
```
Section spacing: 32-64px
Card spacing: 16-24px
Element spacing: 8-16px
```

### Border Radius
```
Default: 8px
Cards: 12px
Buttons: 8px
Pills: 20px
```

---

## Breakpoints

### Mobile First Design
```
xs (extra-small): 0px - 600px
  - Single column layout
  - Hamburger menu
  - Stacked cards

sm (small): 600px - 960px
  - 2 column grid
  - Responsive tables
  - Drawer menu

md (medium): 960px - 1280px
  - 3-4 column grid
  - Horizontal navbar
  - Side-by-side layouts

lg (large): 1280px - 1920px
  - Full desktop layout
  - Maximum 1280px container

xl (extra-large): 1920px+
  - Wide screen layout
  - Maximum 1536px container
```

---

## Component Design Specs

### Navbar
```
Height: 64px (desktop), 56px (mobile)
Position: Sticky
Elevation: 2
Background: Paper color
Logo size: 24px height
```

### Hero Section
```
Min height: 80vh (desktop), 70vh (mobile)
Background: Linear gradient (Primary → Secondary)
Pattern overlay: SVG dots at 5% opacity
Text color: White
Shadow: 2px 2px 4px rgba(0,0,0,0.3)
```

### Overview Cards
```
Min height: 150px
Padding: 24px
Border left: 5px solid (color)
Icon size: 40px
Icon background: Color at 15% opacity
Hover: translateY(-8px) + shadow
```

### Dashboard Table
```
Row height: 52px
Header background: action.hover
Hover: background change
Cell padding: 16px
Border: 1px solid divider
```

### Charts
```
Height: 350px (default)
Grid color: theme.palette.divider
Axis color: text.secondary
Bar radius: [8, 8, 0, 0]
Line width: 3px
Dot radius: 6px
```

### Buttons
```
Height: 40px (medium), 48px (large)
Padding: 10px 24px
Border radius: 8px
Font weight: 500
Text transform: none
Hover: translateY(-2px) + shadow
```

### Accordions
```
Border radius: 8px
Elevation: 2
Margin bottom: 16px
Padding: 16px
Hover: action.hover background
```

---

## Icon Sizes

### Standard Icons
```
Small: 20px
Medium: 24px (default)
Large: 32px
X-Large: 40px
```

### Card Icons
```
Overview cards: 40px
Feature cards: 35px
List items: 24px
Buttons: 20px
```

---

## Shadow Elevations

```
Level 0: none
Level 1: 0px 2px 4px rgba(0,0,0,0.05)
Level 2: 0px 4px 8px rgba(0,0,0,0.08)
Level 3: 0px 6px 12px rgba(0,0,0,0.1)
Level 4: 0px 8px 16px rgba(0,0,0,0.12)
Level 6: 0px 16px 32px rgba(0,0,0,0.18)
```

### Usage
```
Cards: elevation={2}
Modal: elevation={4}
AppBar: elevation={2}
Hover state: elevation={6}
```

---

## Animation Timing

### Transitions
```
Fast: 0.2s ease
Default: 0.3s ease
Slow: 0.5s ease
```

### Common Animations
```
Hover transform: 0.3s ease
Color change: 0.2s ease
Slide in: 0.4s ease-out
Fade: 0.3s ease-in-out
```

### Custom Animations
```
Float (Hero): 3s ease-in-out infinite
Pulse: 2s ease-in-out infinite
Rotate: 0.5s ease (on click)
```

---

## Grid System

### Container
```
Max width: xl (1536px)
Padding: 24px (desktop), 16px (mobile)
Margin: auto (centered)
```

### Grid Spacing
```
xs: spacing={2} (16px)
sm: spacing={3} (24px)
md: spacing={4} (32px)
```

### Column Layout
```
Mobile (xs): 12 columns (100%)
Tablet (sm): 6 columns (50%)
Desktop (md): 4 columns (33%)
Wide (lg): 3 columns (25%)
```

---

## Accessibility

### Contrast Ratios
```
Normal text: 4.5:1 minimum
Large text: 3:1 minimum
Interactive elements: 3:1 minimum
```

### Focus States
```
Outline: 2px solid primary
Offset: 2px
Border radius: inherit
```

### Touch Targets
```
Minimum size: 44x44px
Spacing: 8px minimum
Button padding: 16px
```

---

## Status Indicators

### Chip Colors
```
Approved: success.main (#4CAF50)
Pending: warning.main (#FF9800)
Under Review: info.main (#2196F3)
Rejected: error.main (#F44336)
```

### Badge Positions
```
Top-right: overlap circular
Inline: rectangular
```

---

## Loading States

### Skeleton Loader
```
Animation: pulse
Background: action.hover
Height: Component height
Border radius: Inherit
```

### Progress Indicators
```
Circular: 40px diameter
Linear: 4px height
Color: primary.main
```

---

## Form Elements

### Input Fields
```
Height: 56px (default)
Border: 1px solid divider
Border radius: 8px
Focus: 2px solid primary
Label: body2 + text.secondary
```

### Dropdowns
```
Menu elevation: 8
Max height: 300px
Item height: 48px
Selected: primary.main background
```

---

## Page Layouts

### Standard Page
```
- Navbar (sticky)
- Hero/Header section
- Container (maxWidth="xl")
- Content sections (py: 4-8)
- Footer (mt: auto)
```

### Dashboard Layout
```
- Metrics row (4 cards)
- Filters row
- Data table/content
- Pagination
```

### Chart Page Layout
```
- Header with filters
- Grid of charts (8-4-4 split)
- Legend components
- Export actions
```

---

## Responsive Patterns

### Mobile (< 600px)
- Single column
- Stacked navigation
- Full-width cards
- Vertical CTAs

### Tablet (600-960px)
- 2 column grid
- Collapsible sidebar
- Responsive tables
- Grouped CTAs

### Desktop (> 960px)
- Multi-column grid
- Horizontal navigation
- Full data tables
- Inline CTAs

---

## Best Practices

### Performance
✅ Lazy load images
✅ Code splitting
✅ Memoize components
✅ Optimize re-renders

### Accessibility
✅ Semantic HTML
✅ ARIA labels
✅ Keyboard navigation
✅ Screen reader support

### Responsive
✅ Mobile-first
✅ Flexible grids
✅ Scalable units
✅ Touch-friendly

### Maintainability
✅ Component reuse
✅ Consistent naming
✅ Clear structure
✅ Documentation

---

## Design Tokens Summary

```javascript
// Colors
primary: '#0B57A4'
secondary: '#2E7D32'

// Spacing (8px base)
spacing: (factor) => factor * 8

// Typography
fontFamily: 'Roboto, Noto Sans, sans-serif'

// Shadows
elevation: [0, 2, 4, 6, 8, 16, 24]

// Breakpoints
xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920

// Border Radius
shape.borderRadius: 8

// Transitions
duration: 300ms
easing: 'ease'
```

---

**Reference this guide when customizing the portal!** 🎨
