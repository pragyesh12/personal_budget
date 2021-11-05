module.exports = {
  findById(data, id) {
    const envelope = data.find((item) => item.id === parseInt(id));

    if (!envelope) {
      console.log("Not found");
    }

    return envelope;
  },

  deleteById(data, id) {
    const index = data.findIndex((item) => item.id === parseInt(id));

    if (index !== -1) {
      data.splice(index, 1);
      return data;
    }
  },

  createId(data) {
    const lEnvelope = data[data.length - 1];
    const id = lEnvelope.id + 1;
    return id;
  },
};
