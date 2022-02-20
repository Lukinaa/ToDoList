const express = require('express');

// express app
const app = express();

// register view engine

app.set('view engine', 'ejs');


// listen for
app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [
        {title: "Yoshi makarosi", snippet: "I'm makaroshi"},
        {title: "Mario udario", snippet: "I'm udario"},
        {title: "How make app", snippet: "I'm make app"},
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req,res)=>{
    res.render('create', { title: 'Create a new blog' });
})

// last method
app.use((req, res)=>{
    res.status(404).render('404', { title: '404' });
});
