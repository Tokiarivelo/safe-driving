import { UserConversation } from '@/graphql/generated/graphql';

export interface ConversationSelectorProps {
  selectedConversationId?: string;
  onConversationSelect: (conversationId: string, conversation?: UserConversation) => void;
  className?: string;
  style?: React.CSSProperties;
  maxHeight?: string;
  showSearch?: boolean;
  showCreateButton?: boolean;
  onCreateConversation?: () => void;
}

export interface ConversationItemProps {
  conversation: UserConversation;
  isSelected: boolean;
  onClick: () => void;
  currentUserId?: string;
}
