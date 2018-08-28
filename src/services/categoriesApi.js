import { put, post, get, del } from './request';

const URL = 'https://rbt-budget.firebaseio.com/';
const CATEGORIES_URL = `${URL}/categories`;
// const EXPENSES_URL = `${CATEGORIES}/expenses`;

const getCategoryUrl = key => `${CATEGORIES_URL}/${key}.json`;
// const getExpenseUrl = key => `${EXPENSES_URL}/${key}.json`;

export const getCategories = () => {
  return get(`${CATEGORIES_URL}.json`)
    .then(response => {
      return response
        ? Object.keys(response).map(key => {
          const each = response[key];
          each.key = key;
          return each;
        })
        : [];
    });
};

export const addCategory = (category) => {
  const url = `${CATEGORIES_URL}.json`;
  return post(url, category)
    .then(res => {
      category.key = res.name;
      return category;
    });
};

export const updateCategory = category => {
  const url = getCategoryUrl(category.key);
  return put(url, category);
};

export const removeCategory = id => {
  const url = getCategoryUrl(id);
  return del(url);
};

export const addExpenseToCategory = (categoryKey, expense) => {
  const url = `${CATEGORIES_URL}/${categoryKey}/expenses.json`;
  return post(url, expense)
    .then(res => {
      console.log('***RES***', res);
      categoryKey = res.name;
      return expense;
    });
};

export const updateExpenseInCategory = (categoryKey, expense) => {
  const url = `${CATEGORIES_URL}/${categoryKey}/expenses/${expense.id}`;
  return put(url, expense)
    .then(res => {
      categoryKey = res.name;
      return expense;
    });
};

export const removeExpenseFromCategory = (categoryKey, expenseId) => {
  const url = `${CATEGORIES_URL}/${categoryKey}/expenses/${expenseId}`;
  return del(url, id)
    .then(res => {
      categoryKey = res.name;
      return id;
    });
};