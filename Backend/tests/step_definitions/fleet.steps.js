const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

const baseURL = 'http://localhost:3000';
let response;
let fleetId;

Given('a user with ID {string}', function (userId) {
  this.userId = userId;
});

When('the user creates a fleet', async function () {
  response = await axios.post(`${baseURL}/fleet`, { userId: this.userId });
  fleetId = response.data.fleetId;
});

Then('the fleet should be created successfully', function () {
  assert.strictEqual(response.status, 201);
  assert.ok(fleetId);
});

Given('a user with ID {string} and a createdFleet', async function (userId) {
  this.userId = userId;
  response = await axios.get(`${baseURL}/fleet/${userId}`);
  fleetId = response.data.fleetId;
});

When('the user registers a vehicle with plate number {string}', async function (plateNumber) {
  response = await axios.post(`${baseURL}/fleet/${fleetId}/vehicle`, { plateNumber });
  this.plateNumber = plateNumber;
});

Then('the vehicle should be registered successfully', function () {
  assert.strictEqual(response.status, 201);
  assert.strictEqual(response.data.plateNumber, this.plateNumber);
});

Given('a user with ID {string}, a created fleet, and a registered vehicle with plate number {string}', async function (userId, plateNumber) {
  this.userId = userId;
  this.plateNumber = plateNumber;
  response = await axios.get(`${baseURL}/fleet/${userId}`);
  fleetId = response.data.fleetId;
});

When('the user parks the vehicle at location {string}', async function (location) {
  const [latitude, longitude] = location.split(',').map(Number);
  response = await axios.post(`${baseURL}/fleet/${fleetId}/vehicle/${this.plateNumber}/park`, { location: { latitude, longitude } });
  this.latitude = latitude;
  this.longitude = longitude;
});

Then('the vehicle should be parked successfully', function () {
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.data.location.latitude, this.latitude);
  assert.strictEqual(response.data.location.longitude, this.longitude);
});

Given('a user with ID {string}, a created fleet, and a parked vehicle with plate number {string}', async function (userId, plateNumber) {
  this.userId = userId;
  this.plateNumber = plateNumber;
  response = await axios.get(`${baseURL}/fleet/${userId}`);
  fleetId = response.data.fleetId;
});

When('the user localizes the vehicle', async function () {
  response = await axios.get(`${baseURL}/fleet/${fleetId}/vehicle/${this.plateNumber}/location`);
});

Then('the vehicle location should be {string}', function (location) {
  const [latitude, longitude] = location.split(',').map(Number);
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.data.latitude, latitude);
  assert.strictEqual(response.data.longitude, longitude);
});

When('the user creates a fleet again', async function () {
  try {
    response = await axios.post(`${baseURL}/fleet`, { userId: this.userId });
  } catch (error) {
    this.error = error;
  }
});

Then('an error should be returned with message {string}', function (message) {
  assert.strictEqual(this.error.response.status, 400);
  assert.strictEqual(this.error.response.data.error, message);
});

When('the user registers a vehicle with plate number {string} again', async function (plateNumber) {
  try {
    response = await axios.post(`${baseURL}/fleet/${fleetId}/vehicle`, { plateNumber });
  } catch (error) {
    this.error = error;
  }
});

When('the user parks the vehicle with plate number {string} at location {string}', async function (plateNumber, location) {
  const [latitude, longitude] = location.split(',').map(Number);
  try {
    response = await axios.post(`${baseURL}/fleet/${fleetId}/vehicle/${plateNumber}/park`, { location: { latitude, longitude } });
  } catch (error) {
    this.error = error;
  }
});
