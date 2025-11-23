import { ChatContainer } from '@/components/chat/chat-container';

export default async function DriverMessage({ params }: { params: Promise<{ id?: string[] }> }) {
  const resolvedParams = await params;
  const conversationId = resolvedParams.id?.[0];

  return <ChatContainer conversationId={conversationId} />;
}
