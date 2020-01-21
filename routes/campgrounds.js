var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

// INDEX - show all campgrounds
router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

// CREATE - add a new campground to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = { name: name, price: price, image: image, description: description, author: author};
    Campground.create(newCampground, function (err, newlyCreatedCampground) {
        if (err) {
            req.flash("error", "Something went wrong");
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "New Campground created");
            res.redirect("/campgrounds/" + newlyCreatedCampground._id);
        }
    });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function (req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            req.flash("error", "Campground not found");
            console.log(err);
            res.redirect('back');
        } else {
            //render show template with that campground
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// EDIT - edit a particular campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            req.flash("error", "Something went wrong");
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });
});

// UPDATE - update a particular campground
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            req.flash("error", "Something went wrong");
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            req.flash("success", "Successfully updated campground");
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY - delete a campground
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect('/campgrounds');
        } else {
            req.flash("success", "Deleted Campground");
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;