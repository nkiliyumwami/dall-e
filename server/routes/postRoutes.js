import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

//create a new instance of the router
const router = express.Router();

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//ROUTES
//A.GET ALL POSTS
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//B.CREATE A POST
router.route('/').post(async (req, res) => {
  try {
    //get all the data we are sending to the frontend
    const { name, prompt, photo } = req.body;

    //upload the image/photo url to cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);

    //create a new post in our cloudinary database
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
