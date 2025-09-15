# DSA Visualizer

Interactive Data Structures and Algorithms Visualizer with Authentication and Billing.

## Features

- 🔐 **Authentication**: Email/passwordless and OAuth (GitHub, Google) via NextAuth.js
- 💳 **Billing**: Stripe integration for premium subscriptions
- 🌳 **Visualizations**: Interactive algorithm visualizations including AVL trees
- 🎨 **Modern UI**: Built with Next.js 14, TypeScript, and Tailwind CSS
- 📊 **Database**: Prisma ORM with SQLite

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd dsa
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Initialize the database:**
   ```bash
   npm run migrate
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## Environment Setup

### Required Environment Variables

Copy `.env.example` to `.env` and configure:

- `DATABASE_URL`: SQLite database file path
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)
- `NEXTAUTH_SECRET`: Random secret for NextAuth.js

### Authentication Providers (Optional)

For GitHub OAuth:
- `GITHUB_ID`: GitHub OAuth app client ID
- `GITHUB_SECRET`: GitHub OAuth app client secret

For Google OAuth:
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

### Stripe Configuration

- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Webhook secret from Stripe CLI or dashboard
- `STRIPE_PRICE_PRO_MONTH`: Price ID for monthly subscription
- `STRIPE_PRICE_PRO_YEAR`: Price ID for yearly subscription
- `STRIPE_BILLING_PORTAL_RETURN_URL`: Return URL for billing portal

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run migrate` - Run Prisma migrations

## Testing Webhooks Locally

Install Stripe CLI and forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Use the webhook secret provided by the CLI in your `.env` file.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── algorithms/        # Algorithm visualization pages
│   ├── account/          # User account page
│   └── pricing/          # Pricing page
├── components/            # React components
├── lib/                  # Utility libraries
│   ├── auth/             # Authentication utilities
│   ├── stripe/           # Stripe integration
│   └── algorithms/       # Algorithm implementations
└── prisma/               # Database schema and migrations
```

## Algorithms

### Available Algorithms

- **Free Tier**: Basic sorting, binary search
- **Premium Tier**: AVL trees, advanced data structures

### Adding New Algorithms

1. Create algorithm implementation in `src/lib/algorithms/`
2. Register in `src/lib/algorithms/index.ts`
3. Add code samples in `src/lib/codeSamples.ts`
4. Update visualization logic in `AlgorithmPlayer.tsx`

## Deployment

1. **Set up production database** (PostgreSQL recommended)
2. **Configure environment variables** in your hosting platform
3. **Set up Stripe webhooks** with your production URL
4. **Deploy** using your preferred platform (Vercel, Railway, etc.)

## Premium Features

Premium subscription unlocks:
- Advanced tree algorithms (AVL, Red-Black)
- Graph algorithms
- Complete code samples in multiple languages
- Priority support
- Export capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details