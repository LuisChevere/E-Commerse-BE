const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

//begins the  get routes to categories.
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findALL({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

//get route by Primary Key.
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with said id!'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post route that allows you to post a new product in category.
router.post('/', async (req, res) => {
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

//router puts the updated data into category.
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updateCategory) {
      res.status(404).json({ message: 'No category with said id!'})
      return;
    }
    res.status(200).json('Category update successful!');
  } catch (err) {
    res.status(500).json 
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy(
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category with said id!'})
      return;
    }
    res.status(200).json('Category deletion successful!');
  } catch (err) {
    res.status(500).json 
  }
  
});

module.exports = router;
