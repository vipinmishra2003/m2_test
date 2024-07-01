const mongoose = require("mongoose");
const schema = mongoose.Schema;
const statickey = new schema(
  {
    type: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCK", "DELETE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const static = mongoose.model("static", statickey);

module.exports = static;
async function checkAndCreateStaticContent() {
  try {
    const staticRes = await static.find({});

    if (staticRes.length !== 0) {
      console.log("Static content already exists");
    } else {
      const objects = [
        {
          type: "T&C",
          title: "Terms and Conditions",
          description:
            "A terms and conditions agreement is rule and regulations of the company",
        },
        {
          type: "AboutUs",
          title: "About Us",
          description:
            "An about us page helps your company to show infomation about the company",
        },
        {
          type: "ContactUs",
          title: "Contact Us",
          description:
            "The contact details of the company like phone no,email.",
        },
      ];

      const createRes = await static.create(objects);
      console.log("Static content created successfully", createRes);
    }
  } catch (error) {
    console.error("Error handling static content", error);
  }
}

// Call the function
checkAndCreateStaticContent();
