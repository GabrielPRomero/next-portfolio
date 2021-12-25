import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (!email || !email.includes("@") || !name || !message) {
      res.status(422).json({
        message: "Please provide all required fields",
      });
      return;
    }

    const newMsg = {
      email,
      name,
      message,
    };

    let client;

    const connesctionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.r3hor.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connesctionString);
    } catch (error) {
      res.status(500).json({
        message: "Error connecting to database",
      });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMsg);
      newMsg.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({
        message: "Error saving message",
      });
      return;
    }

    client.close();

    res.status(201).json({
      message: "Message sent successfully",
      message: newMsg,
    });
  }
}
