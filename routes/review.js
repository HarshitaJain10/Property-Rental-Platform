//express router
const express=require("express");
const router=express.Router({mergeParams:true});          //router obj
const wrapAsync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Review=require('../models/review.js');
const Listing=require("../models/listing.js");
const {isLoggedIn,isReviewAuthor}=require("../middleware.js");


//rev
  const validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        const errMsg=err.details.map((el)=>el.message).join(",");
        return res.status(400).render("listings/new.ejs", { error: errMsg, listing: req.body.listing });
    }
    next();
 };

//reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newRev=new Review(req.body.review);
    newRev.author=req.user._id;
    console.log(newRev);
    listing.reviews.push(newRev);      //listing.js
    await newRev.save();
    await listing.save();
     req.flash("success","new review created");  
    res.redirect(`/listings/${listing._id}`);

}));

//del rev
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
     req.flash("success","review deleted");  
    res.redirect(`/listings/${id}`);
}));

module.exports=router;