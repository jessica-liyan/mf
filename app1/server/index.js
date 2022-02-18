import express from 'express';
import React from 'react';
import initMiddleware from './middleware';
const PORT = 3001;
const app = express();

const done = () => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
};

initMiddleware(express, app, done);
