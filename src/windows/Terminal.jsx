import { useRef, useEffect } from "react";
import { WindowCOntrols } from "#components";
import WindowWrapper from "#hoc/windowWrapper";
import { COLORS } from "#constants";
import useTerminal from "#hooks/useTerminal";

const Terminal = () => {
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const {
    history,
    input,
    handleInputChange,
    handleSubmit,
    handleArrowUp,
    handleArrowDown,
    handleTab,
    handleCtrlC,
  } = useTerminal();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      handleArrowUp();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleArrowDown();
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTab();
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      handleCtrlC();
    }
  };

  return (
    <>
      <div
        id="window-header"
        className="relative flex items-center !border-[#333] h-10 px-2"
        style={{ backgroundColor: COLORS.windowHeaderBgDark }}
      >
        <WindowCOntrols target="terminal" />

        <div
          id="terminal-title"
          className="absolute left-1/2 -translate-x-1/2 flex items-center"
        >
          <img src="/images/folder.png" className="w-5 mr-2" />
          <h2 className="!text-gray-400">anas — zsh — 80×24</h2>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="terminal-body"
        onClick={focusInput}
      >
        {history.map((item, idx) => (
          <div key={idx} className="terminal-line">
            {item.type === "input" ? (
              <div className="prompt-line">
                <span className="prompt">anas@portfolio</span>
                <span className="prompt-symbol">~</span>
                <span className="prompt-arrow">❯</span>
                <span className="command-text">{item.content}</span>
              </div>
            ) : (
              <pre className="output-text">{item.content}</pre>
            )}
          </div>
        ))}

        <div className="prompt-line input-line">
          <span className="prompt">anas@portfolio</span>
          <span className="prompt-symbol">~</span>
          <span className="prompt-arrow">❯</span>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoFocus
            spellCheck={false}
            rows={1}
          />
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;
