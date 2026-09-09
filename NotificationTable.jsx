import React, { useState } from "react";
import axios from "axios";
import TemplateModal from "./TemplateModal";

function NotificationTable() {
  // =========================
  // LOGIN MODAL STATE
  // =========================
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // TEMPLATE STATE
  // =========================
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const triggers = [
    "Login",
    "Logout",
    "Not Logged In 1 Day",
    "Not Logged In 1 Week",
  ];

  const channels = [
    "WhatsApp",
    "Email",
    "Web Push",
  ];

  // =========================
  // LOGIN API
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/", {username: username, password: password,});

      // Save JWT tokens
      localStorage.setItem("access", response.data.access);

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      alert("Login successful!");

      console.log( "Login Response:",  response.data);

      // Close login popup
      setShowLoginModal(false);

      // Clear form
      setUsername("");
      setPassword("");

    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      if (error.response) {
        alert(
          error.response.data.detail ||
          "Invalid username or password"
        );
      } else {
        alert(
          "Backend server is not running."
        );
      }
    }
  };

  // =========================
  // TEMPLATE BUTTON
  // =========================
  const handleTemplateClick = (
    trigger,
    channel
  ) => {
    setSelectedTemplate({
      trigger: trigger,
      channel: channel,
    });
  };

  return (
    <>
      {/* =========================
          NOTIFICATION TABLE
      ========================== */}

      <div className="table-container">

        <table className="notification-table">

          <thead>
            <tr>
              <th>Trigger</th>

              {channels.map((channel) => (
                <th key={channel}>
                  {channel}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>

            {triggers.map((trigger) => (

              <tr key={trigger}>

                {/* =========================
                    TRIGGER COLUMN
                    ONLY LOGIN IS CLICKABLE
                ========================== */}

                <td
                  className={
                    trigger === "Login"
                      ? "trigger-name login-trigger"
                      : "trigger-name"
                  }
                  onClick={
                    trigger === "Login"
                      ? () =>
                          setShowLoginModal(true)
                      : undefined
                  }
                >
                  {trigger}
                </td>


                {/* =========================
                    TEMPLATE BUTTONS
                    EXISTING FUNCTIONALITY
                ========================== */}

                {channels.map((channel) => (

                  <td key={channel}>

                    <button
                      className="template-button"
                      onClick={() =>
                        handleTemplateClick(
                          trigger,
                          channel
                        )
                      }
                    >
                      Template
                    </button>

                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* =========================
          LOGIN POPUP
      ========================== */}

      {showLoginModal && (

        <div className="modal-overlay">

          <div className="login-modal">

            {/* HEADER */}

            <div className="modal-header">

              <h2>Login</h2>

              <button
                className="close-button"
                onClick={() =>
                  setShowLoginModal(false)
                }
              >
                ×
              </button>

            </div>


            {/* LOGIN FORM */}

            <form onSubmit={handleLogin}>

              <div className="modal-body">

                {/* USERNAME */}

                <div className="form-group">

                  <label>
                    Username
                  </label>

                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) =>
                      setUsername(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>


                {/* PASSWORD */}

                <div className="form-group">

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

              </div>


              {/* FOOTER */}

              <div className="modal-footer">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowLoginModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  Login
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =========================
          TEMPLATE POPUP
      ========================== */}

      {selectedTemplate && (

        <TemplateModal
          trigger={
            selectedTemplate.trigger
          }
          channel={
            selectedTemplate.channel
          }
          onClose={() =>
            setSelectedTemplate(null)
          }
        />

      )}

    </>
  );
}

export default NotificationTable;