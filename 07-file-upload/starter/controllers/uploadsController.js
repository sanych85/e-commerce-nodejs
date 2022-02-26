const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const uploadProductImage = async (req, res) => {
 
  if (!req.files) {
    throw new CustomError.BadRequestError('No file uploaded');
  }
  const productImage = req.files.image;
  //проверяем изображение ли загружено либо какой-то другой тип файла
  if(!productImage.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Plase upload image')
  }
  const maxSize =1024*1024
  if(productImage.size > maxSize) {
      throw new CustomError.BadRequestError(`please upload image less then ${maxSize}`)
  }
  const imagePath = path.join(
    __dirname,
    `../public/uploads/${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = {
  uploadProductImage,
};
