import { useSelector } from "react-redux"

export default function Table() {
  const reviews = useSelector(state => state.postReducer.posts);

  return (
    <table className="reviews__table">
      <thead>
        <td>Платформа</td>
        <td>Дата</td>
        <td>Оценка</td>
        <td>Сообщение</td>
      </thead>
      <tbody>
        {reviews.map((item) => <tr className="review">
          <td className="review__platform">{item.platform}</td>
          <td className="review__date">{new Date(item.date).toLocaleString('ru-RU', {dateStyle: 'medium', timeStyle: 'short'})}</td>
          <td className="review__rating">{item.rating}</td>
          <td className="review__text">{item.text}</td>
        </tr>)}
      </tbody>
    </table>
  )
}
