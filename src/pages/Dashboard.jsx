import { useState, useEffect, useRef } from "react";
import { Hash, Send, MessageSquare, Menu, X } from "lucide-react";
import { useChannelContext } from "../hooks/channel/useChannelContext";
import { useChannelMessages } from "../hooks/message/useChannelMessages";
import { useGetChannelMessagesHistory } from "../hooks/message/useGetChannelMessagesHistory";
import SideBar from "../components/common/SideBar";
import InfoBlock from "../components/common/infoBlock";
import { CreateGroupModal } from "../components/popups/CreateGroupModal";
import { EditGroupModal } from "../components/popups/EditGroupModal";
import { EditProfileModal } from "../components/popups/EditProfileModal";
import EnterCodeModal from "../components/popups/EnterCodeModal";
import DeleteMember from "../components/popups/deleteMember";
import DeleteChannel from "../components/popups/deleteChannel";
import { useGetProfile } from "../hooks/profile/useGetProfile";
import MessageArea from "../components/common/messageArea";
import Header from "../components/common/header";

/**
 * SideBar Component channel navigation and user profile
 *
 * This component displays:
 * - Current user profile with avatar
 * - Search functionality (UI only, implementation pending)
 * - Create group and join by code buttons
 * - List of all available channels/groups
 * - Active channel highlighting
 *
 * Features:
 * - Real-time channel list updates
 * - Channel switching functionality
 * - Visual feedback for active channel
 */

export function Dashboard() {
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { activeChannel } = useChannelContext();
  const { data } = useGetProfile();
  const messagesEndRef = useRef(null);

  const id_current_user = data?.user?.id ? String(data.user.id) : null;

  const {
    messages: liveMessages,
    sendMessage,
    isConnected,
  } = useChannelMessages();
  const { data: historyData } = useGetChannelMessagesHistory();

  const historyMessages = historyData?.messages || [];
  const uniqueIds = new Set();
  const allMessages = [...historyMessages, ...liveMessages]
    .filter((msg) => {
      if (uniqueIds.has(msg.id)) return false;
      uniqueIds.add(msg.id);
      return true;
    })
    .sort(
      (a, b) =>
        new Date(a.created_at || a.createdAt) -
        new Date(b.created_at || b.createdAt)
    );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages.length]);

  useEffect(() => {
    if (showSidebar || showInfo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSidebar, showInfo]);

  const openModal = (type) => setModal(type);
  const closeModal = () => {
    setModal(null);
    setSelectedMember(null);
  };

  const handleDeleteClick = (user) => {
    setSelectedMember(user);
    openModal("delete_member");
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendMessage(message.trim());
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const closeSidebar = () => setShowSidebar(false);
  const closeInfo = () => setShowInfo(false);

  return (
    <div className="flex h-screen bg-[#1a1d29] text-white overflow-hidden">
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <SideBar openModal={openModal} closeSidebar={closeSidebar} />
      </div>

      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {activeChannel ? (
          <>
            <Header />
            <MessageArea
              allMessages={allMessages}
              id_current_user={id_current_user}
              messagesEndRef={messagesEndRef}
            />

            {/* Input Area */}
            <div className="p-3 sm:p-4 border-t border-[#1e1f22] safe-bottom">
              <div className="bg-[#252936] rounded-lg flex items-center px-3 sm:px-4 py-2 sm:py-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message #${activeChannel.name}`}
                  className="flex-1 bg-transparent focus:outline-none text-sm sm:text-base text-gray-200 placeholder-gray-500"
                  disabled={!isConnected}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 text-blue-500 hover:text-blue-400 transition disabled:text-gray-600 p-1"
                  disabled={!isConnected || !message.trim()}
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-4">
            <button
              onClick={() => setShowSidebar(true)}
              className="lg:hidden absolute top-4 left-4 p-2 hover:bg-[#2b2d31] rounded transition"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Hash className="w-16 h-16 sm:w-20 sm:h-20 mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">
              Select a channel to start
            </h2>
            <p className="text-xs sm:text-sm text-center">
              Choose a channel from the sidebar
            </p>
          </div>
        )}
      </div>

      {showInfo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeInfo}
        />
      )}

      <div
        className={`fixed lg:relative inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          showInfo ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="relative h-full">
          <button
            onClick={closeInfo}
            className="lg:hidden absolute top-4 right-4 z-10 p-2 hover:bg-[#2b2d31] rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
          <InfoBlock
            openModal={openModal}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      </div>

      {/* Modals */}
      <CreateGroupModal open={modal === "group"} onClose={closeModal} />
      <EditGroupModal open={modal === "edit"} onClose={closeModal} />
      <EditProfileModal open={modal === "profile"} onClose={closeModal} />
      <EnterCodeModal open={modal === "code"} onClose={closeModal} />
      <DeleteMember
        open={modal === "delete_member"}
        onClose={closeModal}
        member={selectedMember}
      />
      <DeleteChannel open={modal === "delete_channel"} onClose={closeModal} />
    </div>
  );
}
