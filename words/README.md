```
src/
├── app/                    # Next.js App Router directory
│   ├── (auth)/             # Group auth-related routes
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (game)/             # Group game-related routes
│   │   ├── arena/
│   │   ├── practice/
│   │   └── layout.tsx
│   ├── api/                # API routes
│   │   └── trpc/           # tRPC API handlers
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── game/               # Game-specific components
│   │   ├── board/
│   │   ├── powerups/
│   │   └── scoring/
│   └── shared/             # Shared components
│       ├── layout/
│       └── navigation/
├── lib/                    # Core utilities and configs
│   ├── constants/          # App constants
│   ├── config/             # Configuration files
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript type definitions
├── hooks/                  # Custom React hooks
│   ├── game/               # Game-related hooks
│   ├── auth/               # Auth-related hooks
│   └── shared/             # Shared hooks
├── services/               # External service integrations
│   ├── supabase/           # Supabase client & utils
│   ├── trpc/               # tRPC setup
│   └── api/                # API service layers
├── store/                  # State management
│   ├── game/               # Game state
│   └── user/               # User state
└── styles/                 # Global styles and Tailwind
```