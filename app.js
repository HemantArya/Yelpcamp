var express        = require("express"),
	app            = express(),
	bodyParser     = require("body-parser"),
	mongoose       = require("mongoose"),
	flash          = require("connect-flash"),
	passport       = require("passport"),
	methodOverride = require("method-override"),
	LocalStrategy  = require("passport-local"),
	Campground     = require("./models/campground"),
	Comment        = require("./models/comment"),
	User           = require("./models/user"),
	seedDB         = require('./seed');

// Requiring Routes
var campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes 	 = require("./routes/comments"),
	indexRoutes 	 = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
/* __dirname -->  /h/# HACKING COURSE/Web Development/[FreeTutorials.Us] Udemy - The Web Developer Bootcamp/YelpCamp/v5*/
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database

// passport config
app.use(require('express-session')({
	secret: "Have a good day",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// listen route
app.listen(process.env.PORT, process.env.IP, function() {
	console.log("The YelpCamp Server has started!!!");
});

// app.listen(3000, function () {
// 	console.log("The YelpCamp Server has started!!!");
// });