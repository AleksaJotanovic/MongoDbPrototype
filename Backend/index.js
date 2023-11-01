const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pdf = require("html-pdf");
const nodemailer = require("nodemailer");
const { connectToDb, getDb } = require("./mongodb");
const { ObjectId } = require("mongodb");
const multer = require("multer");

// Initialisation.
const app = express();
app.use(bodyParser.json());
app.use(cors());

let database;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("Server is running on: http://localhost:3000");
    });
    database = getDb();
  }
});

//Students Backend
app.post('/api/students/add', (req, res) => {
  database.collection('students').insertOne(req.body).then((result) => {
    res.send({ status: true, message: "Student created successfully.", data: result });
  }).catch((error) => {
    res.send({ status: false, message: `Student creating failed: ${error}` });
  });
});

app.get('/api/students', (req, res) => {
  database.collection('students').find().toArray().then((result) => {
    res.send({ status: true, data: result, });
  }).catch((error) => {
    res.send({ status: false, error: `Students fetching failed: ${error}` });
  });
});

app.get('/api/students/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    database.collection('students').findOne({ _id: new ObjectId(req.params.id) }).then((result) => {
      res.send({ status: true, data: result });
    }).catch((error) => {
      res.send({ status: false, message: `Could not fetch specified document: ${error}` });
    });
  } else {
    res.send({ message: "Not valid document _id" });
  }
});

app.put('/api/students/update/:id', (req, res) => {
  let updates = { ...req.body, _id: new ObjectId(req.params.id) }
  if (ObjectId.isValid(req.params.id)) {
    database.collection('students').updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates }).then((result) => {
      res.send({ status: true, data: result });
    }).catch((error) => res.send({ status: false, message: `Could not update a document: ${error}` }));
  } else {
    res.send({ message: 'Not valid document _id.' });
  }
});

app.delete('/api/students/delete/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    database.collection('students').deleteOne({ _id: new ObjectId(req.params.id) }).then((result) => {
      res.send({ status: true, message: 'Document successfully deleted.', data: result });
    }).catch((err) => res.send({ status: false, message: `Could not delete document: ${err}` }));
  } else {
    res.send({ message: "Not valid document _id." });
  }
});

//Backend for sending emails.
app.post('/send-email', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const date = req.body.date;
  const mailContent = req.body.mailContent;

  const options = { height: '11.25in', width: '8.5in', header: { height: '20mm' }, footer: { height: '20mm' } };
  const html = `
  <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Frontend</title>
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <style type="text/css">
          .btn-pdf{
            background-color: blue;
            color: white;
            border: none;
            width: 100px;
            height: 50px;
          }
          .bordered{
            background-color: lightblue;
            color: white;
            width: 80%;
            height: 30%;
            border: 1px solid black;
          }
          .container{
            line-height: 30px;
            background-color: gray;
            color: blue;
          }
        </style>
      </head>
      <body>
        <div>
          <h1>THIS IS MY PDF FILE</h1>
          <p>This is the dummy content of this file.</p>
          <button type="button" class="btn-pdf">CLICK ME</button>
        </div>
        <div class="bordered">
          <p>From: ${name}</p>
          <p>${message}</p>
        </div>
        <div class="container">
          <h2Product Info></h2>
          <p>Price: $${price}</p>
          <p>Availability: ${quantity}</p>
          <p>Date published: ${date}</p>
        </div>
        ${mailContent}
      </body>
    </html>  
  `;
  pdf.create(html, options).toFile('invoice.pdf', (err, data) => {
    if (err) {
      console.log('Node error in pdf.create(): ', err);
    } else {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jotanovicaleksa@gmail.com', // Replace with your email address
          pass: 'uuafbvdfsqqemzgq' // Replace with your email password(Koristi se App password: moze se podesiti u podesavanjima google account-a.)
        }
      });
      const mailOptions = {
        from: 'jotanovicaleksa@gmail.com',
        to: email && email, // Replace with recipient email address
        subject: 'New Contact Form Submission',
        html: html,
        attachments: [{
          path: data.filename,
          filename: 'accounting.pdf'
        }]
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('sent: ', info.response);
        }
      });
    }
  });
});

// Uploading image.
const storage = multer.diskStorage({
  destination: '../Frontend/src/assets',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
});
const upload = multer({ storage: storage });
app.post('/upload-image', upload.single('file'), (req, res) => {
  res.send({ data: req.file.filename });
});




// Components node.js//
// database.collection('components')
app.get('/api/components/get', (req, res) => {
  database.collection('components').find().toArray().then((data) => {
    res.send(data);
  }).catch((error) => console.log('Node error - sending GET to components: ', error));
});

app.post('/api/components/post', (req, res) => {
  database.collection('components').insertOne(req.body).then((data) => {
    res.send(data)
  }).catch((error) => console.log('Node error - sending POST to components: ', error));
});

app.put('/api/components/put/:id', (req, res) => {
  const updates = { ...req.body, _id: req.params.id };
  if (req.params.id) {
    database.collection('components').updateOne({ _id: req.params.id }, { $set: updates }).then((data) => {
      res.send(data);
    }).catch((error) => console.log('Node error - sending PUT to components: ', error));
  }
});

app.delete('/api/components/delete/:id', (req, res) => {
  if (req.params.id) {
    database.collection('components').deleteOne({ _id: req.params.id }).then((data) => {
      res.send(data);
    }).catch((error) => console.log('Node error - sending DELETE to components: ', error));
  }
});