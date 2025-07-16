// // src/controllers/contacts.js

// import createError from 'http-errors';
// import {
//   fetchContacts,
//   getById,
//   addContact as servicesAddContact,
//   updateContact as servicesUpdateContact,
//   deleteContact as servicesDeleteContact
// } from '../services/contacts.js';
// import cloudinary from '../services/cloudinary.js';

// const folder = process.env.CLOUDINARY_FOLDER || 'contacts';

// export const getAllContacts = async (req, res, next) => {
//   try {
//     const {
//       page = 1,
//       perPage = 10,
//       sortBy,
//       sortOrder,
//       isFavourite,
//       contactType
//     } = req.query;

//     const {
//       contacts,
//       totalItems,
//       page: pageNum,
//       perPage: perPageNum
//     } = await fetchContacts(req.user._id, {
//       page,
//       perPage,
//       sortBy,
//       sortOrder,
//       isFavourite,
//       contactType
//     });

//     res.status(200).json({
//       status: 200,
//       message: 'Contacts retrieved',
//       data: {
//         data: contacts,
//         page: pageNum,
//         perPage: perPageNum,
//         totalItems,
//         totalPages: Math.ceil(totalItems / perPageNum),
//         hasPreviousPage: pageNum > 1,
//         hasNextPage: pageNum < Math.ceil(totalItems / perPageNum)
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const getContactById = async (req, res, next) => {
//   try {
//     const contact = await getById(req.params.id, req.user._id);
//     if (!contact) {
//       throw createError(404, 'Contact not found');
//     }
//     res.status(200).json({
//       status: 200,
//       message: 'Contact found',
//       data: contact
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const addContact = async (req, res, next) => {
//   try {
//     const data = { ...req.body, userId: req.user._id };

//     if (req.file) {
//       // прев’ю файл у base64 і завантажуємо в Cloudinary
//       const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
//         'base64'
//       )}`;
//       const result = await cloudinary.uploader.upload(fileStr, { folder });
//       data.avatar = result.secure_url;
//     }

//     const newContact = await servicesAddContact(data);
//     res.status(201).json({
//       status: 201,
//       message: 'Contact created',
//       data: newContact
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const updateContactById = async (req, res, next) => {
//   try {
//     const update = { ...req.body };

//     if (req.file) {
//       const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
//         'base64'
//       )}`;
//       const result = await cloudinary.uploader.upload(fileStr, { folder });
//       update.avatar = result.secure_url;
//     }

//     const updated = await servicesUpdateContact(req.params.id, {
//       ...update,
//       userId: req.user._id
//     });
//     if (!updated) {
//       throw createError(404, 'Contact not found');
//     }

//     res.status(200).json({
//       status: 200,
//       message: 'Contact updated',
//       data: updated
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const deleteContactById = async (req, res, next) => {
//   try {
//     const deleted = await servicesDeleteContact(req.params.id, req.user._id);
//     if (!deleted) {
//       throw createError(404, 'Contact not found');
//     }
//     res.status(200).json({
//       status: 200,
//       message: 'Contact deleted'
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// src/controllers/contactsController.js

import createError from 'http-errors';
import path from 'path';
import fs from 'fs/promises';
import {
  fetchContacts,
  getById,
  addContact as servicesAddContact,
  updateContact as servicesUpdateContact,
  deleteContact as servicesDeleteContact
} from '../services/contacts.js';
import cloudinary from '../services/cloudinary.js';

const tmpDir = path.join(process.cwd(), 'tmp');
const folder = process.env.CLOUDINARY_FOLDER || 'contacts';

export const getAllContacts = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 10,
      sortBy,
      sortOrder,
      isFavourite,
      contactType
    } = req.query;

    const {
      contacts,
      totalItems,
      page: pageNum,
      perPage: perPageNum
    } = await fetchContacts(req.user._id, {
      page,
      perPage,
      sortBy,
      sortOrder,
      isFavourite,
      contactType
    });

    res.status(200).json({
      status: 200,
      message: 'Contacts retrieved',
      data: {
        data: contacts,
        page: pageNum,
        perPage: perPageNum,
        totalItems,
        totalPages: Math.ceil(totalItems / perPageNum),
        hasPreviousPage: pageNum > 1,
        hasNextPage: pageNum < Math.ceil(totalItems / perPageNum)
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await getById(req.params.id, req.user._id);
    if (!contact) throw createError(404, 'Contact not found');
    res.status(200).json({
      status: 200,
      message: 'Contact found',
      data: contact
    });
  } catch (err) {
    next(err);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const data = { ...req.body, userId: req.user._id };

    if (req.file) {
      const filePath = path.join(tmpDir, req.file.filename);

      // Завантажуємо файл за шляхом
      const result = await cloudinary.uploader.upload(filePath, { folder });
      data.photo = result.secure_url; 

      // Видаляємо тимчасовий файл
      await fs.unlink(filePath);
    }

    const newContact = await servicesAddContact(data);
    res.status(201).json({
      status: 201,
      message: 'Contact created',
      data: newContact
    });
  } catch (err) {
    next(err);
  }
};

export const updateContactById = async (req, res, next) => {
  try {
    const update = { ...req.body };

    if (req.file) {
      const filePath = path.join(tmpDir, req.file.filename);

      const result = await cloudinary.uploader.upload(filePath, { folder });
      update.avatar = result.secure_url;
      await fs.unlink(filePath);
    }

    const updated = await servicesUpdateContact(req.params.id, {
      ...update,
      userId: req.user._id
    });
    if (!updated) throw createError(404, 'Contact not found');

    res.status(200).json({
      status: 200,
      message: 'Contact updated',
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContactById = async (req, res, next) => {
  try {
    const deleted = await servicesDeleteContact(req.params.id, req.user._id);
    if (!deleted) throw createError(404, 'Contact not found');
    res.status(200).json({
      status: 200,
      message: 'Contact deleted'
    });
  } catch (err) {
    next(err);
  }
};
