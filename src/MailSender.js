// Berkas ini digunakan untuk menuliskan fungsi dalam mengirim pesan melalui email.

const nodemailer = require('nodemailer');

class MailSender{
    // Untuk mengirimkan email, langkah awal kita perlu membuat objek transport. Ketika membuat objek transport, kita harus menetapkan nilai host, port, serta properti lain yang dibutuhkan agar nodemailer dapat dapat menggunakan server SMTP yang kita tetapkan.
    constructor() {
        this._transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD,
          },
        });
    }

    // Fungsi Mengirim Email,Parameter targetEmail merupakan alamat email tujuan, di mana nanti kita akan mendapatkannya dari pesan yang ada di queue. Kemudian, parameter content merupakan data notes yang didapat dari fungsi getNotes di NotesService. 
    sendEmail(targetEmail, content){
        //Untuk mengirimkan email, kita akan menggunakan fungsi this._transporter.sendMail. Namun, ketahuilah bahwa sebelum menggunakan fungsi tersebut, kita membutuhkan objek message configuration yang mendefinisikan identitas dan isi dari email seperti pengirim, penerima, judul, isi email, hingga attachment.
        const message = {
            from: 'Notes App',
            to: targetEmail,
            subject: 'Ekspor Catatan',
            text: 'Ouyy Ekspor File Berhasil!!',
            attachments: [
                {
                filename: 'notes.json',
                content,
                },
            ],
        }

        return this._transporter.sendMail(message);// Fungsi sendMail akan mengembalikan promise yang membawa status pengiriman email. Kita bisa manfaatkan itu sebagai nilai return. Tujuannya, agar kita bisa menggunakan async/await ketika menggunakan fungsi sendEmail untuk mendapatkan status pengirimannya.
    }
}

module.exports = MailSender;