
import React from "react";
import { Shield, CheckCircle, Clock, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export type MessageRole = "user" | "assistant" | "system";
export type CertificationStatus = "verified" | "pending" | "processing";

export interface DocumentInfo {
  id: string;
  name: string;
  type: string;
  size: string;
  timestamp: string;
  txHash?: string;
  status: CertificationStatus;
}

export interface MessageProps {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  documents?: DocumentInfo[];
  trustScore?: number;
  isNew?: boolean;
}

const ChatMessage: React.FC<MessageProps> = ({
  role,
  content,
  timestamp,
  documents,
  trustScore,
  isNew = false,
}) => {
  const isUser = role === "user";
  
  return (
    <div 
      className={cn(
        "py-6",
        isNew && "chat-message-appear"
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex gap-4">
        <div className={cn(
          "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
          isUser ? "bg-blockchain-blue text-white" : "bg-accent-purple text-white"
        )}>
          {isUser ? "U" : <Shield size={14} />}
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {isUser ? "Tu" : "Blockchain Orchestrator"}
            </span>
            <span className="text-xs text-secondary-gray">{timestamp}</span>
          </div>
          
          <div className="prose prose-sm max-w-none">
            {content.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          
          {documents && documents.length > 0 && (
            <div className="mt-3 space-y-3">
              {documents.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          )}
          
          {trustScore !== undefined && (
            <div className="mt-3 flex items-center gap-2">
              <div className="text-sm font-medium">Affidabilità:</div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div 
                    key={star} 
                    className={cn(
                      "w-4 h-1 rounded-sm",
                      star <= Math.round(trustScore) 
                        ? "bg-certification-green" 
                        : "bg-gray-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-secondary-gray">
                {trustScore}/5
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DocumentCard: React.FC<{ document: DocumentInfo }> = ({ document }) => {
  return (
    <div className="border border-border rounded-lg p-3 bg-white">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="p-2 bg-gray-100 rounded">
            <FileText size={16} className="text-blockchain-blue" />
          </div>
          <div>
            <div className="font-medium text-sm">{document.name}</div>
            <div className="text-xs text-secondary-gray">
              {document.type} · {document.size}
            </div>
          </div>
        </div>
        <Download size={16} className="text-secondary-gray hover:text-blockchain-blue cursor-pointer" />
      </div>
      
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          {document.status === "verified" && (
            <>
              <CheckCircle size={14} className="text-certification-green" />
              <span className="text-xs font-medium text-certification-green">
                Certificato
              </span>
            </>
          )}
          
          {document.status === "pending" && (
            <>
              <Clock size={14} className="text-secondary-gray" />
              <span className="text-xs font-medium text-secondary-gray">
                In attesa
              </span>
            </>
          )}
          
          {document.status === "processing" && (
            <>
              <div className="animate-pulse-soft">
                <Shield size={14} className="text-accent-purple" />
              </div>
              <span className="text-xs font-medium text-accent-purple">
                In elaborazione
              </span>
            </>
          )}
        </div>
        
        {document.txHash && (
          <div className="text-xs text-secondary-gray hover:text-blockchain-blue cursor-pointer flex items-center gap-1">
            <span className="font-mono">
              {document.txHash.substring(0, 6)}...{document.txHash.substring(document.txHash.length - 4)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
