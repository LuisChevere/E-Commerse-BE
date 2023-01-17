const router = require('express').Router();
const { where } = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = Tag.findByPK(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with said id!' });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).json(newTagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    );
if (!updateTagData) {
  res.status(404).json({ message: 'No tag with said id!' })
  return;
}
res.status(200).json('Tag update successful!');
  } catch (err) {
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy(
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag with said id!' })
      return;
    }
    res.status(200).json('Tag deletion successful');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
