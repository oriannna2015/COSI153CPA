
const { MongoClient } = require("mongodb");


const uri = "mongodb+srv://cs_sj:BrandeisSpr22@cluster0.kgugl.mongodb.net/OrianaChen?retryWrites=true&w=majority";

const db = new MongoClient(uri);

async function run() {
    try {
      await db.connect();
      const database = client.db('OrianaChen');
      const users = database.collection('users');
      // Query for a movie that has the title 'Back to the Future'
      const query = {username:'owen' };
      const user = await users.findOne(query);
      console.log(user);
      <Text>JSON.stringfy(user)</Text>
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }


  export default run;