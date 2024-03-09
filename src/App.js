import { useState } from "react";
import Menu1 from "./Menu1";
import Menu2 from "./Menu2";
import "./App.css";
const App = () => {
  const [menuName, setMenuName] = useState("menu1");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleMenuClick = (name) => {
    setMenuName(name);
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", fontSize: "3rem" }}>Leaden Hall</h1>
        <div className="menu-container">
          <div className="menu-items">
            <div
              className={`menu-item ${menuName === "menu1" ? "active" : ""}`}
              onClick={() => handleMenuClick("menu1")}
            >
              Top 10 Brokers
            </div>
            <div
              className={`menu-item ${menuName === "menu2" ? "active" : ""}`}
              onClick={() => handleMenuClick("menu2")}
            >
              Business Class Analysis
            </div>
          </div>
        </div>
      </div>
      {menuName === "menu1" ? <Menu1 /> : <Menu2 />}

      {isChatOpen === true && (
        <div
          className="chat-icon"
          onClick={() => {
            setIsChatOpen((open) => !open);
          }}
        >
          <img src="https://static.vecteezy.com/system/resources/thumbnails/006/692/321/small/chatting-message-icon-template-black-color-editable-chatting-message-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg" />
        </div>
      )}

      {isChatOpen === false && (
        <div className="chat-window">
          <img
            onClick={() => {
              setIsChatOpen((open) => !open);
            }}
            src="https://png.pngtree.com/png-vector/20190603/ourmid/pngtree-icon-close-button-png-image_1357822.jpg"
          />
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/RX28qBUJcamhFC2f1MB0O"
            title="Chatbot"
            width="100%"
            style={{
              height: "100%",
              width: "500px",
              minHeight: "500px",
              marginBottom: "10px",
              border: "2px solid black",
            }}
            frameborder="0"
          ></iframe>
        </div>
      )}
    </>
  );
};
export default App;
