// Berkas ini digunakan untuk menuliskan program consumer queue.

require('dotenv').config();
const amqp = require('amqplib');
const NotesService = require('./NotesService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init =  async () =>{
    const notesService = new NotesService();
    const mailSender = new MailSender();
    const listener = new Listener(notesService, mailSender);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);// Membuat koneksi terlebih dahulu pada server RabbitMQ yang sudah dipasang di komputer kita.
    const channel = await connection.createChannel(); // Membuat Channel yang digunakan untuk memanggil API dalam mengoperasikan transaksi di protokol AMQP.

    // Memastikan queue dengan nama export:notes telah terbuat menggunakan fungsi channel.assertQueue.
    channel.assertQueue('export:notes',{
        durable: true,
    });

    channel.consume('export:notes', listener.listen, {noAck: true});
}

init();

