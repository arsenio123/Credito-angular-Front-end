const express = require('express');
const app = express();

// Serve static files from the dist directory
app.use(express.static(__dirname + '/dist/credito-workflow', {
  // Set explicit MIME type for JavaScript files
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

// Redirect all other requests to index.html
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/credito-workflow/index.html');
});

// Start the server
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});