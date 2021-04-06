const Book=require('../models/Book');

exports.createBook=async (req,res)=>{
    try {
        const {title,genre,author,read}=req.body;
        const newBook={};

        let book=await Book.findOne({title,author});

        if(book){
            return res.status(400).json({msg:'El libro ya existe'});
        }
    
        newBook.title=title;
        newBook.genre=genre;
        newBook.author=author;
        newBook.read=read;
        
        //crea el nuevo usuario
        book=new Book(newBook);

        //guarda usuario
        await book.save();

        //Mensaje
         res.status(201).json({book,msg:'Libro creado correctamente'});

    } catch (error) {
        res.status(500).json({msg:'Hubo un error'});
    }
}

exports.getBook = async (req, res) => {
    try {
        // Obtener Libros
        const books = await Book.find(req.query);
        res.json({ books });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.getBookId = async (req, res) => {
    try {
        // Obtener Libros por id
        const book = await Book.findById(req.params.id);
        res.json({ book });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateBook=async (req,res)=>{
    try {
        let book = await Book.findById(req.params.id);
        if(!book){
            return res.status(400).json({msg:'Libro no encontrado'});
        }

        const {title,genre,author,read}=req.body;
        const newBook={};
    
        newBook.title=title;
        newBook.genre=genre;
        newBook.author=author;
        newBook.read=read;

        // actualizar
        book = await Book.findByIdAndUpdate({ _id: req.params.id }, { $set : newBook}, { new: true });

        res.json({book});

    } catch (error) {
        res.status(500).json({msg:'Hubo un error'});
    }
}

exports.deleteBook = async (req, res ) => {
    try {
        // revisar el ID 
        let book = await Book.findById(req.params.id);
        if(!book) {
            return res.status(400).json({msg: 'Libro no encontrado'})
        }

        await Book.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Libro eliminado'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}
