import React, { useState, useEffect } from 'react';

// Fixed prompt categories
const promptCategories = {
  abstract: [
    "what shape is your fear?",
    "how does silence sound?",
    "where do lost things live?",
    "what is the color of regret?",
    "when does stillness move?"
  ],
  direct: [
    "who are you writing to?",
    "what happened last night?",
    "how do you really feel?",
    "what did they say?",
    "what's the secret?"
  ],
  visual: [
    "describe a storm in detail",
    "paint a picture of your room",
    "what does midnight look like?",
    "what does 'hope' resemble?",
    "draw with words"
  ]
};

// Pre-defined Mad Lib style prompts as fallback
const madLibPrompts = {
  general: [
    "what if your heart whispers like a frozen mountain?",
    "how does a hidden shadow transform in the ocean?",
    "where do ancient stars go when they vanish?",
    "can you describe the sound of fragile memories echoing?",
    "what happens when dreams burn through sacred whispers?"
  ],
  abstract: [
    "how does truth exist silently beyond metaphysical essence?",
    "if infinity could resonate, what dimension would it create?",
    "what lies within the surreal paradox of existence?",
    "can ethereal illusion ever truly permeate the void?",
    "when cosmos and spirit dissolve, what remains of eternity?"
  ],
  visual: [
    "paint with words how emerald reflection shines gently against horizon",
    "describe the silhouette as it dances through crystalline mist",
    "what colors emerge when texture ripples into luminous shimmer?",
    "how would you capture the moment radiant pattern glows?",
    "sketch with language the way shadows sparkle when touched by light"
  ],
  direct: [
    "tell me what happened when she watched the heavy room",
    "who said \"he will take your distant voice\" and why?",
    "what did you do with the letter after it broke?",
    "describe exactly how it felt to find that sharp moment",
    "what would they say if we could return again?"
  ]
};

// Hugging Face API configuration
const HF_API_URL = "https://api-inference.huggingface.co/models";
// Models that work well for creative text generation
const HF_MODELS = {
  general: "gpt2",
  abstract: "EleutherAI/gpt-neo-1.3B",
  creative: "bigscience/bloom-560m",
  poetic: "gpt2-xl",
  narrative: "mistralai/Mistral-7B-v0.1", // Good for storytelling
  emotional: "facebook/bart-large",       // Good for emotional content
  experimental: "stabilityai/stablelm-base-alpha-7b" // More experimental results
};

// Expanded prompt seeding strategies
const PROMPT_STRATEGIES = {
  general: [
    "Write a creative songwriting prompt about",
    "Create an inspiring question about",
    "What if someone wrote a song about"
  ],
  abstract: [
    "Create a philosophical songwriting question about",
    "What metaphysical aspects of",
    "How might one explore the concept of"
  ],
  visual: [
    "Write an imagery-focused songwriting prompt describing",
    "What visual metaphors could represent",
    "Describe the texture and appearance of"
  ],
  direct: [
    "Craft a direct songwriting question that asks",
    "Write a prompt that directly examines",
    "What specific emotion is felt when"
  ],
  narrative: [
    "Tell a brief story about",
    "What character might experience",
    "Create a scene involving"
  ],
  emotional: [
    "What feelings arise when thinking about",
    "How does it feel to experience",
    "Write an emotional prompt about"
  ],
  experimental: [
    "Create an unusual perspective on",
    "What surreal aspects exist within",
    "Reimagine the concept of"
  ]
};

// Expanded topics for diversity
const TOPICS = [
  // Common themes
  "love", "loss", "memory", "time", "nature", "change", "dreams",
  "connections", "journey", "reflection", "silence", "emotions",
  // More specific concepts  
  "forgotten places", "childhood memories", "urban landscapes",
  "seasons changing", "midnight conversations", "distant shores",
  "hidden truths", "broken promises", "unexpected joy", "ancient wisdom",
  "digital life", "celestial bodies", "parallel universes", "fleeting moments",
  "unspoken words", "inherited traits", "collective memory", "future nostalgia"
];

interface SparkboardProps {
  onPromptChange?: (responses: Record<string, string>) => void;
}

