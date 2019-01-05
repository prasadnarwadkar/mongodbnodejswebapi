"use strict";
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = "mongodb://smsystem.documents.azure.com:10255/?ssl=true";

class HeroesService {
    constructor(req, res) {
        this.req = req
        this.res = res
    }

    insert(heroItem, db, callback) {
        var myobj = {};
        myobj.id = Math.floor(Math.random() * (1000 - 1) + 1);
        myobj.name = heroItem.name;

        db.db("smsystem").collection('Users').insertOne(myobj, function () {
            callback()
        })
    }

    update(heroItem, db, callback) {
        var newvalues = { $set: {name: heroItem.name } };
        
        var myquery = {};
        myquery.id = heroItem.id;
        
        db.db("smsystem").collection('Users').updateOne(myquery, newvalues, 
            function () {
            callback()
        })
    }

    addHero() {
        console.log('In service');
        let self = this;
        let heroItem = this.req.body.heroItem;
        console.log(heroItem.name);
        try {
            var options = { auth: {
                user: 'smsystem',
                password: 'kaDXI5Zkmxhe0CMGSVBQMPwulIQ5KgRt76oeMEDyb6XM5LbgMhZGeQ2ARDAfz6LOdAbGr83JovKKElw57bvNBw==',
               }, useNewUrlParser: true };

            MongoClient.connect(url, options, function (err, db) {
                assert.equal(null, err);
                self.insert(heroItem, db, function () {
                    db.close()
                    return self.res.status(200).json({
                        status: 'success'
                    })
                })
            });
        }
        catch (error) {
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    updateHero() {
        console.log('Update hero In service');
        let self = this;
        let heroItem = this.req.body.heroItem;
        console.log(heroItem.name);
        try {
            var options = { auth: {
                user: 'smsystem',
                password: 'kaDXI5Zkmxhe0CMGSVBQMPwulIQ5KgRt76oeMEDyb6XM5LbgMhZGeQ2ARDAfz6LOdAbGr83JovKKElw57bvNBw==',
               }, useNewUrlParser: true };

            MongoClient.connect(url, options, function (err, db) {
                assert.equal(null, err);
                self.update(heroItem, db, function () {
                    db.close()
                    return self.res.status(200).json({
                        status: 'success'
                    })
                })
            });
        }
        catch (error) {
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    getHero() {
        // Response handling
        let response = {
            status: 200,
            data: [],
            message: null
        };

        let self = this;
        let heroList = [];
        try {
            var options = { auth: {
                user: 'smsystem',
                password: 'kaDXI5Zkmxhe0CMGSVBQMPwulIQ5KgRt76oeMEDyb6XM5LbgMhZGeQ2ARDAfz6LOdAbGr83JovKKElw57bvNBw==',
               }, useNewUrlParser: true };

            MongoClient.connect(url, options, function (err, db) {
                console.log('get hero');
                assert.equal(null, err);

                db.db("smsystem").collection('Users')
                    .find()
                    .toArray()
                    .then((users) => {
                        response.data = users;
                        self.res.json(response);
                    })
                    .catch((err) => {
                        //sendError(err, res);
                    });




            });


        }
        catch (error) {
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }
}
module.exports = HeroesService