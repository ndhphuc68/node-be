module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      username: String,
      question: String,
      status: String,
      answer: String,
      respondent: String,
    },
    { timestamps: true },
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("helpCenter", schema);
};
