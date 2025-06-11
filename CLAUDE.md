# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server on localhost:3000
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Architecture Overview

This is "Z-Index: A Book Engine by ZakCorp" - a Next.js 15 book recommendation app with a distinctive terminal/CLI aesthetic.

### Core Components

**Frontend (`app/page.tsx`)**
- Single-page React app with terminal-style interface
- Complex typewriter animation system for progressive text reveal
- Custom search input with animated placeholder text
- Real-time character-by-character typing effects for book recommendations

**API (`app/api/recommend/route.ts`)**
- OpenRouter integration using Claude 3.5 Sonnet
- System prompt crafted for underground/avant-garde literary recommendations
- Expects structured JSON response with title, author, description fields
- Returns curated book suggestions based on user's vibe/interests

### Key Technical Details

**Styling**
- Uses Söhne font family (multiple weights) loaded from `/public/fonts/`
- CSS custom properties for consistent theming
- Grid-based responsive layout
- Terminal/CLI aesthetic with monospace accents

**Animation System**
- Multi-stage typewriter effects: title → author → description
- Staggered reveal timing with customizable delays
- Cursor blinking animations throughout the interface
- Loading states with spinner and contextual messaging

**Environment**
- Requires `OPENROUTER_API_KEY` environment variable
- Uses Turbo mode in Next.js config for faster builds
- TypeScript with strict mode enabled

The app positions itself as an "underground literary oracle" focused on experimental, counterculture, and avant-garde book recommendations rather than mainstream suggestions.