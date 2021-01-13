const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=881faea309590517d3fb9eab33e6a8da&query='+ latitude +','+ longitude +'&units=f'
    request({url: url, json:true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        }
        else if(response.body.error){
            callback('Unable to find coordinates. Please enter valid coordinates', undefined)
        }
        else {
            callback(undefined, 'The weather is ' + response.body.current.weather_descriptions + ' and the temperature is '+ response.body.current.temperature)
        }
    })
 
}

module.exports=forecast