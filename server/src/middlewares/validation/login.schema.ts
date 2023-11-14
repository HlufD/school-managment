import Joi from "joi";

const schema = {
  user: Joi.object({
    username: Joi.string().max(100).required().email(),
    password: Joi.string().max(1000).required().min(3),
  }),
  userTobeAdded: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    picture: Joi.string().required(),
    Role: Joi.string().required(),
  }),
};

export default schema;
