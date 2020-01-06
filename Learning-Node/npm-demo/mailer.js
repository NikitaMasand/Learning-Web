var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nm6438536@gmail.com',
    pass: 'add my password here'
  }
});

var mailOptions = {
  from: 'nm6438536@gmail.com',
  to: 'didiemail@gmail.com, bhaiemail@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'hello everyone. i am nikita only, just that i am using nodemailer. ok bye :) !'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});