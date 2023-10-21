const express=require("express")
require('dotenv').config()
const OpenAI = require("openai")
const axios = require('axios')
const app=express()
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("welcome")
})
console.log(process.env.OPENAI_API_KEY)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// // const apiKey = process.env.OPENAI_API_KEY; // Replace with your actual API key
// app.get("/quote", async (req, res) => {
//   try {
//     const { keyword, type, words } = req.query;
//     console.log(req.query);
//     const chatCompletion = await openai.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: `Please provide me with a ${type} with respect to ${keyword} with maximum ${words} words`,
//         },
//       ],
//       model: "gpt-3.5-turbo",
//     });

//     const shayari = chatCompletion.choices[0].message;
//     res.send({ message: shayari.content });
//   } catch (error) {
//     res.status(400).send({ error: error });
//   }
// });

app.post('/generate-response', async (req, res) => {
  try {
    // console.log(req.body)
    const userMessage = req.body.message; // Get user's message from the request body
console.log(userMessage,'is userMessage')
    // Send a request to the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: userMessage,
      max_tokens: 50, // Adjust this as needed
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
  console.log(response.data)
    const aiResponse = response.data.choices[0].text;

    res.json({ response: aiResponse });
  } catch (error) {
    console.error(error.message,"is error");
    res.status(500).json({ error: error.message });
  }
});
app.listen(process.env.PORT,()=>{
    console.log("Port",process.env.PORT,"is running")
})