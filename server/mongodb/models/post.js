import mongoose from 'mongoose';

//create a schema
const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

//create a model out of the schema
const PostSchema = mongoose.model('Post', Post);

export default PostSchema;
