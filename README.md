# � CodeType - Cloud-Powered Typing Practice

A modern typing practice application with **cloud sync** powered by Supabase.

## ✨ Features

### � Core Features
- **Multiple Languages**: JavaScript, Python, TypeScript, Java
- **Difficulty Levels**: Easy, Medium, Hard
- **Real-time Stats**: WPM, accuracy, time tracking
- **Character Analysis**: Detailed keystroke breakdown
- **23 Premium Themes**: Including cozy and professional themes

### ☁️ Cloud Features (Supabase)
- **Cross-Device Access**: Access your data from any device
- **Secure Authentication**: Email/password login
- **Cloud Storage**: Unlimited test history
- **Real-time Sync**: Instant data synchronization
- **Leaderboard Ready**: Compare with other users
- **Automatic Backup**: Never lose your progress

### � Analytics
- **Performance Dashboard**: Track progress over time
- **Advanced Analytics**: Filter by Today, Yesterday, This Week
- **Detailed Insights**: Character-level analysis
- **Achievement System**: Unlock achievements as you improve

## � Quick Start

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Set Up Supabase Database

1. Go to [Supabase Dashboard](https://app.supabase.com/project/zfwqnouufkdkfswmbhmq/sql/new)
2. Copy the content from `supabase-schema.sql`
3. Paste into SQL Editor and click "Run"

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

### 4. Sign Up & Test
1. Open http://localhost:5173
2. Click profile → Sign Up
3. Create an account
4. Complete a typing test
5. Your data syncs to Supabase! ☁️

## � Project Structure

\`\`\`
dev-type/
├── src/
│   ├── components/        # React components
│   ├── contexts/          # React contexts (Auth, Points, Theme)
│   ├── data/             # Code snippets library
│   ├── lib/              # Supabase client & helpers
│   └── services/         # Business logic
├── supabase-schema.sql   # Database schema
└── README.md            # This file
\`\`\`

## � Authentication

Users can:
- ✅ Sign up with email/password
- ✅ Log in securely
- ✅ Access data from any device
- ✅ Automatic localStorage migration on first login

## � Data Storage

### Supabase Tables:
1. **user_profiles** - User info, XP, level, stats
2. **test_history** - All typing test results
3. **achievements** - Unlocked achievements
4. **user_stats** - Detailed statistics

### Security:
- Row Level Security (RLS) enabled
- Users can only access their own data
- Encrypted connections
- Secure API keys

## � Themes

23 beautiful themes including:
- **Dark**: Nord, Dracula, Tokyo Night, Monokai
- **Cozy**: Catppuccin Mocha, Rosé Pine, Lavender Dream
- **Premium**: Midnight Espresso, Forest Night, Velvet Noir
- **Light**: Champagne, Cherry Blossom, Mint Cream

## � Achievement System

Unlock achievements:
- � First Steps - Complete your first race
- � Getting Started - Complete 10 races
- � Dedicated Typer - Complete 50 races
- ✨ Perfectionist - 100% accuracy
- ⚡ Speed Demon - Reach 60 WPM
- � Week Warrior - 7 day streak

## � Analytics Features

### Timeframes:
- Today
- Yesterday
- This Week

### Metrics:
- Average WPM
- Average Accuracy
- Total Sessions
- Consistency Score
- Error Heatmap
- Progress Charts

## �️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage

## � Environment Variables

The app uses these Supabase credentials (configured in `src/lib/supabase.js`):
- Supabase URL: `https://zfwqnouufkdkfswmbhmq.supabase.co`
- Anon Key: (Already configured)

## � Deployment

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`

## � Troubleshooting

### "relation does not exist"
**Fix**: Run the SQL schema in Supabase Dashboard

### "Invalid credentials"
**Fix**: Sign up first, then log in

### Data not syncing
**Fix**: Check browser console for errors, verify you're logged in

## � Documentation

- `supabase-schema.sql` - Complete database schema
- `SUPABASE_SETUP.md` - Detailed setup guide
- `MIGRATION_GUIDE.md` - Migration instructions
- `SUPABASE_SUMMARY.md` - Feature summary

## � Key Features Summary

### For Users:
- � Access from any device
- � Never lose progress
- � Compete on leaderboards
- � Detailed analytics
- � Beautiful themes

### For Developers:
- � Built-in security
- � Scalable architecture
- � Fast performance
- �️ Easy to maintain
- � Modern tech stack

## � Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## � License

MIT License - feel free to use this project for learning or commercial purposes.

## � Credits

Built with ❤️ using React, Supabase, and modern web technologies.

---

**Happy Typing!** �
