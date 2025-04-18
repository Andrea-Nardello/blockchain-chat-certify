
import React, { useState } from "react";
import { Send, Upload, Sparkles, SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onUploadFile: (file: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onUploadFile 
}) => {
  const [message, setMessage] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUploadFile(files[0]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-white border-t border-border py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Scrivi un messaggio o carica un documento..."
            className="min-h-[100px] resize-none pr-24 pb-10 pl-4"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Carica documento</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Carica un documento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span className="sr-only">Template</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Template predefiniti</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <SmilePlus className="h-4 w-4" />
                    <span className="sr-only">Emoji</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Inserisci emoji</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="absolute bottom-3 right-3">
            <Button 
              type="submit" 
              className="bg-blockchain-blue hover:bg-blockchain-blue/90 h-8 px-3"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4 mr-1" />
              Invia
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
