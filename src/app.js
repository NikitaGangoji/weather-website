const express = require('express');
const path = require('path')
const hbs = require('hbs')
const geocode =  require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') //to set handlebars
app.use(express.static(path.join(__dirname, '../public')))
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Nikita G'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name:'Nikita G'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message:'Hi, You can find any help required here',
        title:"Help",
        name:'Nikita G'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={} ) => {
        if(error) {
            return res.send({error})

        }

        forecast(latitude, longitude, (error, forecastdata) => {
                if(error) {
                    return res.send({error})
                }

                res.send({
                    forecast: forecastdata,
                    location,
                    address:req.query.address
                })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error:'You must provide a search parameter'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Nikita G',
        errorMessage:'Page Not Found'
    })
})


app.listen(port, () => {
    console.log('Server is up and running on port 3000');
})