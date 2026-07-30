const ADMIN_EMAIL = "Jay@Autodrive.com";
const ADMIN_PHONE = "+254 712884341";
const LOCATION = "Nairobi, Kenya";

export default function Contact() {
  return (
    <section className="page page--centered">
      <div className="auth-form" style={{ textAlign: "center" }}>
        <h1>Contact us</h1>
        <p style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>
          Reach us directly using the details below.
        </p>

        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <a href={`mailto:${ADMIN_EMAIL}`} style={{ color: "var(--lime)", fontWeight: 600 }}>
            {ADMIN_EMAIL}
          </a>
          <a href={`tel:${ADMIN_PHONE.replace(/\s/g, "")}`} style={{ color: "var(--lime)", fontWeight: 600 }}>
            {ADMIN_PHONE}
          </a>
          <p style={{ color: "var(--text-dim)", margin: 0 }}>{LOCATION}</p>
        </div>
      </div>
    </section>
  );
}