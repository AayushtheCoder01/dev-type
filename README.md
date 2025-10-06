# Ì∫Ä CodeType - Cloud-Powered Typing Practice

A modern typing practice application with **cloud sync** powered by Supabase.

## ‚ú® Features

### ÌæØ Core Features
- **Multiple Languages**: JavaScript, Python, TypeScript, Java
- **Difficulty Levels**: Easy, Medium, Hard
- **Real-time Stats**: WPM, accuracy, time tracking
- **Character Analysis**: Detailed keystroke breakdown
- **23 Premium Themes**: Including cozy and professional themes

### ‚òÅÔ∏è Cloud Features (Supabase)
- **Cross-Device Access**: Access your data from any device
- **Secure Authentication**: Email/password login
- **Cloud Storage**: Unlimited test history
- **Real-time Sync**: Instant data synchronization
- **Leaderboard Ready**: Compare with other users
- **Automatic Backup**: Never lose your progress

### Ì≥ä Analytics
- **Performance Dashboard**: Track progress over time
- **Advanced Analytics**: Filter by Today, Yesterday, This Week
- **Detailed Insights**: Character-level analysis
- **Achievement System**: Unlock achievements as you improve

## Ì∫Ä Quick Start

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
2. Click profile ‚Üí Sign Up
3. Create an account
4. Complete a typing test
5. Your data syncs to Supabase! ‚òÅÔ∏è

## Ì≥Å Project Structure

\`\`\`
dev-type/
‚îú‚îÄ‚îÄ src/
‚îÇ   ‚îú‚îÄ‚îÄ components/        # React components
‚îÇ   ‚îú‚îÄ‚îÄ contexts/          # React contexts (Auth, Points, Theme)
‚îÇ   ‚îú‚îÄ‚îÄ data/             # Code snippets library
‚îÇ   ‚îú‚îÄ‚îÄ lib/              # Supabase client & helpers
‚îÇ   ‚îî‚îÄ‚îÄ services/         # Business logic
‚îú‚îÄ‚îÄ supabase-schema.sql   # Database schema
‚îî‚îÄ‚îÄ README.md            # This file
\`\`\`

## Ì¥ê Authentication

Users can:
- ‚úÖ Sign up with email/password
- ‚úÖ Log in securely
- ‚úÖ Access data from any device
- ‚úÖ Automatic localStorage migration on first login

## Ì≥ä Data Storage

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

## Ìæ® Themes

23 beautiful themes including:
- **Dark**: Nord, Dracula, Tokyo Night, Monokai
- **Cozy**: Catppuccin Mocha, Ros√© Pine, Lavender Dream
- **Premium**: Midnight Espresso, Forest Night, Velvet Noir
- **Light**: Champagne, Cherry Blossom, Mint Cream

## ÌøÜ Achievement System

Unlock achievements:
- ÌæØ First Steps - Complete your first race
- Ì∫Ä Getting Started - Complete 10 races
- Ì≤™ Dedicated Typer - Complete 50 races
- ‚ú® Perfectionist - 100% accuracy
- ‚ö° Speed Demon - Reach 60 WPM
- Ì¥• Week Warrior - 7 day streak

## Ì≥à Analytics Features

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

## Ìª†Ô∏è Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage

## Ì≥ù Environment Variables

The app uses these Supabase credentials (configured in `src/lib/supabase.js`):
- Supabase URL: `https://zfwqnouufkdkfswmbhmq.supabase.co`
- Anon Key: (Already configured)

## Ì∫Ä Deployment

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`

## Ì∞õ Troubleshooting

### "relation does not exist"
**Fix**: Run the SQL schema in Supabase Dashboard

### "Invalid credentials"
**Fix**: Sign up first, then log in

### Data not syncing
**Fix**: Check browser console for errors, verify you're logged in

## Ì≥ö Documentation

- `supabase-schema.sql` - Complete database schema
- `SUPABASE_SETUP.md` - Detailed setup guide
- `MIGRATION_GUIDE.md` - Migration instructions
- `SUPABASE_SUMMARY.md` - Feature summary

## ÌæØ Key Features Summary

### For Users:
- Ìºê Access from any device
- Ì≤æ Never lose progress
- ÌøÜ Compete on leaderboards
- Ì≥ä Detailed analytics
- Ìæ® Beautiful themes

### For Developers:
- Ì¥í Built-in security
- Ì≥à Scalable architecture
- Ì∫Ä Fast performance
- Ìª†Ô∏è Easy to maintain
- Ì≥¶ Modern tech stack

## Ì¥ù Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Ì≥Ñ License

MIT License - feel free to use this project for learning or commercial purposes.

## Ìæâ Credits

Built with ‚ù§Ô∏è using React, Supabase, and modern web technologies.

---

**Happy Typing!** Ì∫Ä
