import { useSelector } from "react-redux"
import { useState, useEffect } from "react";

export default function Table() {
  const reviews = useSelector(state => state.postReducer.posts);
  const reorganized = useSelector(state => state.postReducer.reorganizedPosts);
  const [ data, setData ] = useState([]);

  useEffect(() => {
    if (reorganized && reorganized.length > 0) {
      setData(reorganized);
    }
  }, [reorganized]);

  useEffect(() => {
    setData(reviews);
  }, [reviews]);

  return (
    data.length > 0 ? 
    <table className="reviews__table">
      <thead>
        <tr>
          <td>Платформа</td>
          <td>Оценка</td>
          <td>Дата</td>
          <td>Сообщение</td>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => <tr className="review" key={item.id}>
          <td className="review__platform">{item.platform}</td>
          <td className="review__rating">{item.rating}</td>
          <td className="review__date">{new Date(item.date).toLocaleString('ru-RU', {dateStyle: 'medium', timeStyle: 'short'})}</td>
          <td className="review__text">{item.text}</td>
        </tr>)}
      </tbody>
    </table> : 
    <p>Подождите, отзывы загружаются</p>
  )
}
