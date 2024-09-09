import React, { SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelectors } from "../type/indexStore";
import { TPosts } from "../type/posts";
import { findMaxPostId } from "../utils";
import { fetchGetPosts, fetchPatchPost, fetchPostNewPost } from "../store/api-actions";
import { selectorsMain } from "../store/slice/main";
import { useForm } from "react-hook-form";
import { TForm } from "../type/form-post";
import { AppRoute, RequestStatus, scrollLock, TextErrorForm, TextErrorServer, TypeForm, ValidationForm } from "../const";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectorsPost } from "../store/slice/post";

const body = document.querySelector('body') as HTMLBodyElement ;

type TFormCreatePost = {
  typeForm: string;
}

export default function FormCreatePost({ typeForm }: TFormCreatePost) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const postStatus = useAppSelectors(selectorsPost.statusPost);
  const posts = useAppSelectors(selectorsMain.posts);
  let maxId = 0;
  const { register, handleSubmit, formState: { errors } } = useForm<TForm>();
  const [isModal, setIsModal] = useState(false);
  const [isDisabledForm, setIsDisabledForm] = useState(false);
  const [form, setForm] = useState<TPosts>({
    id: '0',
    title: '',
    description: '',
    views: 0,
  })

  useEffect(() => {
    if (postStatus === RequestStatus.LOADING) {
      setIsDisabledForm(true);
    }

    if (postStatus === RequestStatus.FAILED) {
      setIsDisabledForm(false);
    }

  }, [postStatus])

  useEffect(() => {
    if (isModal) {
      body.classList.add(scrollLock);
    } else {
      body.classList.remove(scrollLock);
    }
  }, [isModal])

  useEffect(() => {
    maxId = findMaxPostId(posts) + 1;
    setForm({...form, id: maxId.toString()})
  }, [posts, isModal])

  function onSendPostSubmit() {
    switch (typeForm) {
      case TypeForm.CREATE:
        dispatch(fetchPostNewPost(form))
        .unwrap()
        .then(() => {
          setIsModal(true);
        })
        .catch(() => {
          toast.error(TextErrorServer.SEND_FORM);
        })
      break;
      case TypeForm.EDIT:
        const actualId = +form.id - 1;
        dispatch(fetchPatchPost({...form, id: actualId.toString()}))
        .unwrap()
        .then(() => {
          setIsModal(true);
        })
        .catch(() => {
          toast.error(TextErrorServer.SEND_FORM);
        })
      break;
    }
  }

  function onCloseModalClick() {
    navigate(AppRoute.MAIN)
  }

  function onInputTitleChange(evt: SyntheticEvent<HTMLInputElement>) {
    setForm({...form, title: evt.currentTarget.value});
  }

  function onInputDescriptionChange(evt: SyntheticEvent<HTMLTextAreaElement>) {
    setForm({...form, description: evt.currentTarget.value});
  }

  return (
    <>
    <form className="form-post" onSubmit={(event) => {
      void handleSubmit(onSendPostSubmit)(event)
    }}>
      <div className="form-post__content">
        <div className="form-post__row">
          <label htmlFor="title" className="form-post__label">Заголовок статьи</label>
          <input type="text" value={form.title} id="title" required
          {...register('title', {
            minLength: {
              value: ValidationForm.TITLE.min,
              message: TextErrorForm.TITLE.min
            },
            maxLength: {
              value: ValidationForm.TITLE.max,
              message: TextErrorForm.TITLE.max
            },
            disabled: isDisabledForm,
          })} className="form-post__input" onChange={onInputTitleChange}/>
          {errors.description &&
            <span style={{color: 'red'}}>{errors.description.message}</span>
          }
        </div>
        <div className="form-post__row">
          <label htmlFor="description" className="form-post__label">Содержимое статьи</label>
          <textarea id="description" value={form.description} required
          {...register('description', {
            minLength: {
              value: ValidationForm.DESCRIPTION.min,
              message: TextErrorForm.DESCRIPTION.min
            },
            maxLength: {
              value: ValidationForm.DESCRIPTION.max,
              message: TextErrorForm.DESCRIPTION.max
            },
            disabled: isDisabledForm,
          })} className="form-post__input--big" onChange={onInputDescriptionChange}/>
          {errors.title &&
            <span style={{color: 'red'}}>{errors.title.message}</span>
          }
        </div>
        <button className="form-post__button" disabled={isDisabledForm}>
          {typeForm === TypeForm.CREATE 
              ?
              'Создать пост'
              :
              'Изменить пост'
          }
        </button>
      </div>
    </form>
    {isModal &&    
      <div className="modal modal--active">
        <div className="modal__wrapper">
          <div className="modal__content">
            <p className="modal__text">
              {typeForm === TypeForm.CREATE 
              ?
              'Пост создан'
              :
              'Пост изменён'
              }
              
            </p>
            <Link to={AppRoute.MAIN} className="modal__link">
              Вернутся на главная страницу
            </Link>
            <button className="modal__close" onClick={onCloseModalClick}>
              <p className="visually-hidden">Закрыть модальное окно</p>
            </button>
          </div>
        </div>
      </div>
    }
    </>
  )
}

