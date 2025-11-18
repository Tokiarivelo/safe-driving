'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, User } from 'lucide-react';
import { Icon } from '@iconify/react';
import styles from './messages.module.css';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isUser: boolean;
  clicked?: boolean;
  date: Date;
}

function MpMessage() {
  // Create messages with different dates
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const today = new Date();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'John Doe',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique sollicitudin suscipit. ut velit posuere fringilla, sapien risus molestie elit, vitae dictum ex libero elit consequat dolor.',
      timestamp: '14:30',
      isUser: false,
      date: yesterday,
    },
    {
      id: 2,
      sender: 'Marie Marie',
      content:
        'Donec ultrices tincidunt libero, porttitor pulvinar mauris viverra et. In bibendum fringilla leo facilisis sollicitudin. Sed nec dictum tortor, et gravida mauris.',
      timestamp: '14:32',
      isUser: true,
      date: yesterday,
    },
    {
      id: 3,
      sender: 'John Doe',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique sollicitudin suscipit. ut velit posuere fringilla, sapien risus molestie elit, vitae dictum ex libero elit consequat dolor.',
      timestamp: '14:35',
      isUser: false,
      date: today,
    },
    {
      id: 4,
      sender: 'Marie Marie',
      content:
        'Donec ultrices tincidunt libero, porttitor pulvinar mauris viverra et. In bibendum fringilla leo facilisis sollicitudin.',
      timestamp: '14:38',
      isUser: true,
      date: today,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageClick = (messageId: number) => {
    setMessages(prevMessages =>
      prevMessages.map(msg => (msg.id === messageId ? { ...msg, clicked: !msg.clicked } : msg)),
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const message: Message = {
        id: messages.length + 1,
        sender: 'Marie Marie',
        content: newMessage,
        timestamp: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
        isUser: true,
        date: now,
      };
      setMessages([...messages, message]);
      setNewMessage('');

      setTimeout(() => {
        scrollToBottom();
      }, 50);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group messages by date
  const groupMessagesByDate = (messages: Message[]) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const groups: { [key: string]: Message[] } = {};

    messages.forEach(message => {
      const messageDate = message.date;
      let dateKey = '';

      if (messageDate.toDateString() === today.toDateString()) {
        dateKey = "Aujourd'hui";
      } else if (messageDate.toDateString() === yesterday.toDateString()) {
        dateKey = 'Hier';
      } else {
        dateKey = messageDate.toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });

    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-screen max-w-full mx-auto bg-white">
      {/* Messages Container */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(groupedMessages).map(([dateLabel, messagesForDate]) => (
          <div key={dateLabel} className="space-y-4">
            {/* Date Header */}
            <div className="text-center py-2 text-sm text-gray-500 border-b">{dateLabel}</div>

            {/* Messages for this date */}
            {messagesForDate.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                      message.isUser ? 'bg-blue-500' : 'bg-gray-500'
                    }`}
                  >
                    <User size={14} />
                  </div>
                </div>

                {/* Message Content */}
                <div
                  className={`flex flex-col max-w-md ${
                    message.isUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1 px-1">{message.sender}</div>
                  <div
                    onClick={() => handleMessageClick(message.id)}
                    className={`px-4 py-3 rounded-2xl text-sm cursor-pointer transition-all hover:shadow-md ${
                      message.isUser
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : 'bg-gray-200 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 px-1 flex items-center gap-1">
                    {message.timestamp}
                    {message.clicked && (
                      <div className="flex items-center gap-1 text-pink-500 font-medium">
                        <span>: now</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="cursor-pointer space-y-0.5">
                              <div className="w-[3px] h-[3px] bg-pink-500 rounded-full"></div>
                              <div className="w-[3px] h-[3px] bg-pink-500 rounded-full"></div>
                              <div className="w-[3px] h-[3px] bg-pink-500 rounded-full"></div>
                            </div>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            side="bottom"
                            align="start"
                            className={styles.auth_left12}
                          >
                            <div className={styles.auth_left13}>
                              <div className={styles.auth_left14}>
                                <Icon icon="bxs:share" width="24" height="24" />
                              </div>
                              <div className={styles.auth_left15}>Transferer</div>
                            </div>
                            <DropdownMenuSeparator />
                            <div className={styles.auth_left16}>
                              <div className={styles.auth_left17}>
                                <Icon icon="mdi:delete-forever" width="24" height="24" />
                              </div>
                              <div className={styles.auth_left18}>Supprimer</div>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Container */}
      <div className="border-t-2 border-[#E5E7EB] p-4">
        <div className="border-2 border-[#E5E7EB] rounded-sm">
          <div>
            <Textarea
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écrivez votre message..."
              className="flex-1 resize-none text-sm min-h-[40px] max-h-[120px] bg-transparent !border-none !outline-none focus:!border-none focus:!outline-none focus:!ring-0 focus:!shadow-none"
              rows={1}
              style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
            />
          </div>
          <div className="w-full h-10 flex justify-end">
            <div className="text-pink-500 hover:text-pink-600 transition-colors w-9 h-9 flex items-center justify-center">
              <Icon icon="proicons:emoji" width="26" height="26" />
            </div>
            <div className="text-pink-500 hover:text-pink-600 transition-colors w-9 h-9 flex items-center justify-center">
              <Icon icon="material-symbols-light:mic-outline-rounded" width="26" height="26" />
            </div>
            <div className="text-pink-500 hover:text-pink-600 transition-colors w-9 h-9 flex items-center justify-center">
              <Icon icon="mage:gif-fill" width="26" height="26" />
            </div>
            <div className="text-pink-500 hover:text-pink-600 transition-colors w-9 h-9 flex items-center justify-center">
              <Icon icon="mdi-light:file" width="26" height="26" />
            </div>
            <div className="text-pink-500 hover:text-pink-600 transition-colors w-9 h-9 flex items-center justify-center">
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="w-8 h-6 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <Icon icon="fluent:send-28-filled" width="20" height="20" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MpMessage;
