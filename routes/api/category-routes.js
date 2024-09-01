const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categories) {
      res.status(404).json({ message: 'No catergory found by that id.' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // new category
  try {
    const newCat = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(201).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updateCat) {
      const updatedCategory = await Category.findByPk(req.params.id);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: 'No category found by that id.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCat = await Category.destroy({
      where: { id: req.params.id },
    });

    if (deleteCat) {
      const deletedCat = await Category.findByPk(req.params.id);
      res.status(200).json(deletedCat);
    } else {
      res.status(404).json({ message: 'Unable to delete category with that id.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
