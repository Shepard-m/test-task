export const AppRoute = {
  MAIN: '/',
  POST: '/post',
  CREATE_POST: '/CREATE',
  NOT_FOUND_PAGE: '*',
};

export const ApiRoute = {
  ARTICLE: 'posts',
  COMMENTS: 'comments',
};

export const RequestStatus = {
  SUCCESS: 'success',
  LOADING: 'loading',
  FAILED: 'failed',
  NONE: 'none'
};

export const ValidationForm = {
  TITLE: {
    min: 1,
    max: 20,
  },
  DESCRIPTION: {
    min: 1,
    max: 500,
  },
};

export const TextErrorForm = {
  TITLE: {
    min: 'минимальная кол-во символов 1',
    max: 'минимальная кол-во символов 20',
  },
  DESCRIPTION: {
    min: 'минимальная кол-во символов 1',
    max: 'минимальная кол-во символов 500',
  },
};

export const TextErrorServer = {
  SEND_FORM: 'произошла ошибка отправки данных',
};

export const scrollLock = 'scroll-lock';

export const TypeForm = {
  CREATE: 'create',
  EDIT: 'edit',
};

export const countOfPostsPage = 5;