//express router
const express=require("express");
const router=express.Router();          //router obj
const wrapAsync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner}=require("../middleware.js");
const multer= require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });
require("dotenv").config();

const mapToken=process.env.MAP_TOKEN;

async function geocodeLocation(location) {
    if (!location) return null;

    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${process.env.MAP_TOKEN}`;

    const response = await fetch(url);

    //  CHECK RESPONSE TYPE
    if (!response.ok) {
        console.log("MapTiler error:", await response.text());
        return null;
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
        return null;
    }

    return data.features[0].center;
}


//schema validate
 const validateListing=(req,res,next)=>{
    const {error}=listingSchema.validate(req.body);
    if(error){
        const errMsg=err.details.map((el)=>el.message).join(",");
        return res.status(400).render("listings/new.ejs", { error: errMsg, listing: req.body.listing });
       
    }
    next();
 };


 //INDEX ROUTE-LISTING
 router.get("/",wrapAsync(async (req,res)=>{
    const allListings=await Listing.find({});
    // filter listings that have geometry for map
    const listings = allListings.filter(
      (l) => l.geometry && l.geometry.coordinates
    );
    res.render("listings/index.ejs",{allListings,
      listings,
      MAP_TOKEN: process.env.MAP_TOKEN,});
   
 }));

 //new route
 router.get("/new",isLoggedIn, (req,res)=>{
    
    res.render("listings/new.ejs");
 });

 //show route
router.get("/:id",wrapAsync(async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author",
    },
    }).populate("owner");
    res.render("listings/show.ejs",{listing});
}));

//create route
router.post("/",isLoggedIn, upload.single('listing[image]'),validateListing,wrapAsync(async (req,res,next)=>{
    //let{title,description,image,price,country,location}=req.body;
   
       const newListing=new Listing(req.body.listing);
       if (req.file) {
        newListing.image = {
        url: req.file.path,
        filename: req.file.filename
    };
}
        newListing.owner=req.user._id;
        //map
        const coords = await geocodeLocation(req.body.listing.location);
        
        if (coords) {
            newListing.geometry = {
                type: "Point",
                coordinates: coords
      };
    }
        let savedlisting=await newListing.save();
        console.log(savedlisting);
        req.flash("success","new listing created");   //key,msg
        res.redirect("/listings");
})
);

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
     res.render("listings/edit.ejs",{listing,originalImageUrl});
}));

//update
router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(async (req,res)=>{
    let{id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!=="undefined"){                     //checkin undefined
         let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
   
    res.redirect(`/listings/${id}`);
}));

//delte
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let{id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
     req.flash("success", "listing deleted");  
    res.redirect("/listings");
}));

module.exports=router;