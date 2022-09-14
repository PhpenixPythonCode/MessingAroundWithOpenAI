const express = require('express')
var app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req,res) => {
    res.send('<form action="/ai" method="post"><input name="text" type="text" placeholder="Input text"><br><input type="submit"></form>')
})

app.post('/ai', async (req,res) => {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: "text-ada-001",
        prompt: req.body.text,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    res.send(response.data.choices[0].text)
})

app.listen(3000, (e) => {
    if(e){
        console.log('Error starting server!')
        throw e
    }else{
        console.log('Server is listening on http://localhost:3000')
    }
})