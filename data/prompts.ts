export type OutputFormat = "text" | "json" | "toon";

export const MOCK_RESPONSES = {
  text: (
    input: string
  ) => `Create a high-fidelity, modern web application for ${input}. 

Key Requirements:
1. Visual Style: Use a sleek, glassmorphic design with deep gradients and subtle animations.
2. Tech Stack: Next.js, Tailwind CSS, Framer Motion.
3. Features:
   - Responsive layout
   - Dark mode support
   - Interactive components
   
Ensure the code is modular, well-documented, and follows best practices for performance and accessibility.`,

  json: (input: string) =>
    JSON.stringify(
      {
        task: "Generate Web Application",
        subject: input,
        constraints: {
          framework: "Next.js",
          styling: "Tailwind CSS",
          animation: "Framer Motion",
          theme: "Dark/Modern",
        },
        components: [
          "Hero Section",
          "Features Grid",
          "Testimonials",
          "Contact Form",
        ],
        tone: "Professional, Innovative",
      },
      null,
      2
    ),

  toon: (input: string) => `(Cartoon/Illustration Style Prompt)

Subject: A whimsical, vibrant illustration of ${input}
Style: 3D Pixar-style render, soft lighting, rounded shapes
Colors: Bright pastels with high contrast
Composition: Centered, dynamic action pose
Background: Abstract geometric shapes, clean and minimal
Mood: Cheerful, energetic, friendly`,
};

export const PREDEFINED_RESPONSES: Record<
  string,
  Record<OutputFormat, string>
