const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log("Server running at port", PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    description:String,
    publisherYear:Number
})

const book = mongoose.model('book',bookSchema)

//Implement CRUD

app.post('https://book-store-application-lu9b.onrender.com/books',async(req,res)=>{
    const newBook = new book(req.body)
    await newBook.save();
    res.json(newBook)
})

app.get('https://book-store-application-lu9b.onrender.com/books',async(req,res)=>{
    const books = await book.find();
    res.json(books)
})

//get Book by id
app.get('https://book-store-application-lu9b.onrender.com/books/:id',async(req,res)=>{
    const bookData = await book.findById(req.params.id);
    res.json(bookData)
})
//update
app.put('https://book-store-application-lu9b.onrender.com/books/:id',async(req,res)=>{
    const updateBook = await book.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(updateBook)
})

//delete
app.delete('https://book-store-application-lu9b.onrender.com/books/:id',async(req,res)=>{
    const deleteBook = await book.findByIdAndDelete(req.params.id)
    res.json({message:"Book is deleted"})
})

//search
app.get('https://book-store-application-lu9b.onrender.com/search',async(req,res)=>{
    const query = req.query;
    const book=await book.find({title:{$regrex:query,$option:"i"}})
    res.json(books)
})


app.listen(PORT,()=>{
    console.log("server running at port",PORT);
})
