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
            "A terms and conditions agreement is the agreement that includes the terms, rules, and guidelines of acceptable behavior and other useful sections to which users must agree in order to use or access your website and mobile app.",
        },
        {
          type: "AboutUs",
          title: "About Us",
          description:
            "An about us page helps your company make a good first impression and is critical for building customer trust and loyalty.",
        },
        {
          type: "ContactUs",
          title: "Contact Us",
          description:
            "They slap an email address, phone, and location on a plain background and call it a day.",
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
