import React, { useState } from "react";
import NotificationTable from "../components/NotificationTable";
import TemplateModal from "../components/TemplateModal";

function Notifications() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateClick = (trigger, channel) => {
    setSelectedTemplate({
      trigger,
      channel,
    });
  };

  const closeModal = () => {
    setSelectedTemplate(null);
  };

  return (
    <div
      className="notifications-page"
      style={{
        width: "100%",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Notification Management
      </h1>

      <NotificationTable onTemplateClick={handleTemplateClick} />

      {selectedTemplate && (
        <TemplateModal
          trigger={selectedTemplate.trigger}
          channel={selectedTemplate.channel}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Notifications;