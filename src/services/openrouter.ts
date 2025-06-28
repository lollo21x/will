export interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const sendMessageToOpenRouter = async (
  messages: OpenRouterMessage[]
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY in your environment variables.');
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Chat App',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data: OpenRouterResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from OpenRouter API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    throw error;
  }
};
