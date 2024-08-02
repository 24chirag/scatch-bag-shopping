const mongoose = require("mongoose")
const dbgr = require('debug')("development:mongoose ")
mongoose.connect(`mongodb+srv://chiragansharma24:koko123@ecommerce.riqm85t.mongodb.net/`)
.then(function(){
  dbgr("connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports= mongoose.connection; 