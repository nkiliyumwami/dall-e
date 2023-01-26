import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

//create a new instance of the router
const router = express.Router();

//utilize the apikey
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

//create a new instance of the opeai
const opeai = new OpenAIApi(configuration);

//test this route
router.route('/').get((req, res) => {
  res.send('Hello from OpenAIA');
});

//route to make a call to the openai dalle to get photo
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    //generate the photo/image response: object
    const aiResponse = await opeai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    //get the image/phone out of the response
    const image = aiResponse.data.data[0].b64_json;

    //once we get the image, send it back to the frontend
    res.status(200).json({ photo: image });
  } catch (error) {
    //if something went wrong
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
