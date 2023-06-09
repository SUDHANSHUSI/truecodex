

const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

exports.createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  const contactData = {
    name,
    email,
    phone,
    message,
    created_at: new Date()
  };

  const contact = new Contact(contactData);
  const savedContact = await contact.save();

  sendEmail(contactData);

  res.json({ id: savedContact._id, savedContact });
});

async function sendEmail(contactData) {
  const message = `<p>Hi, <br />Someone has submitted the contact form.</p>
    <p><strong>Name: </strong>${contactData.name}</p>
    <p><strong>Email: </strong>${contactData.email}</p>
    <p><strong>Phone: </strong>${contactData.phone}</p>
    <p><strong>Message: </strong>${contactData.message}</p>
    <br />Thanks`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sudhanshusingh0401@gmail.com',
      pass: 'uqkgrbrpjtizricv'
    }
  });

  const mailOptions = {
    from: 'sudhanshusingh0401@gmail.com',
    to: 'kedforstudy02@gmail.com',
    // cc: 'another@rsgitech.com',
    // bcc: 'them@rsgitech.com',
    subject: 'Contact Form',
    html: message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}


