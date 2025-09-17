import React, { useState } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';

function modale() {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message envoyé:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-28 flex border-2 border-[#E5E7EB]">
      <div className="w-[50%] h-18">
        <div className="w-full h-18 flex">
          <div className="w-[40%] h-21 flex justify-center items-center">
            <div className="w-17 h-17 rounded-full bg-gray-500"></div>
            <div className="w-2 h-2 rounded-full absolute mt-10 ml-14 bg-green-500"></div>
          </div>
          <div className="w-[60%] h-21">
            <div className="w-full h-[25%] text-[12px] pl-1">Heritiana Mickael</div>
            <div className="w-full h-[25%] text-[12px]">⭐ 4.2 🚗 Peugeot 205</div>
            <div className="w-full h-[25%] text-[12px]">🪑 Nb de place:4</div>
            <div className="w-full h-[25%] text-[12px]">📞 (+261) 34...</div>
          </div>
        </div>
        <div className="w-full h-9"></div>
      </div>
      <div className="w-[50%] h-28 p-1">
        <div className="border-2 border-[#E5E7EB] rounded-sm h-19">
          <div>
            <Textarea
              placeholder="Écrivez votre message..."
              className="flex-1 resize-none text-sm min-h-[40px] max-h-[120px] bg-transparent !border-none !outline-none focus:!border-none focus:!outline-none focus:!ring-0 focus:!shadow-none"
              rows={1}
              style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
              value={message}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <div className="w-full h-7 flex items-center">
          <div className="w-full h-6 space-x-1 flex justify-end">
            <div className="text-pink-500 hover:text-pink-600 transition-colors w-6 h-6 flex items-center justify-center">
              <Icon icon="proicons:emoji" width="26" height="26" />
            </div>
            <div className="text-pink-500 hover:text-pink-600 transition-colors w-6 h-6 flex items-center justify-center">
              <Icon icon="material-symbols-light:mic-outline-rounded" width="26" height="26" />
            </div>
            <div className="text-pink-500 hover:text-pink-600 transition-colors w-6 h-6 flex items-center justify-center">
              <Icon icon="mage:gif-fill" width="26" height="26" />
            </div>
            <div className="text-pink-500 hover:text-pink-600 transition-colors w-6 h-6 flex items-center justify-center">
              <Icon icon="mdi-light:file" width="26" height="26" />
            </div>
            <div className="text-pink-500 hover:text-pink-600 transition-colors mr-1 w-6 h-6 flex items-center justify-center">
              <Button
                className={`w-8 h-6 text-white rounded-lg transition-all duration-200 flex items-center justify-center ${
                  message.trim()
                    ? 'bg-pink-500 hover:bg-pink-600 opacity-100'
                    : 'bg-pink-400 opacity-50 cursor-not-allowed'
                }`}
                disabled={!message.trim()}
                onClick={handleSendMessage}
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

export default modale;
