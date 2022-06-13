const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

const router = express.Router()
const Url = require('../models/url')


const baseUrl = 'http:localhost:5000'

router.get("/urls",async(req,res)=>{
    Url.find({}).then((url)=>{
        res.send(url)
    }).
    catch((e)=>{
        res.status(500).send(e)
    })
})

router.post('/shorten', async (req, res) => {
    const {
        longUrl
    } = req.body // destructure the longUrl from req.body.longUrl

    const isUrlValid = validUrl.isUri(longUrl)

    // check base url if valid using the validUrl.isUri method
    if (!isUrlValid) {
        return res.status(401).json('Invalid base URL')
    }

    // if valid, we create the url code
    const urlCode = shortid.generate()

    // check long url if valid using the validUrl.isUri method
        try {

                // join the generated short code the the base url 
                const shortUrl = baseUrl + '/' + urlCode

                // invoking the Url model and saving to the DB
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            
        }
        // exception handler
        catch (err) {
            console.log(err)
            return res.status(500).json({"message": "Server Error"})
        }
})

module.exports = router