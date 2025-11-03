import {
  UserConversation,
  ConversationSearchHitFragmentFragment,
} from '@/graphql/generated/graphql';

/**
 * Transform Elasticsearch conversation hit to UserConversation format
 */
export function transformConversationHit(
  hit: ConversationSearchHitFragmentFragment,
): UserConversation {
  const { _source } = hit;

  return {
    id: _source.id,
    title: _source.title,
    type: _source.type,
    createdAt: _source.createdAt,
    messageCount: _source.messageCount,
    participants: _source.participants.map(p => ({
      id: p.id,
      userId: p.userId,
      conversationId: p.conversationId,
      role: p.role,
      joinedAt: p.joinedAt,
      isMuted: p.isMuted,
      user: {
        id: p.userId,
        email: p.email,
        username: p.username,
        firstName: p.displayName?.split(' ')[0] || '',
        lastName: p.displayName?.split(' ').slice(1).join(' ') || '',
        avatarUrl: p.avatarUrl,
      },
    })),
  } as UserConversation;
}

/**
 * Get display name for a conversation
 */
export function getConversationDisplayName(
  conversation: UserConversation,
  currentUserId?: string,
): string {
  if (conversation.title) {
    return conversation.title;
  }

  // For direct conversations, show the other participant's name
  if (conversation.type === 'DIRECT' && conversation.participants) {
    const otherParticipant = conversation.participants.find(p => p.userId !== currentUserId);
    if (otherParticipant?.user) {
      const { firstName, lastName } = otherParticipant.user;
      return `${firstName || ''} ${lastName || ''}`.trim() || 'Unknown User';
    }
  }

  return 'Unnamed Conversation';
}

/**
 * Format participant count text
 */
export function formatParticipantCount(count: number): string {
  if (count === 0) return 'No participants';
  if (count === 1) return '1 participant';
  return `${count} participants`;
}
