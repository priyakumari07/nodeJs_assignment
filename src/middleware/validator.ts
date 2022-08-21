

const validateUser = (schema: { validate: (arg0: any) => Promise<any>; }) => async (req:any, res:any, next:any) => {
  const body = req.body;

  await schema
    .validate(body)
    .then(() => {
      next(); 
    })
    .catch((err:any) => {
      res.status(400).json({ Error: "Bad Request" });
    });
};

module.exports = validateUser;