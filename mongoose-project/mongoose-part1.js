const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/edx-course-db";
mongoose.connect(url, { useMongoClient: true });

const bookSchema = mongoose.Schema({
  name: String,
  published: Boolean,
  createdAt: Date,
  updatedAt: { type: Date, default: Date.now },
  email: String,
  reviews: [mongoose.Schema.Types.Mixed]
});

bookSchema.virtual("authorPhotoUrl").get(function() {
  if (!this.email) return null;
  var crypto = require("crypto"),
    email = "Hi@azat.co ";
  email = email.trim();
  email = email.toLowerCase();
  var hash = crypto
    .createHash("md5")
    .update(email)
    .digest("hex");
  var gravatarBaseUrl = "https://secure.gravatar.com/avatar/";
  return gravatarBaseUrl + hash;
});

let Book = mongoose.model('Book', bookSchema);
let practicalNodeBook = new Book({
  name: "practical Node.js, 2nf edition",
  author: "Minh Tam",
  email: "ken@gmail.co",
  link: "https://secure.gravatar.com/avatar/",
  createdAt: Date.now()
});

practicalNodeBook.save((error, results) =>{
  if(error) {
    console.error(error);
    process.exit(1);
  }
  else {
    console.info('Saved: ',results);
    console.info('Book author photo: ', practicalNodeBook.authorPhotoUrl)
    practicalNodeBook.remove(process.exit)
  }
});