"use server";

interface FineTuneResult {
  text: string;
  json: string;
  toon: string;
}

export async function fineTunePrompt(
  input: string,
  model?: string
): Promise<FineTuneResult | null> {
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENROUTER_API_KEY;
  const isGroq = !!process.env.GROQ_API_KEY;
  const baseUrl = isGroq
    ? "https://api.groq.com/openai/v1/chat/completions"
    : "https://openrouter.ai/api/v1/chat/completions";

  const targetModel = model || "llama-3.1-8b-instant";

  console.log("----------------------------------------");
  console.log("[FineTune] Starting generation");
  console.log("[FineTune] Input:", input.substring(0, 50) + "...");
  console.log("[FineTune] Model:", targetModel);
  console.log("[FineTune] Provider:", isGroq ? "Groq" : "OpenRouter");
  console.log("[FineTune] Key available:", !!apiKey);

  if (!apiKey) {
    console.warn("[FineTune] Missing API Key for Groq/OpenRouter");
    throw new Error("API Key configuration missing");
  }

  const systemPrompt = `You are an expert prompt engineer. Your task is to take a raw idea and refine it into three distinct formats:
1. "text": A comprehensive, well-structured text prompt optimized for LLMs (like GPT-4 or Claude).
2. "json": A structured JSON representation of the prompt tasks/constraints.
3. "toon": A descriptive image generation prompt suitable for Midjourney or DALL-E, focusing on a "3D cartoon/pixar" style if not specified otherwise.

You must output ONLY valid JSON in the following format:
{
  "text": "...",
  "json": "...", // This should be a stringified JSON
  "toon": "..."
}

Here is an example of a good response for the input "Create a modern gym website":
{
  "text": "Create a high-performance, visually striking gym website using Next.js 14 and Tailwind CSS.\\n\\nCore Features:\\n1. Hero Section: Full-screen video background of workout intensity, bold typography 'FORGE YOUR LEGACY', and a 'Start Free Trial' CTA.\\n2. Classes Schedule: Interactive weekly calendar with filterable categories (Yoga, HIIT, CrossFit).\\n3. Trainers Grid: Hover effects revealing trainer specializations and social links.\\n4. Membership Pricing: 3-tier cards (Starter, Pro, Elite) with 'Most Popular' highlighted.\\n\\nDesign Aesthetic:\\n- Dark Mode default: #0a0a0a background\\n- Accents: Neon Electric Blue (#00f0ff) and Energetic Orange (#ff4d00)\\n- Typography: 'Inter' for UI, 'Oswald' for headings\\n- Animations: Scroll-triggered fade-ins using Framer Motion\\n\\nTechnical Requirements:\\n- Use Server Components for initial load speed\\n- Implement Shadcn UI for accessible components\\n- Ensure 100% Lighthouse performance score",
  "json": "{\\n  \\"project\\": \\"Modern Gym Website\\",\\n  \\"stack\\": [\\"Next.js 14\\", \\"Tailwind CSS\\", \\"Framer Motion\\", \\"Shadcn UI\\"],\\n  \\"pages\\": [\\"Home\\", \\"Classes\\", \\"Trainers\\", \\"Pricing\\", \\"Contact\\"],\\n  \\"design_system\\": {\\n    \\"theme\\": \\"Dark\\",\\n    \\"primary_color\\": \\"#00f0ff\\",\\n    \\"secondary_color\\": \\"#ff4d00\\",\\n    \\"font_heading\\": \\"Oswald\\",\\n    \\"font_body\\": \\"Inter\\"\\n  },\\n  \\"components\\": [\\n    {\\n      \\"name\\": \\"Hero\\",\\n      \\"features\\": [\\"Video Background\\", \\"CTA Button\\", \\"Animated Text\\"]\\n    },\\n    {\\n      \\"name\\": \\"Schedule\\",\\n      \\"features\\": [\\"Filterable Grid\\", \\"Modal Details\\", \\"Booking Integration\\"]\\n    }\\n  ]\\n}",
  "toon": "(3D Pixar Style Render)\\n\\nSubject: A futuristic, high-energy gym interior\\nStyle: 3D stylized render, vibrant lighting, smooth textures\\nComposition: Wide angle shot showing advanced equipment\\nColors: Dark metallic grey walls with glowing neon blue strips on the floor\\nCharacters: A friendly, round robot personal trainer lifting a comically large dumbbell with one finger\\nMood: Motivating, clean, high-tech, fun"
}

Do not include markdown formatting like \`\`\`json. Just the raw JSON.`;

  try {
    console.log(
      `[FineTune] Sending request to ${isGroq ? "Groq" : "OpenRouter"}...`
    );
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // OpenRouter specific headers
        ...(!isGroq && {
          "HTTP-Referer": "https://prompt-nation.vercel.app",
          "X-Title": "Prompt Nation",
        }),
      },
      body: JSON.stringify({
        model: targetModel, // Dynamic model selection
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[FineTune] Groq API error status:", response.status);
      console.error("[FineTune] Groq API error body:", errorText);
      throw new Error(
        `Failed to generate prompt: ${response.status} ${errorText}`
      );
    }

    const data = await response.json();
    console.log("[FineTune] Groq response received");
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content received from AI");
    }

    const parsed = JSON.parse(content);
    console.log("[FineTune] Successfully parsed content");

    return {
      text: parsed.text || "Failed to generate text prompt",
      // Ensure JSON format is clean
      json:
        typeof parsed.json === "object"
          ? JSON.stringify(parsed.json, null, 2)
          : parsed.json || "Failed to generate JSON prompt",
      toon: parsed.toon || "Failed to generate image prompt",
    };
  } catch (error) {
    console.error("[FineTune] Fine-tuning error:", error);
    throw error;
  }
}
