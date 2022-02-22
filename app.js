const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://user:<password>>@cluster0.1cro9.mongodb.net/todolist?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=>console.log('connected to db'))
    .catch((err)=>console.log(err));

// register view engine

app.set('view engine', 'ejs');


// listen for
app.listen(3000);

// middleware & static files
app.use(express.static('public'));

app.use(morgan('dev'));

//
app.get('/add-blog', (req, res)=> {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my blog'
    });

    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.get('/all-blogs', (req, res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err)
    })
});

app.get('/single-blog', (req,res)=>{
    Blog.findById('62151b3fb947a3c5479618f5')
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err)
        })
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// blogs routers
app.get('/blogs', (req,res)=>{
    Blog.find().sort({ createdAt: -1})
    .then((result)=>{
        res.render('index',{title:'All Blogs', blogs: result})
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/blogs/create', (req,res)=>{
    res.render('create', { title: 'Create a new blog' });
})

// last method
app.use((req, res)=>{
    res.status(404).render('404', { title: '404' });
});
