const db = require("../config/db");
const helper = require("../helpers/db-helpers");

exports.getAllEnvelope = async (req, res, next) => {
  try {
    const envelops = await db;
    res.status(200).send(envelops);
  } catch (e) {}
};

exports.getEnvelopeById = async (req, res, next) => {
  try {
    const envelops = await db;

    const envelope = helper.findById(envelops, req.params.id);

    if (envelope) {
      res.status(200).send(envelope);
    } else {
      res.status(400).send("Item not found");
    }
  } catch (e) {}
};

exports.createEnvelope = async (req, res, next) => {
  try {
    const temp = req.body;
    const envelops = await db;

    const newId = helper.createId(envelops);

    const envelope = {
      id: newId,
      title: temp.title,
      amount: temp.budget,
    };

    if (envelope) {
      envelops.push(envelope);
      res.status(201).send(envelope);
    } else {
      res.status(400).send("Please provide envelop");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.updateEnvelopeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const envelops = await db;
    const envelope = helper.findById(envelops, id);
    const index = envelops.findIndex((item) => item.id === parseInt(id));

    if (!envelope) {
      return res.status(400).send("id not found");
    }

    const { title, budget } = req.body;
    if (title) {
      envelope.title = title;
    }

    if (budget) {
      envelope.amount = budget;
    }

    envelops[index] = envelope;
    res.status(201).send(envelops);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.deleteEnvelopeById = async (req, res, next) => {
  try {
    const envelops = await db;
    const envelope = helper.findById(envelops, req.params.id);

    if (!envelope) {
      return res.status(400).send("Unable to delete envelope");
    }

    const updatedEnvelope = helper.deleteById(envelops, id);
    res.status(204).send(updatedEnvelope);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.transferMoney = async (req, res, next) => {
  try {
    const envelops = await db;
    const { from, to } = req.params;

    const fromEnv = helper.findById(envelops, from);
    const toEnv = helper.findById(envelops, to);
    if (!fromEnv || !toEnv) {
      return res.status(404).send("Envelope not found");
    }
    const { amount } = req.body;
    if (fromEnv.amount < amount) {
      return res.status(400).send("Not sufficient balance");
    }
    fromEnv.amount -= amount;
    toEnv.amount += amount;
    res.status(201).send(toEnv);
  } catch (e) {
    res.status(500).send(e);
  }
};
