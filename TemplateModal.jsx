import React, { useState } from "react";

function TemplateModal({ trigger, channel, onClose }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    console.log({
      trigger,
      channel,
      subject,
      message,
    });

    alert("Template saved successfully!");

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Notification Template</h2>

          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">

          <p>
            <strong>Trigger:</strong> {trigger}
          </p>

          <p>
            <strong>Channel:</strong> {channel}
          </p>

          {channel === "Email" && (
            <div className="form-group">
              <label>Subject</label>

              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
          )}

          <div className="form-group">
            <label>Message</label>

            <textarea
              rows="6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter notification message"
            />
          </div>

        </div>

        <div className="modal-footer">
          <button
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-button"
            onClick={handleSave}
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplateModal;