//////////////////////////////////////////////////////////////////////////
//ROUTES FOR PERFORMING CRUD OPERATIONS ON ROUND DOCUMENTS
//////////////////////////////////////////////////////////////////////////

import User from "../models/User.js";
import {Round} from "../models/Round.js";
import express from 'express';
const roundRoute = express.Router();

//CREATE round route: Adds a new round as a subdocument to 
//a document in the users collection (POST)
roundRoute.post('/rounds/:userId', async (req, res, next) => {
    console.log("in /rounds (POST) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
    if (!req.body.hasOwnProperty("date") || 
        !req.body.hasOwnProperty("course") || 
        !req.body.hasOwnProperty("type") ||
        !req.body.hasOwnProperty("holes") || 
        !req.body.hasOwnProperty("strokes") ||
        !req.body.hasOwnProperty("minutes") ||
        !req.body.hasOwnProperty("seconds") || 
        !req.body.hasOwnProperty("notes")) {
      //Body does not contain correct properties
      return res.status(400).send("POST request on /rounds formulated incorrectly." +
        "Body must contain all 8 required fields: date, course, type, holes, strokes, " +
        "minutes, seconds, notes.");
    }
    try {
      const round = new Round(req.body);
      const error = round.validateSync();
      if (error) { //Schema validation error occurred
        return res.status(400).send("Round not added to database. " + error.message);
      }
      const status = await User.updateOne(
        {"accountData.id": req.params.userId},
        {$push: {rounds: req.body}});
      if (status.modifiedCount != 1) {
        return res.status(400).send("Round not added to database. "+
          "User '" + req.params.userId + "' does not exist.");
      } else {
        return res.status(201).send("Round successfully added to database.");
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Round not added to database. " +
        "Unexpected error occurred: " + err);
    } 
  });

//READ round route: Returns all rounds associated with a given user in 
//the users collection (GET)
roundRoute.get('/rounds/:userId', async(req, res) => {
    console.log("in /rounds route (GET) with userId = " + 
      JSON.stringify(req.params.userId));
    try {
      let thisUser = await User.findOne({"accountData.id": req.params.userId});
      if (!thisUser) {
        return res.status(400).send("No user account with specified userId " + 
           "was found in database.");
      } else {
        return res.status(200).json(JSON.stringify(thisUser.rounds));
      }
    } catch (err) {
      console.log()
      return res.status(400).send("Unexpected error occurred when looking " +
        "up user in database: " + err);
    }
  });
  
//UPDATE round route: Updates a specific round for a given user
//in the users collection (PUT)
//TO DO: Implement this route
roundRoute.put('/rounds/:userId', async (req, res, next) => {
  const index = req.body.editId;
  console.log(index);
  console.log("in /rounds (PUT) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body));
  if (!req.body.rounds[index].hasOwnProperty("date") || 
      !req.body.rounds[index].hasOwnProperty("course") || 
      !req.body.rounds[index].hasOwnProperty("type") ||
      !req.body.rounds[index].hasOwnProperty("holes") || 
      !req.body.rounds[index].hasOwnProperty("strokes") ||
      !req.body.rounds[index].hasOwnProperty("minutes") ||
      !req.body.rounds[index].hasOwnProperty("seconds") || 
      !req.body.rounds[index].hasOwnProperty("notes")) {
    //Body does not contain correct properties
    return res.status(400).send("PUT request on /rounds formulated incorrectly." +
      "Body must contain all 8 required fields: date, course, type, holes, strokes, " +
      "minutes, seconds, notes.");
  }
  try {
    const round = new Round(req.body.rounds[index]);
    const error = round.validateSync();
    if (error) { //Schema validation error occurred
      return res.status(400).send("Round not updated to database. " + error.message);
    }
    const status = await User.updateOne(
      {"accountData.id": req.params.userId},
      {$set: {rounds:req.body.rounds}});
    if (status.modifiedCount != 1) {
      return res.status(400).send("Round not updated to database. "+
        "User '" + req.params.userId + "' does not exist.");
    } else {
      return res.status(201).send("Round successfully updated to database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Round not updated to database. " +
      "Unexpected error occurred: " + err);
  } 
});

//DELETE round route: Deletes a specific round for a given user
//in the users collection (DELETE)
//TO DO: Implement this route
roundRoute.delete('/rounds/:userId', async (req, res, next) => {
  console.log("in /rounds (DELTE) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body.index));
  try {
    let thisUser = await User.findOne({"accountData.id": req.params.userId});
    thisUser.rounds.splice(req.body.index,1)
    const status = await User.updateOne(
      {"accountData.id": req.params.userId},
      {$set: {rounds: thisUser.rounds}});
    if (status.modifiedCount != 1) {
      return res.status(400).send("Round not deleted to database. "+
        "User '" + req.params.userId + "' does not exist.");
    } else {
      return res.status(201).send("Round successfully deleted to database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Round not deleted to database. " +
      "Unexpected error occurred: " + err);
  } 
});

export default roundRoute;