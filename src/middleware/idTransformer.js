const idTransform = (result) => {
  if (typeof result === 'string') return result;
  if (result.category && result.category.id) {
    idTransform(result.category);
  };
  result._doc.id = result._doc._id;
  delete result._doc._id;
  delete result._doc.__v;
  return result;
};

module.exports = idTransform;