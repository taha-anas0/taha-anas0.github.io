import { useState, useCallback } from "react";

const INITIAL_HISTORY = [
  { type: "output", content: "Last login: Tue Feb 28 06:23:04 on console" },
  { type: "output", content: "Welcome to Anas's Portfolio Terminal" },
  { type: "output", content: 'Type "help" to see available commands\n' },
];

const commands = {
  help: () => `Available commands:
  help          Show this help message
  clear         Clear terminal
  pwd           Print working directory
  whoami        Display current user
  date          Show current date and time`,

  pwd: () => "/Users/anas/portfolio",

  whoami: () => "anas",

  date: () => new Date().toString(),
};

const useTerminal = () => {
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const clearTerminal = useCallback(() => {
    setHistory([]);
  }, []);

  const executeCommand = useCallback((cmd) => {
    const trimmedCmd = cmd.trim();
    const [command, ...args] = trimmedCmd.toLowerCase().split(" ");

    if (command === "") {
      setHistory((prev) => [...prev, { type: "input", content: cmd }]);
      return;
    }

    if (command === "clear") {
      clearTerminal();
      return;
    }

    let output;
    if (commands[command]) {
      output = commands[command](args);
    } else {
      output = `zsh: command not found: ${command}`;
    }

    setHistory((prev) => [
      ...prev,
      { type: "input", content: cmd },
      { type: "output", content: output },
    ]);
  }, [clearTerminal]);

  const handleInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (input.trim()) {
      setCommandHistory((prev) => [...prev, input]);
    }
    executeCommand(input);
    setInput("");
    setHistoryIndex(-1);
  }, [input, executeCommand]);

  const handleArrowUp = useCallback(() => {
    if (commandHistory.length > 0) {
      const newIndex =
        historyIndex < commandHistory.length - 1
          ? historyIndex + 1
          : historyIndex;
      setHistoryIndex(newIndex);
      setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
    }
  }, [commandHistory, historyIndex]);

  const handleArrowDown = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
    } else {
      setHistoryIndex(-1);
      setInput("");
    }
  }, [commandHistory, historyIndex]);

  const handleTab = useCallback(() => {
    const availableCommands = Object.keys(commands);
    const matches = availableCommands.filter((c) =>
      c.startsWith(input.toLowerCase())
    );
    if (matches.length === 1) {
      setInput(matches[0]);
    }
  }, [input]);

  const handleCtrlC = useCallback(() => {
    setHistory((prev) => [
      ...prev,
      { type: "input", content: input + "^C" },
    ]);
    setInput("");
    setHistoryIndex(-1);
  }, [input]);

  return {
    history,
    input,
    handleInputChange,
    handleSubmit,
    handleArrowUp,
    handleArrowDown,
    handleTab,
    handleCtrlC,
  };
};

export default useTerminal;
