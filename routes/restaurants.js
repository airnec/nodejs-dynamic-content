const express = require('express');
const uuid = require('uuid');

const resData = require('../util/restaurant-data');

const router = express.Router();

router.get('/restaurants', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
  // res.sendFile(htmlFilePath);
  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.sort(function(resA, resB) {
    if (resA.cuisine > resB.cuisine) {
      return 1
    } else {
      return -1
    }
  });

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

router.get('/restaurants/:id', function (req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-details', { restaurant: restaurant });
    }
  }

  res.status(404).render('404');
});

router.get('/recommend', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
  // res.sendFile(htmlFilePath);

  res.render('recommend');
});

router.post('^/recommend', function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();

  storedRestaurants.push(restaurant);

  resData.storedRestaurants(restaurants);

  res.redirect('/confirm');
});

router.get('/confirm', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
  // res.sendFile(htmlFilePath);

  res.render('confirm');
});

module.exports = router;
