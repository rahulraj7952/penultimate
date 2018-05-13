import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = '';

const encode = encodeURIComponent;
const responseBody = res =>{ 
	console.log("res",res.body);
	return res.body;}

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}
let bookId=null;
const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/users'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/users', { user })
  
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Books ={
	all: page =>
    requests.get(`/books?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/books?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/books?tag=${encode(tag)}&${limit(10, page)}`),
  byGenre: (genre, page) =>
	requests.get(`/books?genre=${encode(genre)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/books/${slug}`),
  favorite: slug =>
    requests.post(`/books/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/books?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/books/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/books/${slug}`),
  unfavorite: slug =>
    requests.del(`/books/${slug}/favorite`),
  update: book =>
    requests.put(`/books/${book.slug}`, { book: omitSlug(book) }),
  create: book =>{
    requests.post(`/books`, {book})}
	}
const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  byGenre: (genre, page) =>
	requests.get(`/articles?genre=${encode(genre)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: (article,id) =>
    requests.put(`/articles/${id}`, { article: omitSlug(article) }),
  create: (article,slug)=>{
    requests.post(`/articles/${slug}`, { article})}
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  Books,
  Comments,
  Profile,
  Tags,
  setToken: _token => { token = _token; }
};
