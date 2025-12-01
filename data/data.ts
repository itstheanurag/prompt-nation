export const CATEGORIES = [
  "All",
  "Image",
  "Video",
  "Writing",
  "Research",
  "Coding",
  "Education",
];

export const PROMPTS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1718601576077-b84566377c88?q=80&w=2787&auto=format&fit=crop",
    prompt:
      "A futuristic city floating in the clouds, cyberpunk style, neon lights, high detail, 8k resolution",
    model: "Midjourney v6",
    author: "@neon_dreamer",
    type: "Image",
    category: "Image",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    prompt:
      "Cinematic drone shot of a coastline crashing waves, sunset lighting, 60fps, photorealistic",
    model: "Sora",
    author: "@cine_ai",
    type: "Video",
    category: "Video",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2940&auto=format&fit=crop",
    prompt:
      "Write a comprehensive essay comparing Stoicism and Existentialism in the context of modern anxiety.",
    model: "Claude 3 Opus",
    author: "@philosopher_ai",
    type: "Essay",
    category: "Writing",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2940&auto=format&fit=crop",
    prompt:
      "Synthesize recent findings on CRISPR gene editing applications in curing hereditary blindness.",
    model: "GPT-4o",
    author: "@science_daily",
    type: "Research",
    category: "Research",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop",
    prompt:
      "Generate a python script to visualize stock market trends using matplotlib and pandas with moving averages.",
    model: "Codex",
    author: "@dev_guru",
    type: "Code",
    category: "Coding",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2940&auto=format&fit=crop",
    prompt:
      "Solve this calculus problem step-by-step: Integral of x^2 * e^x dx. Explain the integration by parts method used.",
    model: "GPT-4-Turbo",
    author: "@math_wiz",
    type: "Math",
    category: "Education",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2940&auto=format&fit=crop",
    prompt:
      "Create a lesson plan for 5th graders explaining the water cycle using interactive activities.",
    model: "Claude 3.5 Sonnet",
    author: "@teach_ai",
    type: "Lesson Plan",
    category: "Education",
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1614726365723-49cfae92782f?q=80&w=2796&auto=format&fit=crop",
    prompt:
      "Surreal landscape with floating islands, waterfalls flowing upwards, dreamlike atmosphere",
    model: "Stable Diffusion 2.1",
    author: "@dream_weaver",
    type: "Image",
    category: "Image",
  },
];

export const PRICING = [
  {
    name: "Explorer",
    price: "$0",
    description: "Perfect for getting started with prompt engineering.",
    features: [
      "Access to public prompt library",
      "Save up to 50 prompts",
      "Basic community support",
      "Standard generation speed",
    ],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Pro Engineer",
    price: "$19",
    description: "For serious creators and developers.",
    features: [
      "Unlimited private prompts",
      "API access",
      "Priority support",
      "Advanced analytics",
      "Team collaboration tools",
      "Early access to new models",
    ],
    cta: "Get Pro",
    popular: true,
  },
];
