# DecodeDesk Deployment Guide

## Quick Deploy to Netlify

### Option 1: Netlify CLI (Recommended)

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy to Netlify**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Set environment variables** in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add your environment variables

### Option 2: Netlify Dashboard

1. **Connect your repository**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab repository

2. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Add environment variables**:
   - Go to Site settings > Environment variables
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_OPENROUTER_API_KEY`

4. **Deploy**:
   - Click "Deploy site"

### Option 3: Drag & Drop Deploy

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Drag the `dist` folder** to Netlify's deploy area

3. **Set environment variables** in site settings

## Environment Variables Required

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_OPENROUTER_API_KEY=your_openrouter_key_here
```

## Post-Deployment Checklist

- [ ] Test all translation modes
- [ ] Verify user authentication works
- [ ] Check quota system functionality
- [ ] Test responsive design on mobile
- [ ] Verify analytics are working
- [ ] Test social sharing features

## Custom Domain Setup

1. **Add custom domain** in Netlify dashboard
2. **Configure DNS** with your domain provider
3. **Enable HTTPS** (automatic with Netlify)

## Performance Optimization

The site is already optimized with:
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Caching headers
- ✅ Compression
- ✅ CDN delivery

## Monitoring

- **Netlify Analytics**: Built-in traffic analytics
- **Error Tracking**: Check Netlify function logs
- **Performance**: Use Lighthouse for optimization

## Support

For deployment issues:
- Check Netlify deploy logs
- Verify environment variables
- Test locally with `npm run build && npm run preview`