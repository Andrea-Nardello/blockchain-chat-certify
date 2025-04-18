
import React, { useRef, useEffect } from "react";
import ChatMessage, { MessageProps } from "./ChatMessage";
import { Separator } from "@/components/ui/separator";

interface ChatAreaProps {
  messages: MessageProps[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-bg-light">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-blockchain-blue">
              Benvenuto nell'Orchestratore Blockchain
            </h2>
            <p className="text-secondary-gray">
              La piattaforma che combina blockchain e intelligenza artificiale 
              per certificare e validare i tuoi dati. 
              Inizia una conversazione o carica un documento.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="py-3 px-4 sm:px-6 border-b border-border bg-white sticky top-0 z-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-lg font-medium">Nuova conversazione</h1>
            </div>
          </div>
          <div>
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                <ChatMessage {...message} />
                {index < messages.length - 1 && (
                  <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <Separator />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div ref={endOfMessagesRef} />
        </>
      )}
    </div>
  );
};

export default ChatArea;
