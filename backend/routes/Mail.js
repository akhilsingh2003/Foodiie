const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");
const Mail = require("../models/Mail");

// send mail
router.post("/mail", async (req, res) => {
  const data = req.body.order_data;
  
  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  

  await Mail.findOneAndUpdate(
    { email: req.body.email },
    { $push: { order_data: data } }
  ).then(() => {
    res.json({ success: true });
  });
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "learnercoding14@gmail.com",
        pass: "zeqtsvpbcnfvxxrc",
      },
    });

    const mailOptions = {
      from: "learnercoding14@gmail.com",
      to: req.body.email,
      subject: "Order Confirmation",
      html: ` 
      <h1>Congratulation Order Confirmed</h1> <br><hr>
            <br>
            <div className='container m-auto mt-5 table-responsive text-white  table-responsive-sm table-responsive-md' >
            <table className='table  '>
              <thead className=' text-success fs-4'>
                <tr>
                  <th scope='col' >#</th>
                  <th scope='col' >Name</th>
                  <th scope='col' >Quantity</th>
                  <th scope='col' >Option</th>
                  <th scope='col' >Amount</th>
                  <th scope='col' ></th>
                </tr>
              </thead>
              <tbody className="text-danger">
                 
                ${
                  data.map((food, index) => (
                     `<tr>
                  <th scope="row">${index + 1}</th>
                  <td>${food.name}</td>
                  <td>${food.qty}</td>
                  <td>${food.size}</td>
                  <td>${food.price}</td>
                </tr>`
                  
                   ))}
              </tbody>
            </table>
            <div>
            <h2>total price : ${totalPrice}<h2>
            </div>

          </div>
            <hr>
            <h3>Foodiie.com</h3>
            <h3>India Since 2023 </h3> `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    console.log("Error" + error);
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
