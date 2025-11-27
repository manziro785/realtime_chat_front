import { useState, useEffect, useRef } from "react";
import { Hash, Send, MessageSquare, Menu, X } from "lucide-react";
import { useChannelContext } from "../hooks/channel/useChannelContext";
import { useChannelMessages } from "../hooks/message/useChannelMessages";
import { useGetChannelMessagesHistory } from "../hooks/message/useGetChannelMessagesHistory";
import SideBar from "../components/common/SideBar";
import InfoBlock from "../components/common/infoBlock";
import InputBlock from "../components/common/inputBlock";
import { CreateGroupModal } from "../components/popups/createGroupModal";
import { EditGroupModal } from "../components/popups/EditGroupModal";
import { EditProfileModal } from "../components/popups/EditProfileModal";
import EnterCodeModal from "../components/popups/EnterCodeModal";
import DeleteMember from "../components/popups/deleteMember";
import DeleteChannel from "../components/popups/deleteChannel";
import { useGetProfile } from "../hooks/profile/useGetProfile";
import MessageArea from "../components/common/messageArea";
import Header from "../components/common/header";
import NoChat from "../components/common/noChat";

export function Dashboard() {
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { activeChannel } = useChannelContext();
  const { data } = useGetProfile();
  const messagesEndRef = useRef(null);
  const closeSidebar = () => setShowSidebar(false);
  const closeInfo = () => setShowInfo(false);
  const id_current_user = data?.user?.id ? String(data.user.id) : null;
  const uniqueIds = new Set();
  const { data: historyData } = useGetChannelMessagesHistory();
  const openModal = (type) => setModal(type);
  const { messages: liveMessages, sendMessage } = useChannelMessages();
  const historyMessages = historyData?.messages || [];

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
            <Header setShowSidebar={setShowSidebar} setShowInfo={setShowInfo} />
            <MessageArea
              allMessages={allMessages}
              id_current_user={id_current_user}
              messagesEndRef={messagesEndRef}
            />
            <InputBlock
              message={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
            />
          </>
        ) : (
          <NoChat setShowSidebar={setShowSidebar} />
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

      <CreateGroupModal open={modal === "group"} onClose={closeModal} />
      <EditGroupModal open={modal === "edit"} onClose={closeModal} />
      <EditProfileModal open={modal === "profile"} onClose={closeModal} />
      <EnterCodeModal open={modal === "code"} onClose={closeModal} />
      <DeleteChannel open={modal === "delete_channel"} onClose={closeModal} />
      <DeleteMember
        open={modal === "delete_member"}
        onClose={closeModal}
        member={selectedMember}
      />
    </div>
  );
}
