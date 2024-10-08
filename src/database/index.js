import mongoose from "mongoose";

const mongoPSW = process.env.NEXT_PUBLIC_DB_CONNECTION_PSW;

const connectToDB = async () => {
  const connectionUrl = `mongodb+srv://sandunrmst:${mongoPSW}@clusterrmst.rn0zuff.mongodb.net/`;
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Blog database connection is successfull"))
    .catch((error) => console.log(error, "DB not connected"));
};

export default connectToDB;
