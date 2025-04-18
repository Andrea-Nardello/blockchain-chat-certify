
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ChatArea from "@/components/chat/ChatArea";
import ChatInput from "@/components/chat/ChatInput";
import { MessageProps } from "@/components/chat/ChatMessage";
import { useToast } from "@/components/ui/use-toast";

// Sample initial messages
const initialMessages: MessageProps[] = [
  {
    id: "1",
    role: "system",
    content: "Benvenuto nell'Orchestratore Blockchain! Sono qui per aiutarti a certificare documenti, verificare l'autenticità dei dati e analizzare informazioni in modo sicuro e immutabile. Come posso assisterti oggi?",
    timestamp: "10:30",
    isNew: false
  }
];

const Index = () => {
  const [messages, setMessages] = useState<MessageProps[]>(initialMessages);
  const { toast } = useToast();

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: MessageProps = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      isNew: true
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate response after a short delay
    setTimeout(() => {
      const assistantMessage: MessageProps = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getResponseForMessage(content),
        timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        trustScore: 4.5,
        isNew: true
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleUploadFile = (file: File) => {
    toast({
      title: "Documento ricevuto",
      description: `Sto elaborando: ${file.name}`,
    });

    // Simulate file upload and processing
    setTimeout(() => {
      const userMessage: MessageProps = {
        id: Date.now().toString(),
        role: "user",
        content: `Ho caricato un documento: ${file.name}`,
        timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        documents: [
          {
            id: "doc-" + Date.now(),
            name: file.name,
            type: file.type || "Document",
            size: formatFileSize(file.size),
            timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
            status: "pending"
          }
        ],
        isNew: true
      };
      
      setMessages((prev) => [...prev, userMessage]);
      
      // Simulate assistant response with document processing status
      setTimeout(() => {
        const assistantMessage: MessageProps = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Ho ricevuto il tuo documento e ho iniziato il processo di certificazione. La verifica e la registrazione sulla blockchain richiederanno alcuni minuti.",
          timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
          documents: [
            {
              id: "doc-" + Date.now(),
              name: file.name,
              type: file.type || "Document",
              size: formatFileSize(file.size),
              timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
              status: "processing"
            }
          ],
          isNew: true
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        
        // After another delay, update to verified
        setTimeout(() => {
          const verifiedMessage: MessageProps = {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content: "Il tuo documento è stato certificato con successo. Ora è registrato in modo permanente e immutabile sulla blockchain. Puoi verificarne l'autenticità in qualsiasi momento utilizzando il codice di transazione.",
            timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
            documents: [
              {
                id: "doc-" + Date.now(),
                name: file.name,
                type: file.type || "Document",
                size: formatFileSize(file.size),
                timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
                status: "verified",
                txHash: "0x7f9aCd95b708e231d98a85d3A82a739D9c2f2d38"
              }
            ],
            isNew: true
          };
          
          setMessages((prev) => [...prev, verifiedMessage]);
        }, 5000);
      }, 1500);
    }, 1000);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <ChatArea messages={messages} />
        <ChatInput 
          onSendMessage={handleSendMessage} 
          onUploadFile={handleUploadFile} 
        />
      </div>
    </Layout>
  );
};

// Helper functions
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / 1048576).toFixed(1) + " MB";
};

const getResponseForMessage = (message: string): string => {
  // Very simplified response logic based on keywords
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("certifica") || lowerMessage.includes("certificare")) {
    return "Per certificare un documento, puoi semplicemente caricarlo tramite il pulsante di upload. Supporto documenti PDF, Word, immagini e testi. Una volta caricato, verrà analizzato, verificato e registrato sulla blockchain, garantendone l'immutabilità e la data certa.";
  }
  
  if (lowerMessage.includes("blockchain") || lowerMessage.includes("funziona")) {
    return "Il nostro Orchestratore utilizza la tecnologia blockchain per garantire l'immutabilità e la tracciabilità dei tuoi documenti e dati. Quando un documento viene certificato, viene creato un hash univoco che viene registrato sulla blockchain. Questo permette di verificare in qualsiasi momento che il documento non sia stato alterato dopo la certificazione.";
  }
  
  if (lowerMessage.includes("costo") || lowerMessage.includes("prezzo") || lowerMessage.includes("tariffa")) {
    return "I costi del servizio dipendono dal volume di documenti da certificare e dalle funzionalità aggiuntive richieste. Offriamo piani personalizzati per le esigenze specifiche di banche, pubblica amministrazione, aziende del Made in Italy e studi legali. Posso metterti in contatto con un nostro consulente per una quotazione dettagliata.";
  }
  
  return "Capisco la tua richiesta. L'Orchestratore Blockchain può aiutarti a certificare documenti, verificare l'autenticità delle informazioni e garantire la tracciabilità di processi critici. Puoi caricare documenti direttamente in questa chat o chiedere assistenza specifica per il tuo settore.";
};

export default Index;
