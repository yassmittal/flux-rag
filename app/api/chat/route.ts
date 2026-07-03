import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from 'ai';
import { createAmazonBedrock  } from "@ai-sdk/amazon-bedrock";

const bedrockMantle = createAmazonBedrock({
  region: 'us-east-1'
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: bedrockMantle("qwen.qwen3-coder-next"),
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}