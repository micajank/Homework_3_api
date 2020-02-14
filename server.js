const express = require("express");
const app = express();
const db = require("./models")

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("HOME😈");
})

// What we are doing: API to query for subscriptions I use

// Route 1 lookup all subscriptions that user owns  GET
// Index - GET /subscriptions
app.get("/users", (req, res) => {
    db.user.findAll().then(function(users) {
        res.json(users);
    }).catch(err => {
        console.log(err)
        res.send("ERROR");
    })
})

// Route 4 sign up for new subscruption (aka POST route to db)
// Create - POST /users (redirect to /users/:id)
app.post("/users", (req, res) => {
    console.log(req.body);
    db.user.findOrCreate({
        where: {
            subscription: req.body.subscription
        },
        defaults: {
            price: req.body.price,
            chargeDate: req.body.chargeDate,
            cardName: req.body.cardName,
            email: req.body.email
        }
    }).then(function([user, created]) {
        console.log(`Successfully ${created ? "created" : "found"} ${user.subscription} that will charge ${user.price} on the ${user.chargeDate} of this month`);
        res.redirect(`/users/${user.id}`);
    }).catch(err => {
        console.log(err);
        res.send("ERROR");
    })
})

// Route 2 lookup subscriptions user owns by subscription name GET
// Show - GET /users/:id
app.get("/users/:id", (req, res) => {
    db.user.findOne({
        where: {
            subscription: req.body.subscription
        }
    }).then(function(user) {
        console.log(`Found subscription by name: ${user.subscription} at id: ${user.id}`);
        res.redirect(`/user/${user.id}`);
    }).catch(err => {
        console.log(err);
        res.send("ERROR");
    })
});

// Route 3 update subscription price and date user owns  PUT
// Update - PUT /users/:id (redirect to /users/:id)
app.put("/users/:id", (req, res) => {
    db.user.update({
        price: req.params.price,
        chargeDate: req.params.chargeDate
    }, {
        where: {
            subscription: req.params.subscription
        }
    }).then(function(updated) {
        console.log(updated)
        if (updated) {
            console.log(`Successfully updated`);
            res.redirect(`/users/${user.id}`);
        }
    }).catch(err => {
        console.log(err);
        res.send("ERROR")
    })
})

// Route 5 cancel a subscription (aka a DELETE route to db)
// Destroy DELETE /users/:id (redirect to /users)
app.delete("/users/:id", (req, res) => {
    db.user.destroy({
        where: {
            subscription: req.params.subscription
        }
    }).then(function(numDeleted) {
        console.log("BYE");
        console.log(numDeleted);
        res.redirect("/users");
    }).catch(err => console.log(err));
})

app.listen(3000, ()=>console.log("😈You're listening to MPR Won😈"));