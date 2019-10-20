// https://github.com/json-schema-faker/json-schema-faker/blob/master/docs/USAGE.md

const schema = {
  type: "object",
  properties: {
    users: {
      type: "array",
      minItems: 11,
      maxItems: 20,
      items: {
        type: "object",
        properties: {
          id: {
            $ref: "#/definitions/positiveInt"
          },
          name: {
            type: "string",
            faker: "name.findName"
          },
          email: {
            type: "string",
            format: "email",
            faker: "internet.email"
          }
        },
        required: ["id", "name", "email"]
      }
    }
  },
  required: ["users"],
  definitions: {
    positiveInt: {
      type: "integer",
      minimum: 0,
      exclusiveMinimum: true
    }
  }
};

module.exports = schema;
