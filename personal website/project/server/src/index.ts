import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

console.log('Attempting to load Gemini API key:', process.env.GEMINI_API_KEY ? 'Loaded' : 'Not loaded');

const app = express();
const port = process.env.PORT || 3001;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://d0ngle8k.github.io' // Replace with your actual domain
    : ['http://localhost:5173', 'http://localhost:5174', 'http://192.168.1.212:5174', 'http://192.168.1.5:5173'], // Allow multiple ports and local network IPs in dev
  methods: ['POST'],
  credentials: true,
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '50'),
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api/chat', limiter);

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Convert messages to Gemini format (history + last user message)
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model', // Gemini uses 'user' and 'model'
      parts: [{ text: msg.content }], // Gemini expects parts with text
    }));

    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage.role !== 'user') {
       return res.status(400).json({ error: 'Last message must be from user' });
    }

    const chat = model.startChat({ history: history });

    const result = await chat.sendMessage(lastUserMessage.content);
    const response = await result.response;
    const assistantMessage = response.text();

    res.json({ response: assistantMessage });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'An error occurred while processing your request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 