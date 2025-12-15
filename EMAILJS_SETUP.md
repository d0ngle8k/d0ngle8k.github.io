# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Select **Gmail** (or your preferred provider)
4. Connect your Gmail account
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Aim Trainer Score - {{player_name}}

Player Information:
- Name: {{player_name}}
- Age: {{player_age}}
- Phone: {{player_phone}}
- Email: {{player_email}}

Game Results:
- Score: {{game_score}}
- Accuracy: {{game_accuracy}}%
- Difficulty: {{game_difficulty}}
- Timestamp: {{timestamp}}
```

4. Copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `user_abcdefg123456`)

## Step 5: Update Environment Variables
Open `.env` file and replace these values:

```env
PUBLIC_EMAILJS_SERVICE_ID=service_abc123
PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
PUBLIC_EMAILJS_PUBLIC_KEY=user_abcdefg123456
```

**Important**: The `.env` file is already in `.gitignore` so your credentials won't be pushed to GitHub.

## Step 6: Test
1. Run the game: `npm run dev`
2. Play for a few seconds
3. Click "End Game"
4. Fill in the form and submit
5. Check your Gmail inbox for the results email

## Free Tier Limits
- 200 emails per month
- For production use, consider upgrading to a paid plan

## Troubleshooting
- **CORS errors**: Make sure your domain is added in EmailJS dashboard settings
- **Template errors**: Verify all template variable names match exactly
- **No email received**: Check spam folder, verify Gmail service connection
