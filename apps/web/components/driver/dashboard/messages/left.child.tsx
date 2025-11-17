'use client';
import React, { useState } from 'react';
import styles from './messages.module.css';
import { Input } from '@/components/ui/input-rechercher';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserConversation } from '@/graphql/generated/graphql';
import { useConversations } from '@/lib/conversation/useConversations';

interface LeftProps {
  selectedConversationId?: string;
  onConversationSelect: (conversationId: string, conversation: UserConversation) => void;
}

function Left({ selectedConversationId, onConversationSelect }: LeftProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { conversations, loading } = useConversations();

  console.log('🔍 Conversations:', conversations);
  console.log('🔍 Loading:', loading);
  console.log('🔍 Conversations length:', conversations.length);
  
  const filteredConversations = conversations.filter(conv => {
    const otherUser = conv.participants?.find(
      (p) => p.user.id !== conv.participants?.[0]?.user.id
    )?.user || conv.participants?.[0]?.user;
    const name = `${otherUser?.firstName || ''} ${otherUser?.lastName || ''}`.toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  return (
    <>
      <div className={styles.auth_msg5}>
        <div className={styles.auth_msg6}>
          <h1 className='text-black'>Messages</h1>
        </div>
        <hr className='text-black'/>
        <div className={styles.auth_msg7}>
          <div className={styles.auth_msg8}>
            <Input
              type="text"
              placeholder="Rechercher message / utilisateur"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startOrnerIcon={<Icon icon="material-symbols:search" width="24" height="24" color='black'/>}
            />
          </div>
          <div className={styles.auth_msg9}>
            <Icon icon="gridicons:filter" width="30" height="30" color='black'/>
          </div>
        </div>
      </div>

      <div className={styles.auth_msg10}>
        {loading && conversations.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-gray-500">
            Chargement...
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
            Aucune conversation
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const otherUser = conversation.participants?.find(
              (p) => p.user.id !== conversation.participants?.[0]?.user.id
            )?.user || conversation.participants?.[0]?.user;

            return (
              <button
                key={conversation.id}
                onClick={() => onConversationSelect(conversation.id, conversation)}
                className={`w-full ${selectedConversationId === conversation.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <div className="flex">
                  <div className={styles.auth_left1}>
                    <div className={styles.auth_left2}>
                      <div className={styles.auth_left3}>
                        {otherUser?.avatar ? (
                          <img
                            src={otherUser.avatar}
                            alt={`${otherUser.firstName} ${otherUser.lastName}`}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {otherUser?.firstName?.[0]}{otherUser?.lastName?.[0]}
                          </div>
                        )}
                      </div>
                      <div className={styles.auth_left4}></div>
                    </div>
                    <div className={styles.auth_left5}>
                      <div className={styles.auth_left6}>
                        <div className={styles.auth_left7}>
                          {otherUser?.firstName} {otherUser?.lastName}
                        </div>
                        <div className={styles.auth_left8}>
                          {formatDate(conversation.createdAt)}
                        </div>
                        <div className={styles.auth_left9}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <div className={styles.auth_left10}>
                                <div className={styles.auth_left11}></div>
                                <div className={styles.auth_left11}></div>
                                <div className={styles.auth_left11}></div>
                              </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              side="bottom"
                              align="start"
                              className={styles.auth_left12}
                            >
                              <div className={styles.auth_left13}>
                                <div className={styles.auth_left14}>
                                  <Icon
                                    icon="material-symbols:archive-outline-rounded"
                                    width="24"
                                    height="24"
                                  />
                                </div>
                                <div className={styles.auth_left15}>Archiver</div>
                              </div>
                              <DropdownMenuSeparator />
                              <div className={styles.auth_left16}>
                                <div className={styles.auth_left17}>
                                  <Icon icon="mdi:delete-forever" width="24" height="24" />
                                </div>
                                <div className={styles.auth_left18}>Supprimer conversation</div>
                              </div>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className={styles.auth_left19}>
                        <div className={styles.auth_left20}>{conversation.type}</div>
                        <div className="w-[30%] h-9 justify-center flex items-center">
                          <div className={styles.auth_left22}>
                            {conversation._count?.messages || 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[1%] h-15 auth-background border-b-2 border-[#E5E7EB]"></div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </>
  );
}

export default Left;

