
const mongoose = require('mongoose');
const {Schema}=mongoose;

main()
.then(()=>console.log("connection succesful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relation');

}
//one to few
const userSchema=new Schema({
    username:String,
    addresses:[{
        location:String,
        city:String,
    }]
});

const User=mongoose.model("User",userSchema);

const addUsers=async()=>{
    let user1=new User({
        username:"sherlock",
    addresses:[{
        location:"pitampura",
        city:"london",
    }]

    });
    user1.addresses.push({location:"rohini",city:"london"});
    let result=await user1.save();
    console.log(result);
}
addUsers();