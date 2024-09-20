const mongoose = require('mongoose');

const uri = 'mongodb+srv://<newuser>:<newuser>@cluster0.txil2sc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect', err));