> = {
  "Create a modern gym website with Next.js": {
    text: `Create a high-performance, visually striking gym website using Next.js 14 and Tailwind CSS.

Core Features:
1. Hero Section: Full-screen video background of workout intensity, bold typography "FORGE YOUR LEGACY", and a "Start Free Trial" CTA.
2. Classes Schedule: Interactive weekly calendar with filterable categories (Yoga, HIIT, CrossFit).
3. Trainers Grid: Hover effects revealing trainer specializations and social links.
4. Membership Pricing: 3-tier cards (Starter, Pro, Elite) with "Most Popular" highlighted.

Design Aesthetic:
- Dark Mode default: #0a0a0a background
- Accents: Neon Electric Blue (#00f0ff) and Energetic Orange (#ff4d00)
- Typography: 'Inter' for UI, 'Oswald' for headings
- Animations: Scroll-triggered fade-ins using Framer Motion

Technical Requirements:
- Use Server Components for initial load speed
- Implement Shadcn UI for accessible components
- Ensure 100% Lighthouse performance score`,
    json: JSON.stringify(
      {
        project: "Modern Gym Website",
        stack: ["Next.js 14", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
        pages: ["Home", "Classes", "Trainers", "Pricing", "Contact"],
        design_system: {
          theme: "Dark",
          primary_color: "#00f0ff",
          secondary_color: "#ff4d00",
          font_heading: "Oswald",
          font_body: "Inter",
        },
        components: [
          {
            name: "Hero",
            features: ["Video Background", "CTA Button", "Animated Text"],
          },
          {
            name: "Schedule",
            features: [
              "Filterable Grid",
              "Modal Details",
              "Booking Integration",
            ],
          },
        ],
      },
      null,
      2
    ),
    toon: `(3D Pixar Style Render)

Subject: A futuristic, high-energy gym interior
Style: 3D stylized render, vibrant lighting, smooth textures
Composition: Wide angle shot showing advanced equipment
Colors: Dark metallic grey walls with glowing neon blue strips on the floor
Characters: A friendly, round robot personal trainer lifting a comically large dumbbell with one finger
Mood: Motivating, clean, high-tech, fun`,
  },
  "Explain quantum computing to a 5-year-old": {
    text: `Explain Quantum Computing using a simple analogy suitable for a 5-year-old child.

Analogy: The Magic Coin
- Regular computers are like a coin on a table. It can be either Heads (0) or Tails (1). It sits still.
- Quantum computers are like a spinning coin. While it's spinning, it's kind of Heads AND Tails at the same time!
- This "spinning" lets it do many magic tricks at once, solving puzzles much faster than the still coin.

Key Concepts to Simplify:
1. Qubit -> "Magic Spinning Coin"
2. Superposition -> "Being in two places at once"
3. Entanglement -> "Best friend coins that always match"

Tone: Playful, wondrous, encouraging curiosity.`,
    json: JSON.stringify(
      {
        topic: "Quantum Computing",
        target_audience: "5-year-old",
        analogy: "Spinning Coin vs Flat Coin",
        key_points: [
          {
            concept: "Bit",
            simplification: "A light switch (On or Off)",
          },
          {
            concept: "Qubit",
            simplification: "A dimmer switch (Any brightness)",
          },
          {
            concept: "Speed",
            simplification:
              "Finding a toy in a messy room instantly vs looking one by one",
          },
        ],
        tone: "Educational, Fun",
      },
      null,
      2
    ),
    toon: `(Children's Book Illustration Style)

Subject: A magical laboratory with floating glowing coins
Style: 2D vector art, flat design, cute and colorful
Colors: Soft purples, blues, and gold for the coins
Characters: A curious little girl with big glasses looking at a floating, shimmering coin
Background: Starry space pattern, simple clouds
Mood: Wonder, discovery, magic`,
  },
  "Write a python script to scrape stock data": {
    text: `Write a robust Python script to scrape historical stock data.

Requirements:
1. Libraries: Use 'yfinance' for reliable data and 'pandas' for manipulation.
2. Input: List of ticker symbols (e.g., ["AAPL", "GOOGL", "MSFT"]).
3. Functionality:
   - Fetch daily OHLCV data for the last 1 year.
   - Calculate 50-day and 200-day Moving Averages.
   - Save the combined data to a CSV file named 'stock_data_{date}.csv'.
4. Error Handling: specific try-except blocks for network errors or invalid tickers.
5. Output: Print a summary of success/failure for each ticker.

Code Style: PEP 8 compliant, type hinting, docstrings.`,
    json: JSON.stringify(
      {
        task: "Stock Data Scraper",
        language: "Python 3.10+",
        dependencies: ["yfinance", "pandas", "datetime"],
        inputs: {
          tickers: ["AAPL", "TSLA", "NVDA"],
          period: "1y",
          interval: "1d",
        },
        outputs: [
          {
            type: "CSV",
            columns: [
              "Date",
              "Open",
              "High",
              "Low",
              "Close",
              "Volume",
              "SMA_50",
              "SMA_200",
            ],
          },
          {
            type: "Console Log",
            content: "Scraping status per ticker",
          },
        ],
      },
      null,
      2
    ),
    toon: `(Tech Editorial Illustration)

Subject: A friendly robot analyzing a rising stock chart
Style: Isometric vector art, clean lines
Colors: Professional blue and green palette, white background
Composition: Robot holding a magnifying glass over a holographic chart
Details: Binary code raining in the background, coins stacked neatly
Mood: Efficient, analytical, profitable`,
  },
  "Design a logo for a coffee shop": {
    text: `Create a logo design brief for a specialty coffee shop named "Bean & Bloom".

Brand Identity:
- Vibe: Cozy, artisanal, eco-friendly, botanical.
- Target Audience: Remote workers, plant lovers, coffee connoisseurs.

Visual Direction:
1. Iconography: Combine a coffee bean with a sprouting leaf or flower.
2. Typography: Serif font for "Bean" (traditional), Script font for "Bloom" (organic).
3. Color Palette:
   - Deep Espresso Brown (#4B3621)
   - Sage Green (#8A9A5B)
   - Cream/Off-White (#F5F5DC)
4. Style: Minimalist line art, scalable for cups and signage.

Deliverables: Primary logo, monochrome version, favicon.`,
    json: JSON.stringify(
      {
        brand_name: "Bean & Bloom",
        industry: "Specialty Coffee",
        keywords: ["Organic", "Cozy", "Botanical", "Premium"],
        visual_elements: {
          symbol: "Coffee bean merging with a leaf",
          typography: "Serif + Script pairing",
          colors: ["#4B3621", "#8A9A5B", "#F5F5DC"],
        },
        usage: ["Signage", "Cup Sleeves", "Social Media", "Merchandise"],
      },
      null,
      2
    ),
    toon: `(Sticker Art Style)

Subject: A cute, steaming cup of coffee with a smiling face
Style: Thick bold outlines, flat colors, sticker aesthetic
Colors: Warm browns, creamy whites, and a touch of green
Details: Steam forming a heart shape, coffee beans dancing around
Background: Transparent (or white circle)
Mood: Warm, inviting, happy morning vibes`,
  },
};

export const EXAMPLE_PROMPTS = [
  "Create a modern gym website with Next.js",
  "Explain quantum computing to a 5-year-old",
  "Write a python script to scrape stock data",
  "Design a logo for a coffee shop",
];
