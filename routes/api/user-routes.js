const router = require("express").Router();
const { User, Thought } = require("../../models");

// `/api/users` end point 
// GET all users

router.get('/', (req, res) => {
    // find all users
  
    User.findAll({
      // be sure to include user thoughts.
      include: [
        {model: Thought}
      ]
  
    }).then((users) => {
      res.json(users);
    })
  
  });



// GET a single user by its _id and populated thought and friend data
router.get('/:id', (req, res) => {
        
    User.findByPk(req.params.id, {
      include: [
        {model: Thought}
      ]
  
    }).then((user) => res.json (user))
    
  });


// POST a new user: example data --- {  "username": "lernantino"  "email": "lernantino@gmail.com" }
router.post('/', (req, res) => {
  
    User.create({
      username: req.body.username,
      email: req.body.email,
    }).then((newUser) => {
      res.json(newUser);
    })
  });
  

// PUT to update a user by its _id
router.put('/:id', (req, res) => {
    
    User.updateOne({
      username: req.body.username
    }, {
      where: {
        _id:req.params._id
      }
    }).then((updated) => {
      res.json(updated);
    })
  });

// DELETE to remove user by its _id
router.delete('/:id', (req, res) => {
   
    User.destroy({
      where: {
        _id: req.params._id,
      }
    }).then((deleted) => {
      res.json(deleted);
    })
  });
  

// BONUS: Remove a user's associated thoughts when deleted. 


module.exports = router;
