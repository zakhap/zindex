# Z-Index: A Book Engine by ZakCorp

An experimental book recommendation engine that serves as your underground literary oracle. Built with a distinctive terminal aesthetic, Z-Index connects readers with avant-garde, experimental, and counterculture literature based on vibes and intellectual curiosities rather than algorithmic popularity.

## ✨ Features

- **Intelligent Recommendations**: Powered by Claude 3.5 Sonnet via OpenRouter, trained to understand experimental and underground literary movements
- **Terminal Aesthetic**: Clean, minimalist interface inspired by command-line tools
- **Typewriter Animations**: Progressive text reveal with authentic typing effects
- **Curated Perspective**: Focuses on 20th century avant-garde, beat poetry, cyberpunk, situationist texts, and cross-disciplinary works
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- OpenRouter API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/book-recommender.git
cd book-recommender
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file and add your OpenRouter API key:
```bash
OPENROUTER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: CSS with custom properties
- **Fonts**: Söhne font family, JetBrains Mono
- **AI**: Claude 3.5 Sonnet via OpenRouter
- **Deployment**: Optimized for Vercel

## 🎨 Design Philosophy

Z-Index embraces a terminal-inspired aesthetic that reflects its role as a literary command-line tool. The interface features:

- Monospace typography mixed with elegant Söhne font
- Typewriter animations that reveal recommendations progressively  
- Minimal color palette focused on readability
- Grid-based layout that adapts to content

## 🧠 AI Personality

The recommendation engine is tuned to be an "underground literary oracle" with deep knowledge of:

- Beat poets and counterculture movements
- Cyberpunk and speculative fiction
- Experimental and Language poetry
- Situationist and political texts
- Cross-disciplinary works (music theory, dance philosophy, hacker culture)
- Contemporary works carrying forward these traditions

## 📁 Project Structure

```
book-recommender/
├── app/
│   ├── api/recommend/route.ts    # OpenRouter API integration
│   ├── globals.css               # Global styles and animations  
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main application component
├── public/fonts/                # Söhne font family files
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies and scripts
```

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Run production server
- `pnpm lint` - Run ESLint

### Key Components

**Search Interface** (`app/page.tsx`)
- Handles user input with terminal-style prompt
- Manages complex animation states for typewriter effects
- Orchestrates API calls and response handling

**Recommendation API** (`app/api/recommend/route.ts`)
- Integrates with OpenRouter's Claude 3.5 Sonnet
- Processes natural language queries about reading preferences
- Returns structured JSON with book recommendations

## 🌐 Deployment

The app is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add your `OPENROUTER_API_KEY` to environment variables
3. Deploy with zero configuration

## 🤝 Contributing

Contributions are welcome! Areas for potential improvement:

- Additional animation effects
- Alternative AI model integrations  
- Enhanced mobile experience
- Accessibility improvements
- Additional font loading optimizations

## 📄 License

This project is open source and available under the MIT License.

---

*"In the vast library of human knowledge, sometimes you need a guide who knows the hidden shelves."*