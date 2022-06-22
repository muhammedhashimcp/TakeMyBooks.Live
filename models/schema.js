const mongoose=require("mongoose")

const booksSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title:{
        type:String,
        unique:true
    },
    author:{
        type:String,

    },
    bookDescription:{
        type:String,

    },
    keywords:[
        String,
    ],
    price:{
        type:Number,

    },
    ISBN:{
        type:Number,
        unique:true
    },
    stock:{

    },
    img:
    {
        data: Buffer,
        contentType: String
    }

})



const Books=new mongoose.model("books",booksSchema);

