import { COLORS } from "#constants";
import WindowWrapper from "#hoc/windowWrapper";
import WindowControls from "#components/WindowControls";

const PROJECTS = [
  {
    name: "codeforge",
    blurb:
      "AI coding agent in the terminal — streaming TUI, a tool-use loop (read/edit/grep/run) and sub-agent delegation. Published on npm.",
    tags: ["TypeScript", "LLM", "Ink"],
    href: "https://github.com/taha-anas/codeforge",
  },
  {
    name: "mini-pascal-compiler",
    blurb:
      "A complete Pascal → native x86-64 compiler in C: lexer, parser, semantic analysis, P-code IR, code generation and linking.",
    tags: ["C", "Compilers", "x86-64"],
    href: "https://github.com/taha-anas/mini-pascal-compiler",
  },
  {
    name: "cross-platform-text-editor",
    blurb:
      "Native text editor in Rust (iced): find & replace, syntax highlighting, runs on Windows, macOS and Linux from one codebase.",
    tags: ["Rust", "iced", "GUI"],
    href: "https://github.com/taha-anas/cross-platform-text-editor",
  },
  {
    name: "sportscape-app",
    blurb:
      "Sports-venue discovery and booking platform on a Spring Cloud microservices stack (Eureka, API Gateway, Feign, Docker).",
    tags: ["Java", "Spring Cloud", "Microservices"],
    href: "https://github.com/taha-anas/sportscape-app",
  },
  {
    name: "CI-OPS on Juice Shop",
    blurb:
      "DevSecOps pipeline in GitHub Actions: CodeQL (SAST), OWASP ZAP (DAST) and Dependency-Check (SCA), aggregated into DefectDojo.",
    tags: ["DevSecOps", "GitHub Actions", "Security"],
    href: "https://github.com/taha-anas/CI-OPS-on-juiceshop-app",
  },
  {
    name: "multiplatform-sql-dsl",
    blurb:
      "An Xtext/Xtend DSL that generates platform-specific SQL (MySQL, PostgreSQL, Oracle) from a single declarative schema.",
    tags: ["Xtext", "DSL", "SQL"],
    href: "https://github.com/taha-anas/multiplatform-sql-dsl",
  },
];

const Finder = () => {
  return (
    <>
      <div
        id="window-header"
        className="relative flex items-center h-10 px-2"
        style={{ backgroundColor: COLORS.windowHeaderBgDark }}
      >
        <WindowControls target="finder" />
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <img src="/images/folder.png" className="w-5 mr-2" alt="" />
          <h2 className="text-sm font-semibold text-white">Projects</h2>
        </div>
      </div>

      <div className="flex bg-white" style={{ height: "28rem" }}>
        <aside className="w-48 shrink-0 bg-gray-50 border-r border-gray-200 p-4 space-y-5">
          <div>
            <h3 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
              Favorites
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-100 text-blue-700">
                All Projects
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
              Focus
            </h3>
            <ul className="space-y-1 text-sm text-gray-500">
              <li className="px-3 py-1.5">Backend &amp; Data</li>
              <li className="px-3 py-1.5">Systems</li>
              <li className="px-3 py-1.5">DevOps &amp; Security</li>
            </ul>
          </div>
        </aside>

        <section className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-4 content-start">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-xl border border-gray-200 p-4 hover:border-blue-400 hover:shadow-md transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src="/images/folder.png" className="w-6" alt="" />
                <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600">
                  {p.name}
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-snug mb-3">{p.blurb}</p>
              <div className="flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </section>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
