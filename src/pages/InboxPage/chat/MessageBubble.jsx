const MessageBubble = ({ msg, isOwn, showAvatar, otherUserProfile }) => {
  const bubbleClass = `max-w-[60%] px-3 py-2 rounded-xl text-sm break-words ${
    msg.type === 'text' &&
    (isOwn
      ? "bg-blue-500 text-white rounded-br-none"
      : "bg-color-dash text-white rounded-bl-none")
  }`;

  const containerClass = `flex gap-2 ${
    isOwn ? "justify-end" : "justify-start"
  }`;

  return (
    <div className={containerClass}>
      {!isOwn &&
        (showAvatar ? (
          <img
            src={otherUserProfile?.profilePicURL || "/defaultProfilePic.jpg"}
            alt="avatar"
            className="w-8 h-8 rounded-full self-end object-cover"
          />
        ) : (
          <div className="w-8 h-8" />
        ))}

      <div className={bubbleClass}>
        {msg.type === "text" && msg.content}

        {msg.type === "image" &&
          msg.imageUrls?.map((url, i) => (
            <img key={i} src={url} className="rounded-lg w-[300px] h-[400px]" />
          ))}

        {msg.type === "voice" && (
          <audio controls src={msg.voiceUrl} className="mt-1" />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
