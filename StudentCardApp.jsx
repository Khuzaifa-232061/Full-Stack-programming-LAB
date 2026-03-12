import { useState } from "react";

const students = [
  {
    name: "Ali Hassan",
    rollNo: "FA21-BSE-001",
    department: "Software Engineering",
    university: "Air University",
    color: "#0f4c75",
  },
  {
    name: "Musharaf Khan",
    rollNo: "FA21-BAI-042",
    department: "Artificial Intelligence & ML",
    university: "Air University",
    color: "#1b262c",
  },
  {
    name: "Sara Malik",
    rollNo: "FA21-BCS-019",
    department: "Computer Science",
    university: "Air University",
    color: "#2d6a4f",
  },
];

function StudentCard({ name, rollNo, department, university, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: color,
        borderRadius: "16px",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease",
        boxShadow: hovered
          ? `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)`
          : `0 8px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.04)`,
        cursor: "default",
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-30px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />

      {/* Avatar */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#fff",
          marginBottom: "1.25rem",
          fontFamily: "'Playfair Display', serif",
          border: "2px solid rgba(255,255,255,0.2)",
        }}
      >
        {name.charAt(0)}
      </div>

      {/* Name */}
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.4rem",
          fontWeight: "700",
          color: "#ffffff",
          margin: "0 0 0.25rem 0",
          letterSpacing: "-0.01em",
        }}
      >
        {name}
      </h2>

      {/* Roll No badge */}
      <span
        style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.75)",
          fontSize: "0.72rem",
          fontFamily: "'DM Mono', monospace",
          fontWeight: "500",
          padding: "2px 10px",
          borderRadius: "20px",
          marginBottom: "1.25rem",
          letterSpacing: "0.05em",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {rollNo}
      </span>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.1)",
          marginBottom: "1.25rem",
        }}
      />

      {/* Info rows */}
      {[
        { label: "Department", value: department, icon: "📚" },
        { label: "University", value: university, icon: "🏛️" },
      ].map(({ label, value, icon }) => (
        <div key={label} style={{ marginBottom: "0.75rem" }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.45)",
              margin: "0 0 2px 0",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.92rem",
              color: "rgba(255,255,255,0.9)",
              margin: 0,
              fontWeight: "500",
            }}
          >
            {icon} {value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0f; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(ellipse at 20% 50%, #1a1a2e 0%, #0a0a0f 60%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.5rem",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            React Props Lab — Task 1
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "700",
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Student Information
            <span style={{ color: "rgba(255,255,255,0.35)" }}> Cards</span>
          </h1>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            width: "100%",
            maxWidth: "960px",
          }}
        >
          {students.map((student) => (
            <StudentCard key={student.rollNo} {...student} />
          ))}
        </div>

        <p
          style={{
            marginTop: "2.5rem",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.1em",
          }}
        >
          AIR UNIVERSITY · FULL STACK PROGRAMMING LAB
        </p>
      </div>
    </>
  );
}