export const Sparkboard: React.FC<SparkboardProps> = ({ onPromptChange = () => {} }) => {
  const [category, setCategory] = useState<string>('general');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [prompts, setPrompts] = useState<string[]>(madLibPrompts.general);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [useAI, setUseAI] = useState<boolean>(false);
  const [model, setModel] = useState<string>(HF_MODELS.general);
  const [apiKey, setApiKey] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0.8);
  const [topP, setTopP] = useState<number>(0.9);
  const [maxTokens, setMaxTokens] = useState<number>(30);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [promptCount, setPromptCount] = useState<number>(5);
  
  // Load API key and favorites from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('hf_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    const savedFavorites = localStorage.getItem('favorite_prompts');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Error loading favorites:", e);
      }
    }
  }, []);
  
  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('hf_api_key', apiKey);
    }
  }, [apiKey]);
  
  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorite_prompts', JSON.stringify(favorites));
  }, [favorites]);
  
  // Generate prompts using Hugging Face API
  const generateAIPrompts = async (count: number = promptCount) => {
    if (!apiKey) {
      alert("Please enter your Hugging Face API key");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get the appropriate strategies for the selected category
      const promptStrategies = PROMPT_STRATEGIES[category as keyof typeof PROMPT_STRATEGIES] || PROMPT_STRATEGIES.general;
      
      // Make parallel requests to Hugging Face API
      const requests = Array(count).fill(0).map(async (_, i) => {
        // Select a random strategy and topic for diversity
        const strategy = promptStrategies[Math.floor(Math.random() * promptStrategies.length)];
        const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        const prompt = `${strategy} ${topic}. Question: `;
        
        const response = await fetch(`${HF_API_URL}/${model}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: maxTokens,
              temperature: temperature,
              top_p: topP,
              do_sample: true,
              return_full_text: false,
              num_return_sequences: 1
            }
          })
        });
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        // Process the result to get a clean prompt
        let generatedText = result[0]?.generated_text || "";
        
        // Clean up the text: extract the first sentence, remove trailing punctuation
        let cleanedText = generatedText.split(/[.!?]/)[0].trim();
        
        // Ensure it ends with a question mark if it doesn't already have punctuation
        if (!cleanedText.endsWith("?") && !cleanedText.endsWith(".") && !cleanedText.endsWith("!")) {
          cleanedText += "?";
        } else if (cleanedText.endsWith(".")) {
          // Replace period with question mark for prompts
          cleanedText = cleanedText.slice(0, -1) + "?";
        }
        
        // Ensure it starts with lowercase (more prompt-like)
        return cleanedText.charAt(0).toLowerCase() + cleanedText.slice(1);
      });
      
      try {
        const results = await Promise.all(requests);
        const uniqueResults = [...new Set(results.filter(text => text.length > 8))];
        
        if (uniqueResults.length >= 3) {
          setPrompts(uniqueResults.slice(0, count));
        } else {
          // Fall back to pre-defined prompts if API didn't return good results
          setPrompts(madLibPrompts[category as keyof typeof madLibPrompts] || madLibPrompts.general);
          console.warn("Couldn't generate enough unique prompts, falling back to predefined ones");
        }
      } catch (error) {
        console.error("Error generating prompts:", error);
        setPrompts(madLibPrompts[category as keyof typeof madLibPrompts] || madLibPrompts.general);
      }
    } catch (error) {
      console.error("Error with Hugging Face API:", error);
      alert("Failed to generate AI prompts. Check your API key or try again later.");
      // Fall back to pre-defined prompts
      setPrompts(madLibPrompts[category as keyof typeof madLibPrompts] || madLibPrompts.general);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle a prompt as favorite
  const toggleFavorite = (prompt: string) => {
    if (favorites.includes(prompt)) {
      setFavorites(favorites.filter(fav => fav !== prompt));
    } else {
      setFavorites([...favorites, prompt]);
    }
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCategory(selected);
    setResponses({});
    
    if (useAI) {
      // Update model based on category
      switch (selected) {
        case 'abstract':
          setModel(HF_MODELS.abstract);
          break;
        case 'visual':
          setModel(HF_MODELS.poetic);
          break;
        case 'direct':
          setModel(HF_MODELS.general);
          break;
        case 'narrative':
          setModel(HF_MODELS.narrative);
          break;
        case 'emotional':
          setModel(HF_MODELS.emotional);
          break;
        case 'experimental':
          setModel(HF_MODELS.experimental);
          break;
        default:
          setModel(HF_MODELS.creative);
      }
      
      // Generate AI prompts if AI mode is active
      generateAIPrompts();
    } else {
      // Choose prompt set based on selection if not using AI
      if (selected === 'abstract' || selected === 'direct' || selected === 'visual') {
        setPrompts(promptCategories[selected]);
      } else if (Object.keys(madLibPrompts).includes(selected)) {
        setPrompts(madLibPrompts[selected as keyof typeof madLibPrompts]);
      } else {
        setPrompts(madLibPrompts.general);
      }
    }
  };
  
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = e.target.value;
    setModel(selectedModel);
  };

  const handleResponseChange = (prompt: string, value: string) => {
    const updated = { ...responses, [prompt]: value };
    setResponses(updated);
    onPromptChange(updated);
  };
  
  // Toggle between AI and predefined prompts
  const handleAIToggle = () => {
    const newUseAI = !useAI;
    setUseAI(newUseAI);
    
    if (newUseAI && apiKey) {
      generateAIPrompts();
    } else if (!newUseAI) {
      // Return to pre-defined prompts
      if (category === 'abstract' || category === 'direct' || category === 'visual') {
        setPrompts(promptCategories[category]);
      } else {
        setPrompts(madLibPrompts.general);
      }
    }
  };
  
  // Generate new set of prompts
  const handleRegeneratePrompts = () => {
    if (useAI && apiKey) {
      generateAIPrompts();
    } else {
      // Simple shuffle of the existing prompts for the selected category
      const currentPrompts = [...prompts];
      for (let i = currentPrompts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentPrompts[i], currentPrompts[j]] = [currentPrompts[j], currentPrompts[i]];
      }
      setPrompts(currentPrompts);
      setResponses({});
    }
  };
  
  // Load a favorite prompt set
  const loadFavoritePrompt = (prompt: string) => {
    setPrompts([prompt, ...prompts.filter(p => p !== prompt).slice(0, promptCount - 1)]);
  };

  return (
    <section className="p-4 bg-gray-800 text-white rounded-lg border-2 border-teal-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
        <h2 className="text-xl font-bold">🧠 Sparkboard</h2>
        
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center mr-2">
            <label className="text-sm font-semibold mr-2">Prompt Style:</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 w-full md:w-auto"
              style={{ minWidth: '120px' }}
              disabled={isLoading}
            >
              <option value="general">Mixed</option>
              <option value="abstract">Abstract</option>
              <option value="visual">Visual</option>
              <option value="direct">Direct</option>
              {useAI && (
                <>
                  <option value="narrative">Narrative</option>
                  <option value="emotional">Emotional</option>
                  <option value="experimental">Experimental</option>
                </>
              )}
            </select>
          </div>
          
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                checked={useAI}
                onChange={handleAIToggle}
                disabled={isLoading}
              />
              <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              <span className="ms-2 text-sm font-medium">Use AI</span>
            </label>
          </div>
          
          {useAI && (
            <div className="flex items-center">
              <input
                type="password"
                placeholder="HF API Key"
                className="px-2 py-1 text-sm rounded bg-gray-700 border border-gray-600 text-white w-32"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={isLoading}
              />
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="ml-2 px-2 py-1 text-sm rounded bg-gray-600 hover:bg-gray-700 text-white"
                disabled={isLoading}
              >
                {showAdvanced ? "Hide" : "Advanced"}
              </button>
            </div>
          )}
          
          <button
            onClick={handleRegeneratePrompts}
            disabled={isLoading || (useAI && !apiKey)}
            className={`px-2 py-1 text-sm rounded ${
              isLoading || (useAI && !apiKey)
                ? 'bg-gray-600 text-gray-400' 
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            {isLoading ? 'Generating...' : 'Regenerate'}
          </button>
        </div>
      </div>
      
      {useAI && showAdvanced && (
        <div className="mb-4 p-3 bg-gray-700 rounded">
          <h3 className="text-sm font-semibold mb-2">Advanced Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs mb-1">Temperature (Creativity): {temperature}</label>
              <input 
                type="range" 
                min="0.1" 
                max="1.5" 
                step="0.1" 
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Focused</span>
                <span>Creative</span>
              </div>
            </div>
            
            <div>
              <label className="block text-xs mb-1">Top-P (Diversity): {topP}</label>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.05" 
                value={topP}
                onChange={(e) => setTopP(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Precise</span>
                <span>Varied</span>
              </div>
            </div>
            
            <div>
              <label className="block text-xs mb-1">Max Length: {maxTokens}</label>
              <input 
                type="range" 
                min="10" 
                max="50" 
                step="5" 
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Short</span>
                <span>Long</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <label className="block text-xs mb-1">Model:</label>
            <select 
              value={model}
              onChange={handleModelChange}
              className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm w-full"
            >
              {Object.entries(HF_MODELS).map(([key, value]) => (
                <option key={key} value={value}>{key}: {value}</option>
              ))}
            </select>
          </div>
          
          <div className="mt-3">
            <label className="block text-xs mb-1">Number of prompts: {promptCount}</label>
            <input 
              type="range" 
              min="3" 
              max="10" 
              value={promptCount}
              onChange={(e) => setPromptCount(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}
      
      {/* Display favorites if there are any */}
      {favorites.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Favorite Prompts</h3>
          <div className="flex overflow-x-auto gap-2 pb-2">
            {favorites.map((fav, i) => (
              <button 
                key={i}
                onClick={() => loadFavoritePrompt(fav)}
                className="px-2 py-1 text-xs whitespace-nowrap bg-gray-700 hover:bg-gray-600 rounded border border-gray-600"
                title={fav}
              >
                {fav.length > 25 ? fav.substring(0, 25) + '...' : fav}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <>
          {prompts.map((prompt, i) => (
            <div key={i} className="mb-4 group">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm">{prompt}</label>
                <button
                  onClick={() => toggleFavorite(prompt)}
                  className={`ml-2 text-lg ${
                    favorites.includes(prompt) ? 'text-yellow-400' : 'text-gray-500 opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-200`}
                  title={favorites.includes(prompt) ? "Remove from favorites" : "Add to favorites"}
                >
                  ★
                </button>
              </div>
              <input
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                value={responses[prompt] ?? ''}
                onChange={(e) => handleResponseChange(prompt, e.target.value)}
                placeholder="Type your response..."
              />
            </div>
          ))}
        </>
      )}
      
      <div className="mt-6 text-xs text-gray-400 italic">
        {useAI 
          ? `These prompts are AI-generated using ${model.split('/').pop()} with temperature ${temperature}. Click "Regenerate" for new ones!` 
          : `These prompts use pre-defined templates with ${category} vocabulary. Click "Regenerate" for new ones!`}
      </div>
    </section>
  );
};

export default Sparkboard;