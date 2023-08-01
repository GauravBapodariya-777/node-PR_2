// const { log } = require('console');
const express = require('express');
const port = 4000;
const app = express();
const path = require('path')
app.use(express.static(path.join(__dirname,'public')));
let allData = [
    {
        rno: 1,
        name: "I can leave at 11:00...!"
    },
    {
        rno: 2,
        name: "My runing time at 6:00 AM...!"
    }
]
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('home', { allData });
})
app.use(express.urlencoded());
app.get('/editdata', (req, res) => {
    let id = req.query.id;
    let ans = allData.filter((v) => {
        if (v.rno == id) {
            return v;
        }
    })
    console.log(ans);
    res.render('edit', { single: ans[0] });
})
app.post('/data', (req, res) => {
    let id = req.body.editid;
    let ans = allData.filter((v) => {
        if (v.rno == id) {
            v.name = req.body.name;
        }
        return v;
    })
    allData = ans;
    res.redirect('/');
})
// app.post('/EDdata',(req,res)=>{
//     allData.filter((v)=>{
//         if(v.rno==req.body.edtid){
//             v.name = req.body.name;
//         }
//         return v;
//     });
//     res.render('/')
// })
app.get('/delData', (req, res) => {
    let id = req.query.id;
    let ans = allData.filter((v) => {
        if (v.rno != id) {
            return v;
        }
    })
    allData = ans;
    res.redirect('back');
})
app.post('/adddata', (req, res) => {
    let obj = {
        rno: req.body.rno,
        name: req.body.name
    }
    allData.push(obj);
    res.redirect('back')
})
app.listen(port, (err) => {
    if (err) {
        return console.log('your server is not start...!!!');
    }
    console.log('your server is start NOW...!!!');
})