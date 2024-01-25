import mongoose from "mongoose";
import app from "./app";

const {DB_HOST, PORT = 3000} = process.env;

mongoose.set("strictQuery", true);

if(DB_HOST !== undefined){
	mongoose.connect(DB_HOST)
        .then(() =>{
					app.listen(PORT, ()=> {
						console.log("Database connect success");
					});
				})
        .catch(error => {
					console.log(error.message);
					process.exit(1);
				})
}