# DateSpot - AI-Powered Date Experience Discovery

A beautiful, modern web application that helps couples discover perfect date venues using AI-powered recommendations.

## Features

- 🤖 **AI-Powered Recommendations**: Get personalized venue suggestions based on your preferences
- 🎭 **Mood-Based Discovery**: Find places that match your desired vibe (romantic, adventurous, chill, etc.)
- 💰 **Budget-Conscious**: Filter by budget range to find perfect spots within your means
- 📍 **Location-Aware**: Get recommendations based on your current location
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 📱 **Mobile-First**: Optimized for all devices

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key:
     ```
     VITE_OPENAI_API_KEY=your_openai_api_key_here
     ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## Getting an OpenAI API Key

1. Go to [OpenAI's website](https://openai.com/)
2. Sign up or log in to your account
3. Navigate to the API section
4. Create a new API key
5. Copy the key to your `.env` file

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: OpenAI GPT-3.5 Turbo
- **Build Tool**: Vite
- **Icons**: Lucide React

## Architecture

The app is built with a modular architecture:

- `components/`: Reusable UI components
- `lib/`: Utility functions and API integrations
- `types/`: TypeScript type definitions
- `hooks/`: Custom React hooks
- `data/`: Static data and constants

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own date discovery needs!