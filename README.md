# DecodeDesk - AI Corporate Speak Translator

A beautiful, production-ready SaaS application that translates corporate jargon into honest, plain English using AI. Built with React, TypeScript, Tailwind CSS, Supabase, and OpenAI.

## ✨ Features

- **AI-Powered Translation**: Uses DeepSeek via OpenRouter to translate corporate speak into honest, witty plain English
- **Real-time Analytics**: Track total translations, popular examples, and daily stats
- **Example Phrases**: Click-to-try corporate jargon examples with usage tracking
- **Anonymous Usage Tracking**: Store translations and analytics without requiring user accounts
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Copy to Clipboard**: Easy sharing of translation results
- **Buzzword of the Day**: Daily rotating corporate buzzword with humor
- **Real-time Updates**: Live analytics and usage counters

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database + Auth)
- **AI**: DeepSeek via OpenRouter API
- **Deployment**: Ready for Vercel, Netlify
- **State Management**: React hooks
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenRouter API account (for DeepSeek access)

### 1. Clone and Install

```bash
git clone <your-repo>
cd decodedesk
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenRouter Configuration (for DeepSeek)
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your URL and anon key
3. Run the migration SQL in the Supabase SQL editor (found in `supabase/migrations/001_initial_schema.sql`)
4. The migration will create:
   - `translations` table for storing user translations
   - `example_phrases` table with pre-populated corporate speak examples
   - `daily_stats` table for analytics
   - Row Level Security policies for anonymous access

### 4. OpenRouter Setup

1. Get an API key from [OpenRouter](https://openrouter.ai/keys)
2. Add it to your `.env` file as `VITE_OPENROUTER_API_KEY`
3. The app uses the DeepSeek model for AI translations

### 5. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` to see the app in action!

## 📊 Database Schema

### `translations`
- `id` - UUID primary key
- `original_text` - The corporate speak input
- `translated_text` - The AI-generated plain English
- `session_id` - Anonymous user session tracking
- `created_at` - Timestamp
- `is_example_used` - Whether this came from clicking an example
- `example_phrase` - Which example was used (if applicable)

### `example_phrases`
- `id` - UUID primary key  
- `phrase` - The corporate speak example
- `usage_count` - How many times it's been clicked
- `created_at` - Timestamp

### `daily_stats`
- `id` - UUID primary key
- `date` - The date
- `total_translations` - Count of translations that day
- `unique_sessions` - Count of unique users that day
- `created_at` - Timestamp

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Netlify

1. Connect your GitHub repo to Netlify  
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Environment Variables for Production

Make sure to set these in your deployment platform:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

## 🎨 Customization

### Adding New Example Phrases

Insert into the `example_phrases` table in Supabase:

```sql
INSERT INTO example_phrases (phrase) VALUES 
('Your new corporate speak phrase here');
```

### Modifying the AI Prompt

Edit the `SYSTEM_PROMPT` in `src/lib/openai.ts` to change how the DeepSeek AI translates corporate speak.

### Styling

