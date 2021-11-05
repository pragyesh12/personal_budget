const express = require("express");
const {
  getAllEnvelope,
  getEnvelopeById,
  createEnvelope,
  updateEnvelopeById,
  deleteEnvelopeById,
  transferMoney,
} = require("../controller/envelope");

const envelopeRouter = express.Router();

module.exports = envelopeRouter;

/**
 * @swagger
 * /api/v1/envelopes:
 *    get:
 *      summary: Get all envelopes
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      responses:
 *        "200":
 *          description: Returns a list of all envelopes
 *
 */

envelopeRouter.get("/", getAllEnvelope);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    get:
 *      summary: Get an envelope
 *      parameters:
 *      - in: path
 *        name: id
 *        description: envelope id
 *        type: integer
 *        required: true
 *        example: 1
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      responses:
 *        "200":
 *          description: Returns a particular envelope
 *
 */

envelopeRouter.get("/:id", getEnvelopeById);
/**
 * @swagger
 * /api/v1/envelopes:
 *    post:
 *      summary: Creates a new envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Scuba lessons
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns created envelope
 *        "500":
 *          description: Internal server error
 */
envelopeRouter.post("/", createEnvelope);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    put:
 *      summary: Updates an existing envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope ID
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Scuba lessons
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns updated envelope
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
envelopeRouter.put("/:id", updateEnvelopeById);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    delete:
 *      summary: Deletes an individual envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Envelope ID to delete
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: Envelope deleted
 *        "500":
 *          description: Internal server error
 *        "404":
 *          description: Envelope not found
 */
envelopeRouter.delete("/:id", deleteEnvelopeById);

/**
 * @swagger
 * /api/v1/envelopes/{from}/transfer/{to}:
 *   post:
 *     summary: Transfer the amount.
 *     produces:
 *      - application/json
 *     tags:
 *      - Envelopes
 *     parameters:
 *      - in: path
 *        name: from
 *        description: Envelope id to update
 *        type: integer
 *        required: true
 *        example: 1
 *      - in: path
 *        name: to
 *        description: Envelope id to update
 *        type: integer
 *        required: true
 *        example: 1
 *     requestBody:
 *        description: Amount to transfer
 *        required: true
 *        content:
 *            application/json:
 *               schema:
 *                  type: object;
 *                  properties:
 *                    amount:
 *                      type: integer
 *                  example:
 *                    amount: 300
 *     responses:
 *        "201":
 *           description: Update the envelope
 *        "500":
 *            description: internal server error
 *        "404":
 *            description: Envelope not found
 */

envelopeRouter.post("/:from/transfer/:to", transferMoney);
