module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      id: String,
      nickname: String,
      password: String,
      createDate: Date,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);

  return User;
};
