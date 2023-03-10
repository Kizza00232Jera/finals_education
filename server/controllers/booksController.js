const Book = require('../models/Book')
const Employee = require('../models/Employee')
const asyncHandler = require('express-async-handler')

// @desc Get all books 
// @route GET /books
// @access Private

const getAllBooks = asyncHandler(async (req, res) => {
    //get all books from mongodb
    const books = await Book.find().lean()

    //if no books
    if (!books?.length) {
        return res.status(400).json({ message: 'no books found' })
    }

    // Add employee who created it to each book before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    // const booksWithEmployee = await Promise.all(books.map(async (book) => {
    //     const employeeEmail = await Employee.findById(book.employeeEmail).lean().exec()
    //     return { ...book, employeeEmail: employeeEmail.employeeEmail }
    // }))

    res.json(books)
})

// @desc Create new book
// @route POST /books
// @access Private
const createNewBook = asyncHandler(async (req, res) => {
    const { employeeEmail, bookTitle, bookAuthor, bookPublicationYear, bookShop, bookWebLink, bookDescription } = req.body

    // Confirm data
    if (!employeeEmail || !bookTitle || !bookAuthor || !bookPublicationYear || !bookShop || !bookWebLink || !bookDescription ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Book.findOne({ bookTitle }).collation({ locale:'en', strength: 2}).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate book title' })
    }

    // Create and store the new employee 
    const book = await Book.create({ employeeEmail, bookTitle, bookAuthor, bookPublicationYear, bookShop, bookWebLink, bookDescription })

    if (book) { // Created 
        return res.status(201).json({ message: 'New book created' })
    } else {
        return res.status(400).json({ message: 'Invalid book data received' })
    }

})


// @desc Update a book
// @route PATCH /books
// @access Private
const updateBook = asyncHandler(async (req, res) => {
    const { id, employeeEmail, bookTitle, bookAuthor, bookPublicationYear, bookShop, bookWebLink, bookDescription  } = req.body

    // Confirm data
    if (!id || !employeeEmail || !bookTitle || !bookAuthor || !bookPublicationYear || !bookShop || !bookWebLink || !bookDescription ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm book exists to update
    const book = await Book.findById(id).exec()

    if (!book) {
        return res.status(400).json({ message: 'Book not found' })
    }

    // Check for duplicate title
    const duplicate = await Book.findOne({ bookTitle }).collation({ locale:'en', strength: 2}).lean().exec()

    // Allow renaming of the original book 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate book title' })
    }

    book.employeeEmail = employeeEmail
    book.bookTitle = bookTitle
    book.bookAuthor = bookAuthor
    book.bookPublicationYear = bookPublicationYear
    book.bookPrice = bookPrice
    book.bookShop = bookShop
    book.bookWebLink = bookWebLink
    book.bookDescription = bookDescription

    const updatedBook = await book.save()

    res.json(`'${updatedBook.bookTitle}' updated`)
})

// @desc Delete a book
// @route DELETE /books
// @access Private
const deleteBook = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Book ID required' })
    }

    // Confirm book exists to delete 
    const book = await Book.findById(id).exec()

    if (!book) {
        return res.status(400).json({ message: 'Book not found' })
    }

    const result = await book.deleteOne()

    const reply = `Book '${result.bookTitle}' with ID ${result._id} deleted`

    res.json(reply)
})


module.exports = {
    getAllBooks,
    createNewBook,
    updateBook,
    deleteBook
}