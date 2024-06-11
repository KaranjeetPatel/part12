const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/info', (req, res) => {
  Person.find({}).then(people => {
    res.send(
      `<div>
        <p>There are ${people.length} records in the phonebook</p>
        <p> ${new Date().toString()}</p>
      </div>`
    )
    console.log(`Server sends size as  ${people.length}`)
  })
})

personsRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      console.log('updatedPerson', updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

module.exports = personsRouter
