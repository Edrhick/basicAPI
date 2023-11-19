import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


//Will add a form where people can choose the character and house to be able to filter better.
app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://api.gameofthronesquotes.xyz/v1/random"
    );
//in order to get the api check the documentation first then try it within the postman so that you will know what to put when rendering
    res.render("index.ejs", {
      characterName: result.data.character.name,
      characterSlug: result.data.character.slug,
      houseName: result.data.character.house.name,
      sentence: result.data.sentence,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
