const mongoose = require('mongoose');
// const dbDebugger = require('debug')('app:db');


mongoose.connect("mongodb://localhost/movies")
    .then(()=> console.log("Connected to MongoDB..."))
    .catch((err) => console.log('Could not connect to MongoDB....', err));


    /*
    const genreSchema = new mongoose.Schema({
        name:String 
    });
    
    // exports.module = mongoose.model('Genre', genreSchema);
    
    const Genre = mongoose.model('Genre', genreSchema);

    async function createGenre(){
        const genre = new Genre({
            name:"Horror"
        });
    
        const result = await genre.save();
        console.log(result);
    }
    
    // createGenre();

    async function getGenres(){
        const pageSize = 10;
        const pageNumber = 2;
        // api/courses?pageSize=10&pageNumber=2

        const genres = await Genre.find({name:"Comedy"})
            .skip((pageNumber-1) * pageSize) // pagination
            .limit(pageSize)
            .sort({name: -1 }) //sort in reverse order
            .count() // count documents
            // .select({name:1})
            
        console.log(genres);
    }

    // getGenres();


    //update genre
        // can update in two ways 
        // 1. query first 2. update directly

        // query first
    async function updateGenre(id){
        const genre = await Genre.findById(id);
        if(!genre) return;

        genre.name = "Updated genre";
        const result = await genre.save();
        console.log(result);
    }

    // update directly
    async function updateDirectly(id){
        const result = await Genre.findByIdAndUpdate({_id:id}, {
            name:"Jon"
        }, {new:true})

        console.log(result);
    };


    // updateGenre('6222fc1ee04a7b90aa2547aa');
    // updateDirectly('6222fc1ee04a7b90aa2547aa');


    // remove a document

    async function remove(id){
        // const result = await Genre.remove({_id: id});
        const result  = await Genre.findByIdAndRemove(id);
        console.log(result);
    }

    // remove('6222fc55b86ba714d1dc3168');


    /**
     * Comparision operator
     * lt(less than)
     * lte(less than and equal to)
     * gt(greater than)
     * gte(greater than or equal to)
     * in
     * nin(not in)
     * eq(equal)
     * neq(not equal)
     * 
     * 
     * Example:
     * const data = Courses.find({price: {$lt: 20, $gte:10}})
     * const data = Courses.find({price: {$in : [12, 20, 33]}})
     * 
     */


    /**
     * Logical operator
     * or 
     * and
     * 
     * 
     * Example:
     * const data = Courses
     *      .find()
     *      .or([{author: Mosh}, {isPublished: true}])
     *      .and([{author: Mosh}, {isPublished: true}])
     */

    /**
     * Regular expression
     * 
     * Example:
     * const data = Courses
     *      .find({author: /^Mosh/i}) => name start with Mosh
    //  *      .find({author: /.*Mosh*.i }) => contains Mosh
            .find({author: /Hamadani$/i}) => end with Hamadani
     *      
     */
