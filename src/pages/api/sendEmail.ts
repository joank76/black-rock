import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'blackrock.groupx@gmail.com', // Reemplázalo con tu correo de Gmail
        pass: 'bwaz bvcu chza ghnx', // ⚠️ Usa una contraseña de aplicación de Google
      },
    });

    try {
      const info = await transporter.sendMail({
        from: `"Solicitud Web" <blackrock.groupx@gmail.com>`,
        to: 'blackrock.groupx@gmail.com',
        subject: 'Nuevo Mensaje de Solicitud',
        text: `Mensaje recibido: ${message}`,
      });

      console.log('Correo enviado:', info.response);
      res.status(200).json({ message: `Correo enviado con éxito a ${info.accepted}` });
    } catch (error) {
      console.error('Error enviando correo:', error);
      //res.status(500).json({ error: error?.message ?? 'Error enviando el correo' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}