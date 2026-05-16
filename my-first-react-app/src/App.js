const greetings = [
  {
    name: "Ali Hassan",
    timeOfDay: "morning",
    bgColor: "#78350f",
  },
  {
    name: "Sara Malik",
    timeOfDay: "afternoon",
    bgColor: "#1e3a5f",
  },
  {
    name: "Musharaf Khan",
    timeOfDay: "evening",
    bgColor: "#2d1b69",
  },
  {
    name: "Nadia Khan",
    timeOfDay: "night",
    bgColor: "#0f1f0f",
  },
];

const timeConfig = {
  morning: {
    emoji: "🌅",
    message: "Good Morning",
    sub: "Rise and shine! Have a productive day.",
    accent: "#fbbf24",
    label: "Morning",
  },
  afternoon: {
    emoji: "☀️",
    message: "Good Afternoon",
    sub: "Hope your day is going great!",
    accent: "#38bdf8",
    label: "Afternoon",
  },
  evening: {
    emoji: "🌇",
    message: "Good Evening",
    sub: "Time to wind down and relax.",
    accent: "#c084fc",
    label: "Evening",
  },
  night: {
    emoji: "🌙",
    message: "Good Night",
    sub: "Rest well and recharge for tomorrow.",
    accent: "#4ade80",
    label: "Night",
  },
};

function Greeting({ name, timeOfDay, bgColor }) {
  const config = timeConfig[timeOfDay] || timeConfig["morning"];

  return (
    <div
      style={{
        background: bgColor,
        borderRadius: "20px",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
      }}
    >
      {/* Decorative background blob */}
      <div
        style={{
          position: "absolute",
          top: "-30px",
          right: "-30px",
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          background: config.accent,
          opacity: 0.08,
          pointerEvents: "none",
        }}
      />

      {/* Time badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "4px 12px",
          borderRadius: "20px",
          background: `${config.accent}20`,
          border: `1px solid ${config.accent}40`,
          marginBottom: "1.25rem",
        }}
      >
        <span style={{ fontSize: "0.85rem" }}>{config.emoji}</span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.68rem",
            color: config.accent,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: "500",
          }}
        >
          {config.label}
        </span>
      </div>

      {/* Greeting text */}
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
          fontWeight: "800",
          color: "#ffffff",
          margin: "0 0 0.25rem 0",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}
      >
        {config.message},
      </h2>
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
          fontWeight: "700",
          color: config.accent,
          margin: "0 0 0.85rem 0",
          letterSpacing: "-0.02em",
        }}
      >
        {name}!
      </h3>

      {/* Sub message */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.88rem",
          color: "rgba(255,255,255,0.5)",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {config.sub}
      </p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #09090f; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(ellipse at 30% 70%, #120a2e 0%, #09090f 55%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem 1.5rem",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.75rem" }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginBottom: "0.6rem",
            }}
          >
            React Props Lab — Task 3
          </p>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "800",
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Dynamic
            <span style={{ color: "rgba(255,255,255,0.25)" }}> Greetings</span>
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.35)",
              marginTop: "0.6rem",
            }}
          >
            Conditional rendering based on{" "}
            <code
              style={{
                fontFamily: "'DM Mono', monospace",
                background: "rgba(255,255,255,0.07)",
                padding: "1px 6px",
                borderRadius: "4px",
                fontSize: "0.82rem",
              }}
            >
              timeOfDay
            </code>{" "}
            prop
          </p>
        </div>

        {/* Greeting grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
            width: "100%",
            maxWidth: "960px",
          }}
        >
          {greetings.map((g, i) => (
            <Greeting key={i} {...g} />
          ))}
        </div>

        <p
          style={{
            marginTop: "2.5rem",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.1em",
          }}
        >
          AIR UNIVERSITY · FULL STACK PROGRAMMING LAB
        </p>
      </div>
    </>
  );
}
