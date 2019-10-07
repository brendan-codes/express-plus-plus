const express        = require('express'),
      path           = require('path'),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      Schema         = mongoose.Schema,
      PORT           = 8020;


let app = express();

mongoose.connect('mongodb://localhost:27017/survey-ex');

let SurveySchema = new Schema({
    name: String,
    email: String
});

let Survey = mongoose.model('Survey', SurveySchema);



app.use(bodyParser.urlencoded());



app.use(express.static(path.join(__dirname, './static/css')));
app.use(express.static(path.join(__dirname, './static/html')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


app.get("/", function(req, res){
    Survey.find()
        .then(function(data){
            console.log(data);
            res.render('index', {surveys: data})
        })
        .catch(function(err){
            console.log(err);
            res.render('index');
        })
})


app.post('/survey', function(req, res){
    // console.log(req.body);
    Survey.create(req.body)
        .then(function(data){
            console.log(data);
            res.redirect('/');
        })
        .catch(function(err){
            console.log(err);
            res.redirect('/');
        })
})

app.listen(PORT, function(){
    console.log(`We are doing survey on Port ${PORT}`);
})