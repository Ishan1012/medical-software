import { PopulatedAppointment } from "../interface/IAppointment";

export function AppointmentConfirmationEmail(appointment: PopulatedAppointment) {
    const { patientInfo, doctor, type, date, time } = appointment;

    return `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f9fc;padding:30px 0;font-family:Arial, Helvetica, sans-serif;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border-radius:12px;padding:30px;">
          <tr>
            <td align="center">
              <img src="https://drive.usercontent.google.com/download?id=1OGpcEC6Y-zfXihumajm7qP2Z0UL_Lrji&export=view&authuser=0" alt="Confirmed" width="80" style="margin-bottom:20px;">
              <h1 style="color:#1a202c;font-size:24px;margin:0;">Appointment Confirmed!</h1>
              <p style="color:#4a5568;font-size:16px;margin-top:8px;">
                A confirmation email has been sent to <strong>${patientInfo.email}</strong>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding-top:30px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7fafc;border-radius:8px;padding:20px;">
                <tr>
                  <td style="font-size:18px;font-weight:bold;color:#2d3748;padding-bottom:10px;">Appointment Summary</td>
                </tr>
                <tr><td style="font-size:14px;color:#2d3748;padding-bottom:6px;"><strong>Patient:</strong> ${patientInfo.name}, ${patientInfo.age} (${patientInfo.gender})</td></tr>
                <tr><td style="font-size:14px;color:#2d3748;padding-bottom:6px;"><strong>Contact:</strong> ${patientInfo.phone} | ${patientInfo.email}</td></tr>
                <tr><td style="font-size:14px;color:#2d3748;padding-bottom:6px;"><strong>Address:</strong> ${patientInfo.address}</td></tr>
                <tr><td style="font-size:14px;color:#2d3748;padding-bottom:6px;"><strong>Type:</strong> ${type}</td></tr>
                <tr><td style="font-size:14px;color:#2d3748;padding-bottom:6px;"><strong>Doctor:</strong> Dr. ${doctor?.name || "N/A"} (${doctor?.specialty || "N/A"})</td></tr>
                <tr><td style="font-size:14px;color:#2d3748;"><strong>Date & Time:</strong> ${date} at ${time}</td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top:25px;">
              <p style="font-size:13px;color:#a0aec0;">Thank you for choosing <strong>WellNest</strong>.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}
