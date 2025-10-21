import { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import axios from "axios";
import LoadingPage from "./LoadingPage";

const QRPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const offlineRef = useRef();
  const onlineRef = useRef();

  useEffect(() => {
    const fetchUserAndQR = async () => {
      try {
        // Step 1: Verify user session
        const res = await axios.get("https://resqr-ckss.onrender.com/user/verify", {
          withCredentials: true,
        });

        let verifiedUser = res.data.data;
        const localUser = JSON.parse(localStorage.getItem("user"));

        // Prefer backend data but merge with local if needed
        let userData = { ...localUser, ...verifiedUser };
        setUser(userData);

        // Step 2: If QR not generated, issue and replace localStorage with new user data
        if (!userData?.hasGeneratedQR) {
          const issueRes = await axios.post(
            "https://resqr-ckss.onrender.com/user/qr/issued",
            {},
            { withCredentials: true }
          );

          const updatedUser = issueRes.data.data;
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      } catch (err) {
        console.error("Error verifying or issuing QR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndQR();
  }, []);

  const downloadPDF = () => {
    const pdf = new jsPDF();
    const offlineSvg = offlineRef.current?.querySelector("svg");
    const onlineSvg = onlineRef.current?.querySelector("svg");

    if (offlineSvg) pdf.svg(offlineSvg, { x: 10, y: 10, width: 80, height: 80 });
    if (onlineSvg) pdf.svg(onlineSvg, { x: 110, y: 10, width: 80, height: 80 });

    pdf.save("qr_codes.pdf");
  };

  if (loading) return <LoadingPage />;
  if (!user) return <p>Please login to access this page.</p>;

  const offlineValue = `smsto:+919398969766:QR_SCANNED_ID:${user.id}`;
  const onlineValue = `https://sheikabdulrafi.github.io/lifesaver/?id=${user.id}`;

  return (
    <section>
      <h1>QR Codes</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <div ref={offlineRef} style={{ border: "1px solid black", padding: "10px" }}>
          <h3>Offline QR</h3>
          <QRCodeSVG value={offlineValue} size={150} />
        </div>
        <div ref={onlineRef} style={{ border: "1px solid black", padding: "10px" }}>
          <h3>Online QR</h3>
          <QRCodeSVG value={onlineValue} size={150} />
        </div>
      </div>
      <button onClick={downloadPDF} style={{ marginTop: "20px" }}>
        Download PDF
      </button>
    </section>
  );
};

export default QRPage;
