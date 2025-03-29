const contactsService = require('../services/contacts');
const getEnvVar = require('../utils/getEnvVar');

const getAllContacts = async (req, res) => {
  console.log('Запит на /contacts отримано');
  try {
    const contacts = await contactsService.getAll();
    console.log('Контакти з сервісу:', contacts);
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Помилка при отриманні контактів:', error.message);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getContactById = async (req, res) => {
  console.log(`Запит на /contacts/${req.params.contactId} отримано`);
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getById(contactId);

    if (!contact) {
      console.log(`Контакт з id ${contactId} не знайдено`);
      return res.status(404).json({ message: 'Contact not found' });
    }

    console.log('Контакт знайдено:', contact);
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error('Помилка при отриманні контакту:', error.message);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
};
