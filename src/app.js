import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const listOfUsers = [];
const listOfTweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        return res.status(422).send("Todos os campos são obrigatórios");
    }

    const user = { id: listOfUsers.length + 1, username, avatar };
    listOfUsers.push(user);
    return res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    const isRegistered = listOfUsers.find(user => user.username === username);

    if (!isRegistered) {
        return res.status(401).send("UNAUTHORIZED");
    }

    if (!tweet || tweet.length === 0) {
        return res.status(422).send("Preencha o campo corretamente");
    }

    const newTweet = { id: listOfTweets.length + 1, username, tweet };
    listOfTweets.push(newTweet);
    return res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
    const lastTenTweets = listOfTweets.slice(-10);

    const showTweetByUser = lastTenTweets.map((tweet) => {

        const tweetUser = listOfUsers.find(user => user.username === tweet.username);
        const avatar = tweetUser ? tweetUser.avatar : null;
        return { ...tweet, avatar };
    });

    res.send(showTweetByUser);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Host is running at port ${PORT}`));