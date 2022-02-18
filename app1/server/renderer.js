import { renderToString } from 'react-dom/server';
import React from 'react';
import App from '../src/index';

export default async (req, res, next) => {
  const html = renderToString(<App />);

  res.send(html);
};
