import { UserConversation } from '@/graphql/generated/graphql';

export interface ConversationSelectorProps {
  selectedConversationId?: string;
  onConversationSelect: (conversationId: string, conversation?: UserConversation) => void;
  className?: string;
  style?: React.CSSProperties;
  maxHeight?: string;
  showSearch?: boolean;
  showCreateButton?: boolean;
  onConversationChange?: (conversations: UserConversation[]) => void;
}

export interface ConversationFormData {
  title: string;
  type: 'DIRECT' | 'GROUP' | 'RIDE_LINKED';
  participantIds: string[];
}

export interface ConversationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ConversationFormData) => void;
  title: string;
  initialData?: Partial<UserConversation>;
}

export interface UserParticipant {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  avatarUrl: string | null;
}

export interface ConversationItemProps {
  conversation: UserConversation;
  isSelected: boolean;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface ConversationSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isLoading: boolean;
}

export interface ConversationListProps {
  conversations: UserConversation[];
  selectedConversationId?: string;
  isLoading: boolean;
  searchTerm?: string;
  maxHeight?: string;
  onConversationSelect: (conversationId: string, conversation?: UserConversation) => void;
  onEdit: (conversation: UserConversation) => void;
  onDelete: (conversationId: string) => void;
}

export interface UserSearchResult {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl: string | null;
}