The app uses Tailwind CSS with a custom design system. Key colors:
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)  
- Success: Green (#10B981)
- Accent colors for various UI states

## 📈 Analytics Features

- **Total Translations**: Running count of all phrases decoded
- **Example Usage**: Track which examples are most popular
- **Daily Stats**: Track usage over time
- **Buzzword of the Day**: Rotating daily corporate buzzword
- **Anonymous Sessions**: Track users without requiring signup

## 🔒 Security Features

- **Row Level Security**: All database tables have RLS enabled
- **Anonymous Access**: Users can use the app without accounts
- **Input Sanitization**: Protects against XSS and prompt injection
- **Environment Variables**: Secure storage of API keys
- **CORS Protection**: Proper API security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - feel free to use this for your own projects!

## 🎯 Roadmap

- [ ] User accounts and saved translations
- [ ] API rate limiting
- [ ] Custom translation styles
- [ ] Slack/Teams integration
- [ ] Chrome extension
- [ ] Mobile app

---

Built with ❤️ at the World's Largest Hackathon | DecodeDesk

## 🎨 UI/UX Design System

### Brand Colors

#### Primary Colors
- **Purple to Pink Gradient**: `from-purple-600 to-pink-600`
  - Use for: Primary buttons, CTAs, highlights, active states
  - Hover: `from-purple-700 to-pink-700`
  - Example: `bg-gradient-to-r from-purple-600 to-pink-600`

#### Secondary Colors
- **Dark Backgrounds**: `bg-gray-900/90`, `bg-black`
- **Card Backgrounds**: `bg-gray-900/90 backdrop-blur-sm border-gray-600/50`
- **Input Backgrounds**: `bg-gray-800/80 border-gray-600/50`
- **Text Colors**: 
  - Primary: `text-white`
  - Secondary: `text-white/90`
  - Muted: `text-white/70`
  - Disabled: `text-gray-500`

#### Accent Colors
- **Success**: `text-green-500`, `bg-green-500/30 border-green-400/50`
- **Warning**: `text-yellow-400`, `bg-yellow-500/30 border-yellow-400/60`
- **Error**: `text-red-500`, `bg-red-500/30 border-red-400/50`

### Typography
- **Font Family**: Default system font stack (Tailwind's sans-serif)
- **Headings**: `font-bold text-white`
- **Body Text**: `text-white/90`
- **Small Text**: `text-sm text-white/70`

### Component Styles

#### Buttons
```jsx
// Primary Button
<Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
  Primary Action
</Button>

// Outline Button
<Button variant="outline" className="border-purple-500/60 text-white hover:bg-purple-600/30">
  Secondary Action
</Button>

// Ghost Button
<Button variant="ghost" className="text-white hover:bg-white/10">
  Tertiary Action
</Button>
```

#### Cards
```jsx
<Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
  <CardHeader>
    <h2 className="text-2xl font-bold text-white">Card Title</h2>
    <p className="text-white/90">Card description</p>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

#### Form Inputs
```jsx
<input
  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
  placeholder="Enter text..."
/>
```

#### Modals
```jsx
<div className="bg-gray-900/95 backdrop-blur-sm border border-gray-600/50 rounded-xl shadow-xl">
  {/* Modal content */}
</div>
```

### UI Principles

1. **Consistency**: All new UI elements must inherit from the established theme
2. **Contrast**: Maintain minimum 4.5:1 contrast ratio for text readability
3. **Glassmorphism**: Use `backdrop-blur-sm` with semi-transparent backgrounds
4. **Gradients**: Purple-to-pink gradients for primary actions and highlights
5. **Spacing**: Use Tailwind's spacing scale (4, 6, 8, 12, 16, 20, 24)
6. **Border Radius**: Consistent `rounded-lg` (8px) for most elements, `rounded-xl` (12px) for cards
7. **Shadows**: Use `shadow-lg` for elevated elements
8. **Transitions**: Always include `transition-colors` or `transition-all duration-200`

### Dark Mode Compatibility
- All components are designed for dark mode by default
- Use white text with opacity variations for hierarchy
- Semi-transparent overlays for depth and layering
- Purple/pink accents maintain visibility on dark backgrounds

### Responsive Design
- Mobile-first approach with `md:` and `lg:` breakpoints
- Grid layouts: `grid md:grid-cols-2 lg:grid-cols-3`
- Flexible spacing: `space-y-4 md:space-y-6`
- Responsive text: `text-lg md:text-xl lg:text-2xl`

### Developer Guidelines

When adding new components:
1. Always use the established color palette
2. Follow the component structure patterns shown above
3. Include proper hover and focus states
4. Ensure accessibility with proper contrast and focus indicators
5. Test on both desktop and mobile viewports
6. Use semantic HTML elements where appropriate
7. Include loading and disabled states for interactive elements

### Example: Adding a New Feature Card
```jsx
<div className="bg-gray-900/90 backdrop-blur-sm border border-gray-600/50 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
    <Icon className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-lg font-semibold text-white mb-2">Feature Title</h3>
  <p className="text-white/80 text-sm">Feature description that explains the benefit.</p>
</div>
```

This design system ensures consistency across all components while maintaining the sophisticated dark theme with purple/pink accent colors that define the DecodeDesk brand.