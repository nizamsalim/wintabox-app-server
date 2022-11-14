import { connect } from "mongoose";

const connectDatabase = (DB_URI: string) => {
  connect(DB_URI, (err) => {
    if (err) throw err;
  });
};

export default connectDatabase;
