const express=require("express")
require('dotenv').config()
// const OpenAI = require("openai")
const axios = require('axios')
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("welcome")
})
console.log(process.env.OPENAI_API_KEY)


app.post('/generate-response', async (req, res) => {
  try {
    console.log(req,'is request')
    const {keyword,words,type} = req.body; // Get user's message from the request body
    console.log(typeof words)
    let promptMessage
    if(type==="joke"){
      console.log("yes")
      promptMessage=`Act as trevor noah and tell a joke on ${keyword} in ${Number(words)} words in his tone`
    }else if(type==="story"){
      promptMessage=`Act as James cameroon and give zoomout view of his upcoming  story on ${keyword} with in  ${Number(words)} words`
    }else if(type==="shayari"){
      promptMessage=`Give me poetry in hindi language on ${keyword} in tone of Amitabh Bachchan  with in ${Number(words)} words.`
    }
    console.log(promptMessage,"is prompt")
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: promptMessage,
      max_tokens: Number(words), // Adjust this as needed 
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
  console.log(response.data.choices[0].text)
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