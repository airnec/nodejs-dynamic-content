const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

const resData = require('./util/restaurant-data');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'index.html');
  // res.sendFile(htmlFilePath);

  res.render('index');
});

app.get('/restaurants', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
  // res.sendFile(htmlFilePath);
  const storedRestaurants = resData.getStoredRestaurants();

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get('/restaurants/:id', function (req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-details', { restaurant: restaurant });
    }
  }

  res.status(404).render('404');
});

app.get('/recommend', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
  // res.sendFile(htmlFilePath);

  res.render('recommend');
});

app.post('^/recommend', function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();

  storedRestaurants.push(restaurant);

  resData.storedRestaurants(restaurants);

  res.redirect('/confirm');
});

app.get('/about', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'about.html');
  // res.sendFile(htmlFilePath);

  res.render('about');
});

app.get('/confirm', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
  // res.sendFile(htmlFilePath);

  res.render('confirm');
});

app.use(function(req, res) {
  res.status(404).render('404');
});

app.use(function(error, req, res, next) {
  res.status(500).render('500');
});

app.listen(3000);
