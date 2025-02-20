const mongoose = require('mongoose');

// **Blog Post Schema**
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true, // Ensures title is unique
      minlength: [5, 'Title must be at least 5 characters long'],
    },
    content: {
      type: String,
      required: true,
      minlength: [50, 'Content must be at least 50 characters long'],
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [], // Array of strings for tags, optional field
    },
    category: {
      type: String,
      default: 'General', // Default category set to "General"
    },
    likes: {
      type: [String], // Array of usernames who liked the post
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now, // Sets current timestamp by default
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Sets current timestamp, will update on modifications
    },
    comments: [
      {
        username: {
          type: String,
          required: true, // Username of the commenter
        },
        message: {
          type: String,
          required: true, // Comment message is required
        },
        commentedAt: {
          type: Date,
          default: Date.now, // Automatically set the current time
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the BlogPost model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// **Connect to MongoDB**
mongoose.connect('mongodb://localhost:27017/blogApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// **Create a new Blog Post**
const newPost = new BlogPost({
  title: 'Introduction to MongoDB',
  content: 'MongoDB is a NoSQL database that stores data in JSON-like format...',
  author: 'janeDoe',
  tags: ['Database', 'NoSQL', 'MongoDB'],
});

// Save the new blog post to the database
newPost.save()
  .then((post) => {
    console.log('Blog Post Created:', post);
  })
  .catch((err) => {
    console.error('Error creating blog post:', err);
  });
