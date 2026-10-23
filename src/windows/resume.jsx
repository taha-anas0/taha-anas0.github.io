import { COLORS } from "#constants";
import WindowWrapper from "#hoc/windowWrapper";
import WindowControls from "#components/WindowControls";

const SKILLS = [
  "Java",
  "Spring Boot",
  "Apache Kafka",
  "Kafka Streams",
  "Redis",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "React",
];

const Resume = () => {
  return (
    <div className="w-[34rem] bg-white">
      <div
        id="window-header"
        className="relative flex items-center h-10 px-2"
        style={{ backgroundColor: COLORS.windowHeaderBgDark }}
      >
        <WindowControls target="resume" />
        <h2 className="absolute left-1/2 -translate-x-1/2 text-white">Resume</h2>
      </div>

      <div className="p-8 text-gray-800 max-h-[32rem] overflow-y-auto">
        <h1 className="text-2xl font-bold">Taha Anas</h1>
        <p className="text-sm text-gray-500 mb-4">
          Backend Engineer · Java · Kafka · AWS
        </p>
        <p className="text-sm leading-relaxed mb-6">
          Software engineer focused on scalable, event-driven backend systems
          for banking and payments. Currently building a real-time card
          interchange &amp; scheme-fee engine at Effyis / Estreem (BNP Paribas /
          BPCE).
        </p>

        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Experience
        </h3>
        <div className="mb-6">
          <div className="flex justify-between items-baseline">
            <p className="font-semibold text-sm">Backend Engineer</p>
            <p className="text-xs text-gray-500">2025 — Present</p>
          </div>
          <p className="text-xs text-gray-500 mb-1">
            Effyis Group — Estreem (BNP Paribas / BPCE)
          </p>
          <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
            <li>
              Architected a four-stage, exactly-once Kafka Streams pipeline
              pricing ISO 20022 card transactions.
            </li>
            <li>
              Scaled to a 1,500 TPS peak with a tiered in-memory + Redis
              cache-aside layer.
            </li>
          </ul>
        </div>

        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Skills
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {SKILLS.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/taha-anas"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <img src="/icons/github.svg" className="w-4" alt="" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/taha-anas"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <img src="/icons/linkedin.svg" className="w-4" alt="" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
