const { name } = require('ejs');
const { number } = require('joi');
const mongoose = require('mongoose');
const {Schema}=mongoose;

main()
.then(()=>console.log("connection succesful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relation');

}
//one to many
const orderSchema=new Schema({
    item:String,
    price:Number,
});
 Schema.pre("findoneanddelte",async()=>{
    console.log("pre middleware");
 });
 Schema.post("findoneanddelte",async()=>{
    console.log("post middleware");
 });
const Order=mongoose.model("Order",orderSchema);
const Customer=mongoose.model("Customer",customerSchema);


const customerSchema=new Schema({
    name:String,
    order:[{
         type: Schema.Types.ObjectId, ref: 'Order'
    },],
});

//fun
const findCustomer=async()=>{
    let result=await Customer.find({}).populate("order");
    console.log(result[0]);
}
const addcustomer=async()=>{
    let cust1=new Customer({
        name:"rahul",
    });
    let order1=await Order.findOne({item:"patty"});
    let order2=await Order.findOne({item:"samosa"});

    cust1.order.push(order1);
    cust1.order.push(order2);

    let result=await cust1.save();    //populate-detail
    console.log(result);
}
addcustomer();

//create new cust and add order
// const addcustomer=async()=>{
//     let newCust=new Customer({
//         name:"karan"
//     });
   let newOrder=newOrder({
    item:"pizza",
    price:250;
   });
   newCust.orders.push(newOrder);
   await newOrder.save();
   await newCust.save();

// }
const delCust=async()=>{
    let data=await Customer.findByIdAndDelete("id");
    console.log(data);
}
delCust();
// const addOrder=async()=>{
//     let res=await Order.insertMany([
//         {item:"patty",price:12},
//         {item:"samosa",price:122},
//         {item:"drink",price:182},
//     ]);
//     console.log(res);
// };
// addOrder();