import Cors from 'cors'

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: 'http://localhost:8000', // Allow only your delivery agent app
  credentials: true,
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export { cors, runMiddleware }