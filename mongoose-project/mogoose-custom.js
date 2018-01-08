const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/edx-course-db";
mongoose.connect(url, { useMongoClient: true });

let bookSchema = mongoose.Schema({name: String});

bookSchema.method({
  buy(quantity, customer, callback) {
    var bookToPurchase = this;
    console.log('buy');
    return callback();
  },
  refund(customer, callback) {
    console.log('refund');
    return callback();
  }
});


bookSchema.static({
  getZeroInventoryReport(callback) {
    //run a query on all books and get the ones with zero inventory
    console.log("getZeroInventoryReport");
    let books = [];
    return callback(books);
  },
  getCountOfBooksById(bookId, callback) {
    //run a query and get the number of books left for a given book
    console.log("getCountOfBooksById");
    let count = 0;
    return callback(count);
  }
});

let Book = mongoose.model('Book', bookSchema);
Book.getZeroInventoryReport( () => {});
Book.getCountOfBooksById(123, () => {});

let practicalNodeBook = new Book({
  name: "Practical Node.js, 2nd edition"
});

practicalNodeBook.buy(1, 2, () => {});
practicalNodeBook.refund(1, () => {});

bookSchema.post('save', function(next){
  console.log("post save");
  return next;
})


// bookSchema.pre("save", function(next) {
//   //prepare for saving
//   //upload PDF
//   return next();
// });

bookSchema.pre("remove", function(next) {
  //prepare for removing
  console.log("pre remove");  
  return next(e);
});

practicalNodeBook.save((err, results) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("Saved: ", results);
    console.log("Is New?", practicalNodeBook.isNew);
    practicalNodeBook.remove( (error, results) => {
      if (error){
        console.error(error);
        process.exit(1);
      }
      else{
        console.info("suscess");
        process.exit(0);
      }
    })
  }
});
