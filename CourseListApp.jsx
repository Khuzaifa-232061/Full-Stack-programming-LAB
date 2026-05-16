import { useState } from "react";

const courses = [
  {
    courseName: "Full Stack Web Development",
    instructor: "Dr. Ahmed Raza",
    duration: "12 Weeks",
    type: "Online",
  },
  {
    courseName: "Machine Learning Fundamentals",
    instructor: "Prof. Sara Malik",
    duration: "10 Weeks",
    type: "Offline",
  },
  {
    courseName: "React & Next.js Masterclass",
    instructor: "Eng. Bilal Tahir",
    duration: "8 Weeks",
    type: "Online",
  },
  {
    courseName: "Database Systems & SQL",
    instructor: "Dr. Nadia Khan",
    duration: "6 Weeks",
    type: "Offline",
  },
  {
    courseName: "Cloud Computing with AWS",
    instructor: "Prof. Usman Ali",
    duration: "9 Weeks",
    type: "Online",
  },
];

function CourseItem({ courseName, instructor, duration, type, index }) {
  const [hovered, setHovered] = useState(false);
  const isOnline = type === "Online";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr auto",
        gap: "1.25rem",
        alignItems: "center",
        padding: "1.25rem 1.5rem",
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: "1px solid",
        borderColor: hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
        borderRadius: "14px",
        transition: "all 0.25s ease",
        cursor: "default",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
      }}
    >
      {/* Index number */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #1e3a5f, #0d2137)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.3rem",
          fontFamily: "'Bebas Neue', cursive",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.05em",
          flexShrink: 0,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Course info */}
      <div>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1rem",
            fontWeight: "700",
            color: "#ffffff",
            margin: "0 0 0.3rem 0",
            letterSpacing: "-0.01em",
          }}
        >
          {courseName}
        </h3>
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            👤 {instructor}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            ⏱ {duration}
          </span>
        </div>
      </div>

      {/* Type badge — Bonus */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "0.72rem",
            fontFamily: "'DM Mono', monospace",
            fontWeight: "500",
            letterSpacing: "0.06em",
            background: isOnline ? "rgba(34,197,94,0.12)" : "rgba(251,191,36,0.12)",
            color: isOnline ? "#4ade80" : "#fbbf24",
            border: `1px solid ${isOnline ? "rgba(74,222,128,0.25)" : "rgba(251,191,36,0.25)"}`,
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: isOnline ? "#4ade80" : "#fbbf24",
              display: "inline-block",
            }}
          />
          {type}
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const online = courses.filter((c) => c.type === "Online").length;
  const offline = courses.filter((c) => c.type === "Offline").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #070b12; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(ellipse at 70% 20%, #0d1f35 0%, #070b12 55%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem 1.5rem",
        }}
      >
        {/* Header */}
        <div style={{ width: "100%", maxWidth: "720px", marginBottom: "2.5rem" }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              marginBottom: "0.6rem",
            }}
          >
            React Props Lab — Task 2
          </p>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: "800",
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            Course
            <span style={{ color: "rgba(255,255,255,0.25)" }}> List</span>
          </h1>

          {/* Stats bar */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem 1.25rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px",
              marginBottom: "0.25rem",
            }}
          >
            {[
              { label: "Total Courses", value: courses.length, color: "#fff" },
              { label: "Online", value: online, color: "#4ade80" },
              { label: "Offline", value: offline, color: "#fbbf24" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ flex: 1, textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.6rem",
                    fontWeight: "700",
                    color,
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Course list */}
        <div
          style={{
            width: "100%",
            maxWidth: "720px",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {courses.map((course, index) => (
            <CourseItem key={index} {...course} index={index} />
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
