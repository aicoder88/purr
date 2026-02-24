import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

type Message = {
  role: 'system' | 'user';
  content: string;
};

const DEFAULT_ANTHROPIC_MODEL = process.env.BLOG_ANTHROPIC_MODEL ?? 'claude-sonnet-4-6';
const DEFAULT_OPENAI_MODEL = process.env.BLOG_OPENAI_MODEL ?? 'gpt-4.1-mini';

type AiProvider = 'anthropic' | 'openai';

type AiResponse = {
  text: string;
  provider: AiProvider;
  model: string;
};

export async function callAi(messages: Message[]): Promise<AiResponse> {
  if (process.env.ANTHROPIC_API_KEY) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await anthropic.messages.create({
      model: DEFAULT_ANTHROPIC_MODEL,
      max_tokens: 4096,
      temperature: 0.2,
      system: messages
        .filter((message) => message.role === 'system')
        .map((message) => message.content)
        .join('\n\n'),
      messages: messages
        .filter((message) => message.role !== 'system')
        .map((message) => ({ role: message.role as 'user' | 'assistant', content: message.content })),
    });

    const text = response.content
      .map((part) => ('text' in part ? part.text : ''))
      .filter(Boolean);
    return {
      text: text.join('\n').trim(),
      provider: 'anthropic',
      model: DEFAULT_ANTHROPIC_MODEL,
    };
  }

  if (process.env.OPENAI_API_KEY) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: DEFAULT_OPENAI_MODEL,
      temperature: 0.2,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    const text = response.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error('OpenAI returned an empty response');
    }
    return {
      text: text.trim(),
      provider: 'openai',
      model: DEFAULT_OPENAI_MODEL,
    };
  }

  throw new Error('No AI provider configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.');
}
