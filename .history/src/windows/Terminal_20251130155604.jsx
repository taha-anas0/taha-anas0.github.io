import { useState, useRef, useEffect } from "react";
import { WindowCOntrols } from "#components";
import WindowWrapper from "#hoc/windowWrapper";

const commands = {
  help: () => `Available commands:
  help          - Show this help message
  about         - Learn about me
  skills        - View my tech stack
  projects      - List my projects
  contact       - Get my contact info
  experience    - View my work experience
  education     - View my education
  clear         - Clear terminal
  whoami        - Display current user
  date          - Show current date
  echo [text]   - Print text to terminal`,

  about: () => `
┌─────────────────────────────────────────┐
│             ABOUT ME                    │
├─────────────────────────────────────────┤
│  Hi! I'm Anas, a passionate developer   │
│  who loves building beautiful and       │
│  functional web applications.           │
│                                         │
│  I specialize in full-stack development │
│  with a focus on modern technologies.   │
└─────────────────────────────────────────┘`,

  skills: () => `
╔═══════════════════════════════════════════╗
║              TECH STACK                   ║
╠═══════════════════════════════════════════╣
║  Frontend    │ React, Next.js, Tailwind   ║
║  Backend     │ Node.js, Express, Python   ║
║  Database    │ MongoDB, PostgreSQL        ║
║  Tools       │ Git, Docker, VS Code       ║
║  Cloud       │ AWS, Vercel, Netlify       ║
╚═══════════════════════════════════════════╝`,

  projects: () => `
📁 Projects
├── 🌐 Portfolio Website
│   └── This macOS-themed portfolio you're viewing!
├── 📱 Mobile App
│   └── React Native application
├── 🛒 E-commerce Platform
│   └── Full-stack online store
└── 🤖 AI Chat Bot
    └── Machine learning powered assistant

Type 'open [project]' for more details`,

  contact: () => `
📧 Contact Information
──────────────────────
Email:    hello@example.com
GitHub:   github.com/anas
LinkedIn: linkedin.com/in/anas
Twitter:  @anas_dev

Feel free to reach out!`,

  experience: () => `
💼 Work Experience
──────────────────────
▸ Senior Developer @ TechCorp (2022-Present)
  Full-stack development, team leadership

▸ Web Developer @ StartupXYZ (2020-2022)
  Frontend development, UI/UX implementation

▸ Junior Developer @ CodeAgency (2018-2020)
  Learning and growing as a developer`,

  education: () => `
🎓 Education
──────────────────────
▸ B.S. Computer Science
  University of Technology (2014-2018)

▸ Online Certifications
  - AWS Certified Developer
  - Meta Frontend Developer
  - Google UX Design`,

  whoami: () => "guest@anas-portfolio",

  date: () => new Date().toString(),

  clear: () => "__CLEAR__",
};

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: "output", content: "Last login: Tue Feb 28 06:23:04 on console" },
    { type: "output", content: "Welcome to Anas's Portfolio Terminal" },
    { type: "output", content: 'Type "help" to see available commands\n' },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const [command, ...args] = trimmedCmd.split(" ");

    let output;

    if (command === "") {
      output = "";
    } else if (command === "clear") {
      setHistory([]);
      return;
    } else if (command === "echo") {
      output = args.join(" ") || "";
    } else if (commands[command]) {
      output = commands[command]();
    } else {
      output = `zsh: command not found: ${command}`;
    }

    setHistory((prev) => [
      ...prev,
      { type: "input", content: cmd },
      { type: "output", content: output },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) {
        setCommandHistory((prev) => [...prev, input]);
      }
      handleCommand(input);
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter((c) =>
        c.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <>
      <div id="window-header" className="!bg-[#1e1e1e] !border-[#333]">
        <WindowCOntrols target="terminal" />
        <div className="flex flex">
            <img src="/images/folder.png" alt="folder icon" className="inline-block w-5 mr-2" />
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
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;
