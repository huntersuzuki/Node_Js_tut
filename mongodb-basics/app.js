const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017", { dbName: "mongodbBasics" })
  .then(() => console.log("database connected"))
  .catch((error) => console.log(error));

// declaring the schema of the model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now() },
});

//creating user model
const User = mongoose.model("User", userSchema);

async function runQueryExample() {
  try {
    //creating new user document in mongodb
    Option 1 to create a user
    const newUser = await User.create({
      name: "Pranay Bhoir",
      email: "pranay@gmail.com",
      age: 25,
      isActive: true,
      tags: ["developer", "CEO", "designer"],
    });
    //Option 2 to create a user
    const newUser = new User({
      name: "Updated user",
      email: "user@gmail.com",
      age: 32,
      isActive: true,
      tags: ["designer", "animator"],
    });
    await newUser.save();
    const allUser = await User.find({});
    const getUserOfActiveFalse = await User.find({ isActive: false });
    const johnDoeUser = await User.findOne({ name: "John doe" });
    const getUserById = await User.findById("678b9617b37124a4632183e8");
    const getUserById = await User.findById(newUser._id);
    const getSelectedFields = await User.find().select("name email -_id");
    const limitUser = await User.find().limit(3).skip(1);
    const sortUser = await User.find().sort({ age: -1 });
    const countDocuments = await User.countDocuments({ isActive: true });
    const deleteUser = await User.findByIdAndDelete("678cd52c5e842167fd1b813f");
    const updateUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        $set: { age: 66 },
        $push: { tags: "Updated" },
      },
      { new: true },
    );
    console.log("User created", newUser);
    console.log("User created", allUser);
    console.log(getUserOfActiveFalse);
    console.log(johnDoeUser);
    console.log(getUserById);
    console.log(getSelectedFields);
    console.log(limitUser);
    console.log(sortUser);
    console.log(countDocuments);
    console.log("User deleted ", deleteUser);
    console.log("User updated ", updateUser);
  } catch (e) {
    console.log("Error: ", e);
  } finally {
    await mongoose.connection.close();
  }
}
runQueryExample();
