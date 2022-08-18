const { default: mongoose } = require("mongoose");
const slugify = require("../utils/utils");
const geoCoder = require('../utils/geoCoder')

const bootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a name"],
    unique: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    trim: true,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 50 characters"],
  },
  website: {
    type: String,
    match: [
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
      "Please use valid URL with http or https",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone lenmgth can not be more than 50 characters"],
  },
  email: {
    type: String,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter correct email",
    ],
    required: [true, "Email is required"],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Please enter address"],
  },
  location: {
    //GeoJSON point
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      //required: true,
    },
    coordinates: {
      type: [Number],
      //required: true,
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  careers: {
    type: [String],
    //required: true,
    enum: [
      "Frontend Development",
      "Backend Development",
      "Mobile Development",
      "Fullstack Development",
      "UI/UX",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be atleast one"],
    max: [5, "Rating must cannot be more than 5"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});

//Cascade delete course when bootcamp is deleted
bootcampSchema.pre('remove', async function(next){
  await this.model('Course').deleteMany({bootcamp:this._id})
  next()
})

//Virtuals: Reverse polulate
bootcampSchema.virtual('courses',{
  ref:'Course',
  localField:'_id',
  foreignField:'bootcamp',
  justOne:false
})

//Bootcamp Slug from the name
bootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

//Geocode & location fields
 bootcampSchema.pre('save', async function(next){
  const loc = await geoCoder.geocode(this.address)
  this.location= {
    type:'Point',
    coordinates : [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].state,
    zipCode: loc[0].zipcode,
    country: loc[0].countryCode
  }

  //Do not save this details in DB
  this.address = undefined
  next()
}) 

module.exports = mongoose.model("Bootcamp", bootcampSchema);
