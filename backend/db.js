const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const MongoURI ="mongodb+srv://aks14:Ak202013@cluster0.wz4vaza.mongodb.net/Foodiie?retryWrites=true&w=majority";
const DbConnection = async() => {
  await mongoose.connect(MongoURI , async(err,result) => {
    if(err) console.log("--- ",err);
    else{
    console.log("Connected to MongoDB");
    const fetched_data=await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function(err, data){

      const foodCategory=await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function(err,catData){
          if(err)console.log(err); 
          else{
            global.food_items =data;
            global.foodCategory=catData;
          }
        }) 
      // if(err) console.log(err);
        // else{
        //   global.food_items =data;
        // }
    })
    }

 });
};

module.exports= DbConnection;