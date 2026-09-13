import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  Users,
  Radio,
  Minimize2,
  Smile,
  Sparkles,
  Swords,
} from "lucide-react";
import { useArenaChat } from "../../hooks/useArenaChat";
import { useAuth } from "../../context/AuthContext";

interface ArenaLiveChatProps {
  roomCode: string;
  mode?: "embedded" | "floating";
  className?: string;
  defaultOpen?: boolean;
}

const QUICK_REACTIONS = [
  "👋 Ready!",
  "🔥 Let's go!",
  "⚡ Two pointers approach",
  "🚀 Ready to submit!",
  "💪 Good luck everyone!",
  "🧠 Brainstorming...",
];

export default function ArenaLiveChat({
  roomCode,
  mode = "embedded",
  className = "",
  defaultOpen = false,
}: ArenaLiveChatProps) {
  const { user } = useAuth();
  const {
    messages,
    activeUsers,
    typingUsers,
    isConnected,
    unreadCount,
    sendMessage,
    sendTyping,
    clearUnread,
  } = useArenaChat(roomCode);

  const [inputVal, setInputVal] = useState("");
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [showQuickReactions, setShowQuickReactions] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen || mode === "embedded") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, mode]);

  // Clear unread when opened
  useEffect(() => {
    if (isOpen) {
      clearUnread();
    }
  }, [isOpen, clearUnread]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal.trim(), "chat");
    setInputVal("");
    sendTyping(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    sendTyping(val.length > 0);
  };

  const handleQuickReaction = (reaction: string) => {
    sendMessage(reaction, "reaction");
    setShowQuickReactions(false);
  };

  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  // ----------------------------------------------------
  // Inner Chat Body (Shared between Embedded & Floating)
  // ----------------------------------------------------
  const renderChatBody = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 select-text">
      {/* Chat Header */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-xs">
              <Swords size={16} />
            </div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 ${
                isConnected ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-wide uppercase text-slate-200">
                Arena Live Chat
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-amber-400 font-semibold border border-slate-700">
                {roomCode}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Radio size={10} className={isConnected ? "text-emerald-400 animate-pulse" : "text-slate-500"} />
                {isConnected ? "Live Connected" : "Connecting..."}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users size={11} className="text-slate-400" />
                {activeUsers.length || 1} online
              </span>
            </div>
          </div>
        </div>

        {mode === "floating" && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Minimize Chat"
          >
            <Minimize2 size={16} />
          </button>
        )}
      </div>

      {/* Message List */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[260px] max-h-[420px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent text-xs"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
            <div className="h-10 w-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
              <MessageSquare size={18} />
            </div>
            <p className="font-semibold text-slate-400">No messages yet</p>
            <p className="text-[11px] max-w-[200px]">
              Chat is live! Send a message or react to coordinate with competitors in room {roomCode}.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe =
              msg.sender?.id === user?.id ||
              (msg.sender?.name && msg.sender.name === user?.name) ||
              (msg.sender?.email && msg.sender.email === user?.email);

            if (msg.type === "system") {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700/60 text-slate-300 text-[11px] font-medium shadow-xs">
                    <Sparkles size={12} className="text-amber-400 shrink-0" />
                    <span>{msg.text}</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"} space-y-1`}
              >
                {/* Sender Name & Role */}
                <div className="flex items-center gap-1.5 px-1">
                  {!isMe && (
                    <div className="h-4 w-4 rounded-full bg-indigo-600/80 text-white flex items-center justify-center text-[9px] font-bold">
                      {(msg.sender?.name || "P").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-[10px] font-semibold text-slate-400">
                    {isMe ? "You" : msg.sender?.name || "Competitor"}
                  </span>
                  {msg.sender?.isHost && (
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1 rounded font-bold">
                      HOST
                    </span>
                  )}
                  <span className="text-[9px] text-slate-500">{formatTime(msg.timestamp)}</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`relative max-w-[85%] px-3.5 py-2 rounded-2xl break-words leading-relaxed shadow-xs ${
                    isMe
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs"
                      : msg.type === "reaction"
                      ? "bg-slate-800 border border-amber-500/30 text-amber-200 rounded-tl-xs"
                      : "bg-slate-800 border border-slate-700/70 text-slate-200 rounded-tl-xs"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 text-[11px] text-amber-400/90 italic pl-1 py-0.5">
            <span className="inline-flex gap-0.5 items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </span>
            <span>{typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reaction Chips */}
      {showQuickReactions && (
        <div className="p-2 bg-slate-950 border-t border-slate-800 flex flex-wrap gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
          {QUICK_REACTIONS.map((r) => (
            <button
              key={r}
              onClick={() => handleQuickReaction(r)}
              className="text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-2.5 py-1 rounded-full border border-slate-700 transition"
            >
              {r}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setShowQuickReactions(!showQuickReactions)}
          className={`p-2 rounded-xl transition ${
            showQuickReactions
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
              : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
          }`}
          title="Quick Reactions"
        >
          <Smile size={16} />
        </button>

        <input
          type="text"
          value={inputVal}
          onChange={handleInputChange}
          placeholder="Send a live message to lobby/battle..."
          className="flex-1 bg-slate-800/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          maxLength={300}
        />

        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold transition shadow-xs flex items-center justify-center shrink-0 cursor-pointer"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );

  // ----------------------------------------------------
  // EMBEDDED MODE (In WaitingLobby)
  // ----------------------------------------------------
  if (mode === "embedded") {
    return (
      <div
        className={`rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col bg-slate-900 ${className}`}
      >
        {renderChatBody()}
      </div>
    );
  }

  // ----------------------------------------------------
  // FLOATING MODE (In Question page)
  // ----------------------------------------------------
  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/95 hover:bg-slate-800 text-white border border-slate-700/80 shadow-2xl backdrop-blur-xl transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="relative">
            <Swords size={18} className="text-amber-400 group-hover:rotate-12 transition-transform duration-200" />
            <span
              className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${
                isConnected ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-bold leading-none">Arena Battle Chat</span>
            <span className="text-[10px] text-slate-400 font-mono leading-tight">Room: {roomCode}</span>
          </div>

          {unreadCount > 0 && (
            <span className="flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-bounce shadow-md">
              {unreadCount}
            </span>
          )}
        </button>
      ) : (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col bg-slate-900 animate-in fade-in zoom-in-95 duration-200">
          {renderChatBody()}
        </div>
      )}
    </div>
  );
}
