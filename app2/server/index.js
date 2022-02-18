import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from '../src/index';

const app = express();
const PORT = 3002

app.get('*', (req, res, next) => {
  const html = renderToString(<App />);
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
