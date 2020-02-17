const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://blooming-lowlands-48211.herokuapp.com'
    : 'http://localhost:3000'

export default baseUrl;