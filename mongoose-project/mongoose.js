const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/edx-course-db";
mongoose.connect(url, {useMongoClient: true});

let Book = mongoose.model("Book", {
  name: String,
  published: Boolean,
  createdAt: Date,
  updatedAt: {type: Date, default: Date.now}
});
let practicalNodeBook = new Book({
  name: "Practical Node.js, 2nd edition",
  author: "Azat",
  link: "https://github.com/",
  createdAt: Date.now()
});
console.log("Is New?", practicalNodeBook.isNew);
practicalNodeBook.save((err, results) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("Saved: ", results);
    console.log("Is New?", practicalNodeBook.isNew); 
    Book.findOne({_id: practicalNodeBook.id}, (error, bookDoc) => {
      console.log(bookDoc.toJSON());
      console.log(bookDoc.id);
      bookDoc.published = true;
      //bookDoc.save(console.log);
      bookDoc.remove(process.exit);
    });
  }
});
