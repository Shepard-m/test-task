import React, { useEffect, useState } from "react";
import Container from "../components/container";
import { fetchDeleteComment, fetchDeletePost, fetchGetPost, fetchGetPosts, fetchGetReview } from "../store/api-actions";
import { useAppDispatch, useAppSelectors } from "../type/indexStore";
import { useNavigate, useParams } from "react-router-dom";
import { selectorsPost } from "../store/slice/post";
import ReviewList from "../components/review-list";
import { selectorsReview } from "../store/slice/review";
import { AppRoute, TypeForm } from "../const";
import FormCreatePost from "../components/form-create-post";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = useAppSelectors(selectorsPost.post);
  const statusPost = useAppSelectors(selectorsPost.statusPost);
  const reviews = useAppSelectors(selectorsReview.review);
  const dispatch = useAppDispatch();
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchGetPost(id));
      dispatch(fetchGetReview(id));
    }
  }, [])

  useEffect(() => {
    setIsDisabled(true);
  }, [statusPost])

  function onOpenModalDeleteClick() {
    setIsModalDelete(true);
  }
  function onOpenModalEditClick() {
    setIsModalEdit(true);
  }

  function onCloseModalDeleteClick() {
    setIsModalDelete(false);
    setIsModalEdit(false);
  }

  function onDeletePostClick() {
    dispatch(fetchDeletePost(id as string))
      .unwrap()
      .then(() => {
        navigate(AppRoute.MAIN);
      })
    reviews?.map((e) => {
      dispatch(fetchDeleteComment(e.id));
    })
  }

  return (
    <Container>
      <>      
        <div className="post">
          <div className="post__interface">
            <button className="post__button post__button--edit" onClick={onOpenModalEditClick}>
              <p className="visually-hidden">
                Отредактировать статью
              </p>
            </button>
            <button className="post__button post__button--delete" onClick={onOpenModalDeleteClick}>
              <p className="visually-hidden">
                Удалить статью
              </p>
            </button>
          </div>
          <h2 className="post__title">
            {post?.title}
          </h2>
          <span className="post__views">Кол-во просмотров: {post?.views}</span>
          <p className="post__description">
            {post?.description}
          </p>
        </div>
        {reviews !== null && reviews?.length !== 0
        ?         
        <div className="reviews">
          <h2 className="reviews__title">
            Отзывы
          </h2>
          <ReviewList reviews={reviews}/>
        </div>
        :
        ''
        }
        {isModalDelete &&        
        <div className="modal modal--active">
          <div className="modal__wrapper">
            <div className="modal__content">
              <p className="modal__text">Вы точно хотите удалить статью</p>
              <p className="modal__link" onClick={onDeletePostClick}>дa</p>
              <button className="modal__close" onClick={onCloseModalDeleteClick} disabled={isDisabled}>
                <p className="visually-hidden">Закрыть модальное окно</p>
              </button>
            </div>
          </div>
        </div>
        }
        {isModalEdit && 
          <div className="modal modal--active">
            <div className="modal__wrapper modal__wrapper--edit">
              <div className="modal__content">
                <p className="modal__text">Редактирование</p>
                <FormCreatePost typeForm={TypeForm.EDIT}/>
                <button className="modal__close" onClick={onCloseModalDeleteClick}>
                  <p className="visually-hidden">Закрыть модальное окно</p>
                </button>
              </div>
            </div>
          </div>
        }
      </>
    </Container>
  )
}