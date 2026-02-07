# Discord Webhook Setup Guide

## 📋 Overview

Your Real Estate 360 platform now supports Discord notifications for:
1. **Visitor Tracking** - Get notified when someone visits your site
2. **Contact Form** - Receive contact form submissions
3. **Applications** - Track property inquiries and tour requests

## 🔧 Setup Instructions

### Step 1: Create Discord Webhooks

#### For Each Channel:

1. **Open Discord** and go to your server
2. **Right-click** on the channel where you want notifications
3. Click **"Edit Channel"**
4. Go to **"Integrations"** tab
5. Click **"Create Webhook"** or **"View Webhooks"**
6. Click **"New Webhook"**
7. **Name it** (e.g., "Visitor Tracker", "Contact Form", "Applications")
8. **Copy the Webhook URL**

#### Recommended Channel Structure:
```
📁 Property360NG Server
  ├── 📢 #visitors (for visitor tracking)
  ├── 📧 #contact-forms (for contact submissions)
  └── 📝 #applications (for property inquiries)
```

### Step 2: Add Webhooks to Environment Variables

Update your `.env.local` file with the webhook URLs:

```bash
# Discord Webhooks
DISCORD_WEBHOOK_VISITORS=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
DISCORD_WEBHOOK_CONTACT=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
DISCORD_WEBHOOK_APPLICATIONS=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
```

### Step 3: Add to Vercel Environment Variables

When deploying to Vercel:

1. Go to your **Vercel Dashboard**
2. Select your **project**
3. Go to **Settings** → **Environment Variables**
4. Add each webhook:
   - **Name**: `DISCORD_WEBHOOK_VISITORS`
   - **Value**: Your Discord webhook URL
   - **Environment**: Production, Preview, Development
5. Repeat for `DISCORD_WEBHOOK_CONTACT` and `DISCORD_WEBHOOK_APPLICATIONS`
6. **Redeploy** your application

## 📊 What Gets Tracked?

### 1. Visitor Tracking
Automatically tracks:
- 📄 Page visited
- 🌐 User agent (browser/device)
- 🔗 Referrer (where they came from)
- 🌍 IP address
- ⏰ Timestamp

**Example Discord Message:**
```
👤 New Visitor
📄 Page: /listings/123
🌐 User Agent: Mozilla/5.0...
🔗 Referrer: Google
🌍 IP Address: 123.456.789.0
⏰ 2026-02-07 06:56:40
```

### 2. Contact Form Submissions
Tracks:
- 👤 Name
- 📧 Email
- 📱 Phone (if provided)
- 💬 Message
- ⏰ Timestamp

**Example Discord Message:**
```
📧 New Contact Form Submission
👤 Name: John Doe
📧 Email: john@example.com
📱 Phone: +234 XXX XXX XXXX
💬 Message: I'm interested in...
⏰ 2026-02-07 06:56:40
```

### 3. Applications (Future)
For property inquiries and tour requests:
- 👤 Name
- 📧 Email
- 🏠 Property interested in
- 💬 Message
- ⏰ Timestamp

## 🎨 Customization

### Change Notification Colors

Edit `lib/utils/discord-webhook.ts`:

```typescript
const embed: DiscordEmbed = {
  title: '👤 New Visitor',
  color: 0x3b82f6, // Change this hex color
  // ...
};
```

**Color Codes:**
- Blue: `0x3b82f6`
- Green: `0x10b981`
- Orange: `0xf59e0b`
- Red: `0xef4444`
- Purple: `0x8b5cf6`

### Add More Fields

```typescript
embed.fields?.push({
  name: 'Custom Field',
  value: 'Custom Value',
  inline: true, // Display inline with other fields
});
```

## 🧪 Testing

### Test Visitor Tracking
1. Visit any public page on your site
2. Check your Discord `#visitors` channel
3. You should see a notification within 1-2 seconds

### Test Contact Form
1. Go to `/contact`
2. Fill out and submit the form
3. Check your Discord `#contact-forms` channel

### Test Manually
```bash
# Test visitor webhook
curl -X POST "YOUR_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "embeds": [{
      "title": "Test Message",
      "description": "Testing Discord webhook",
      "color": 3447003
    }]
  }'
```

## 🔒 Security Best Practices

### ✅ DO:
- Keep webhook URLs in `.env.local` (never commit to Git)
- Use separate webhooks for different purposes
- Add webhooks to Vercel environment variables
- Regenerate webhooks if accidentally exposed

### ❌ DON'T:
- Hardcode webhook URLs in your code
- Share webhook URLs publicly
- Commit `.env.local` to Git
- Use the same webhook for everything

## 🚨 Troubleshooting

### Webhooks Not Working?

1. **Check Environment Variables**
   ```bash
   # Make sure they're set correctly
   echo $DISCORD_WEBHOOK_VISITORS
   ```

2. **Restart Dev Server**
   ```bash
   # Stop and restart
   npm run dev
   ```

3. **Check Discord Webhook Status**
   - Go to Discord channel settings
   - Check if webhook still exists
   - Verify webhook URL is correct

4. **Check Browser Console**
   - Open DevTools (F12)
   - Look for errors in Console tab
   - Check Network tab for failed requests

5. **Check Server Logs**
   - Look for "Discord webhook" messages
   - Check for error messages

### Common Issues:

**"Webhook not configured"**
- Solution: Add webhook URL to `.env.local`

**"Failed to send to Discord"**
- Solution: Check if webhook URL is valid
- Solution: Verify webhook hasn't been deleted

**"No notifications appearing"**
- Solution: Check if you're on an admin page (visitors not tracked on `/admin/*`)
- Solution: Verify webhook is in correct channel

## 📈 Usage Limits

Discord webhook limits:
- **Rate Limit**: 30 requests per minute per webhook
- **Message Size**: 2000 characters
- **Embed Fields**: 25 fields per embed
- **Embed Description**: 4096 characters

## 🔄 Updating Webhooks

To change a webhook URL:

1. **Create new webhook** in Discord
2. **Update `.env.local`** with new URL
3. **Update Vercel** environment variables
4. **Redeploy** if on production

## 📚 Additional Resources

- [Discord Webhooks Guide](https://discord.com/developers/docs/resources/webhook)
- [Discord Embed Visualizer](https://discohook.org/)
- [Webhook Testing Tool](https://webhook.site/)

## ✅ Checklist

Before going live:

- [ ] Created Discord server/channels
- [ ] Created webhooks for each channel
- [ ] Added webhooks to `.env.local`
- [ ] Tested visitor tracking
- [ ] Tested contact form
- [ ] Added webhooks to Vercel
- [ ] Tested on production
- [ ] Documented webhook URLs securely

## 🎯 Next Steps

1. **Set up webhooks** following this guide
2. **Test locally** to ensure they work
3. **Deploy to Vercel** with environment variables
4. **Monitor notifications** in Discord
5. **Customize** as needed

---

**Need Help?**
- Check the troubleshooting section above
- Review Discord webhook documentation
- Test with webhook.site first
