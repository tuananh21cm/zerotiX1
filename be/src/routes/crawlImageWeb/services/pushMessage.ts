const amqp = require('amqplib');
const amqpUrl = 'amqps://mxmphrkc:ypGR7Qf_VpM3dNmXmVywB0Ujq4RdSfcv@ostrich.lmq.cloudamqp.com/mxmphrkc'; // Replace with your AMQP URL
const queue = 'imageCrawl'; 

export async function sendMessage() {
    try {
        const connection = await amqp.connect(amqpUrl);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });
        const message = 'Hello from 222!';
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true ,expiration: '60000' });
        console.log(`Message sent to queue "${queue}": ${message}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

export async function receiveMessages() {
    try {
        const connection = await amqp.connect(amqpUrl);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });
        console.log(`Waiting for messages in queue: "${queue}"`);
        channel.consume(queue, (msg:any) => {
            if (msg !== null) {
                console.log(`Received: ${msg.content.toString()}`);
                channel.ack(msg);
            } else {
                console.log('No messages received');
            }
        }, { noAck: false });

    } catch (error) {
        console.error('Error receiving messages:', error);
    }}