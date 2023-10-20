const express=require("express")
require('dotenv').config()
const axios = require('axios')
const app=express()
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("welcome")
})
const apiKey = process.env.OPENAI_API_KEY; // Replace with your actual API key

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
        'Authorization': `Bearer ${apiKey}`
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