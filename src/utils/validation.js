import Joi from "joi";

export let AdminValidationSchema=Joi.object({
    fullname:Joi.string().min(4).required(),
    password:Joi.string().min(8).max(30).required()
    ,phone:Joi.string().min(13).max(13).required()
    ,role:Joi.string().required()
}).unknown(true)


export let MentorsValidationSchema=Joi.object({
    fullname: Joi.string().min(4).required(),
  phone: Joi.string().min(13).max(13).required(),
  password: Joi.string().min(8).max(30).required(),
  role: Joi.string().optional(),
  status: Joi.string().optional(),
  experience: Joi.string().optional().allow("", null),
  profession: Joi.string().optional().allow("", null),
  website: Joi.string().optional().allow("", null),
  bio: Joi.string().optional().allow("", null),
  social_facebook: Joi.string().optional().allow("", null),
  social_telegram: Joi.string().optional().allow("", null),
  social_linkedin: Joi.string().optional().allow("", null),
  social_instagram: Joi.string().optional().allow("", null),
  social_github: Joi.string().optional().allow("", null)
}).unknown(true)

export let Update_mentors_schema=Joi.object({
    fullname: Joi.string().min(4).optional(),
  phone: Joi.string().min(13).max(13).optional(),
  password: Joi.string().min(8).max(30).optional(),
  role: Joi.string().optional(),
  status: Joi.string().optional(),
  experience: Joi.string().optional().allow("", null),
  profession: Joi.string().optional().allow("", null),
  website: Joi.string().optional().allow("", null),
  bio: Joi.string().optional().allow("", null),
  social_facebook: Joi.string().optional().allow("", null),
  social_telegram: Joi.string().optional().allow("", null),
  social_linkedin: Joi.string().optional().allow("", null),
  social_instagram: Joi.string().optional().allow("", null),
  social_github: Joi.string().optional().allow("", null)
}).unknown(true)


export let creatAsistSchema=Joi.object({
  fullname:Joi.string().min(4).max(30).required(),
  phone:Joi.string().min(13).max(13).optional(),
  password: Joi.string().min(8).max(30).optional()
}).unknown(true)