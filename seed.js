var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: 'The Star Meadow',
        image: 'https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
        description: 'Three tents under stars. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias.'
    },
    {
        name: 'Mountain Valley',
        image: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
        description: 'person lying inside tent and overlooking mountain. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias.'
    },
    {
        name: 'The Forest Hill',
        image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
        description: 'group of people near bonfire near trees during nighttime. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias.'
    },
    {
        name: 'Cloud\'s Rest',
        image: 'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
        description: 'man sitting on stone beside white camping tent. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum minima accusamus asperiores, tempore tempora temporibus! Eum ab, quis sapiente, totam dolores vero, deleniti molestiae officia omnis modi voluptas ipsum alias.'
    }
];

function seedDB() {
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('removed campgrounds');
            Comment.deleteMany({}, function(err) {
                if(err) {
                    console.log(err)
                } else {
                    console.log('removed comments');
                    data.forEach(function (seed) {
                        Campground.create(seed, function (err, campground) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("added a campground");
                                Comment.create({
                                    text: "This place is great, but i wish there was internet.",
                                    author: "Homer"
                                }, function (err, comment) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        campground.comments.push(comment);
                                        campground.save(function (err, commentAdded) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log('Created new comment');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
}

module.exports = seedDB;