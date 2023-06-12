const express = require('express')
const app  = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

morgan(':method :url :status :response-time ms - :res[content-length]')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons/:id',(request, response) => {
  const id = request.params.id

  const person = persons.find(person => person.id == id)

  if(!person) {
    response.status(400).end('not found')
  }
  else {
    response.json(person)
  }
})

app.get('/info',(request, response) => {

  const today = new Date()

  
  response.send(`<h1>Phonebook has info for two people</h1><br/><h2>${today}</h2>`)
 
})


app.delete('/api/persons/:id',(request, response) => {
  const id = request.params.id
  
  persons = persons.filter(person => person.id !== id)

  response.status(200).end('note deleted')

})

const generateId = () => {
  const id = Math.floor(Math.random() * 1000)
  
  const ids = persons.find(person => person.id == id)

  if(ids) generateId()

  return id
 
}

app.post('/api/persons',(request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
    response.status(400).end('Body cant be empty')
  }
  else {

    const person = {
      id: generateId(),
      name: body.name,
      number: body.number
    }

    persons.push(person)
  
    response.json(persons)
  }

})

PORT = 3001
app.listen(PORT)
console.log(`server running on ${PORT}`) 
