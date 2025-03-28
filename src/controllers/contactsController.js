// const contactsService = require('../services/contacts.js');

// const getAllContacts = async (req, res) => {
//   try {
//     const contacts = await contactsService.getAll(); // Виклик сервісу для отримання всіх контактів
//     res.status(200).json({
//       status: 200,
//       message: 'Successfully found contacts!',
//       data: contacts,
//     });
//   } catch (error) {
//     console.error('Error while getting contacts:', error.message);
//     res.status(500).json({
//       message: 'Internal Server Error',
//     });
//   }
// };

// const getContactById = async (req, res) => {
//   try {
//     const { contactId } = req.params; // Отримуємо ID контакту з параметрів маршруту
//     const contact = await contactsService.getById(contactId); // Виклик сервісу для отримання контакту за ID

//     if (!contact) {
//       return res.status(404).json({ message: 'Contact not found' }); // Якщо контакт не знайдено
//     }

//     res.status(200).json({
//       status: 200,
//       message: `Successfully found contact with id ${contactId}!`,
//       data: contact,
//     });
//   } catch (error) {
//     console.error('Error while getting contact:', error.message);
//     res.status(500).json({
//       message: 'Internal Server Error',
//     });
//   }
// };

// module.exports = {
//   getAllContacts,
//   getContactById,
// };


// // 67e34d43b614f5b8c5e20387

const contactsService = require('../services/contacts.js');

const getAllContacts = async (req, res) => {
  console.log('Запит на /contacts отримано'); // Логування запиту
  try {
    const contacts = await contactsService.getAll(); // Виклик сервісу для отримання всіх контактів
    console.log('Контакти з сервісу:', contacts); // Логування отриманих даних
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Помилка при отриманні контактів:', error.message); // Логування помилки
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getContactById = async (req, res) => {
  console.log(`Запит на /contacts/${req.params.contactId} отримано`); // Логування запиту з ID
  try {
    const { contactId } = req.params; // Отримуємо ID контакту з параметрів маршруту
    const contact = await contactsService.getById(contactId); // Виклик сервісу для отримання контакту за ID

    if (!contact) {
      console.log(`Контакт з id ${contactId} не знайдено`); // Логування відсутності контакту
      return res.status(404).json({ message: 'Contact not found' });
    }

    console.log('Контакт знайдено:', contact); // Логування знайденого контакту
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error('Помилка при отриманні контакту:', error.message); // Логування помилки
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
};
