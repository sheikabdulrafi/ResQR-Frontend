import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import axios from "axios";
import LoadingPage from "../pages/LoadingPage";
import { toast } from "react-hot-toast";

const QRPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrGenerated, setQrGenerated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Step 1: Verify user session
        const verifyRes = await axios.get(
          "https://resqr-ckss.onrender.com/user/verify",
          { withCredentials: true }
        );

        if (verifyRes.data.success) {
          const user = verifyRes.data.data;
          setUserData(user);

          // Step 2: Check if QR already generated
          if (!user.hasGeneratedQR) {
            setQrGenerated(true);

            // Hit backend endpoint to mark QR issued
            await axios.post(
              "https://resqr-ckss.onrender.com/user/qr/issued",
              { userId: user.id },
              { withCredentials: true }
            );
          } else {
            setQrGenerated(true);
          }
        } else {
          toast.error("You must be logged in to access this page");
        }
      } catch (err) {
        console.error(err);
        toast.error("Session verification failed. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const downloadPDF = () => {
    if (!userData) return;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Offline QR", 30, 20);
    doc.text("Online QR", 130, 20);

    // Draw QR codes as images
    const offlineQR = document.getElementById("offlineQR");
    const onlineQR = document.getElementById("onlineQR");

    doc.addImage(offlineQR.toDataURL(), "PNG", 20, 30, 60, 60);
    doc.addImage(onlineQR.toDataURL(), "PNG", 120, 30, 60, 60);

    doc.save("lifesaver_qr.pdf");
  };

  if (loading) return <LoadingPage />;

  if (!userData) return <p>Please login to view QR codes</p>;

  // URLs
  const onlineQRUrl = `https://sheikabdulrafi.github.io/lifesaver/?id=${userData.id}`;
  const offlineSMSUrl = `smsto:+919398969766?body=QR_SCANNED_ID:${userData.id}`;

  return (
    <section style={{ padding: "20px", textAlign: "center" }}>
      <h1>Lifesaver QR Codes</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            border: "2px solid #333",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Offline QR</h3>
          <QRCode
            id="offlineQR"
            value={offlineSMSUrl}
            size={180}
            level="H"
            includeMargin={true}
          />
        </div>

        <div
          style={{
            border: "2px solid #333",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Online QR</h3>
          <QRCode
            id="onlineQR"
            value={onlineQRUrl}
            size={180}
            level="H"
            includeMargin={true}
          />
        </div>
      </div>

      <button
        onClick={downloadPDF}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "crimson",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>
    </section>
  );
};

export default QRPage;
