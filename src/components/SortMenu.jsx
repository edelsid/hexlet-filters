import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { sortPosts } from "../redux/actions";

export default function SortMenu() {
  const reviews = useSelector(state => state.postReducer.posts);
  const formRange = useSelector(state => state.postReducer.formRange);
  const reorganized = useSelector(state => state.postReducer.reorganizedPosts);
  const dispatch = useDispatch();
  const [ sorting, setSorting ] = useState("high");

  const handleChange = (e) => {
    const { value } = e.target;
    setSorting(value);
  }

  useEffect(() => {
    const revievsArr = reorganized.length > 0 ? reorganized : reviews;
    dispatch(sortPosts({reviews: revievsArr, formRange, sorting}));
  }, [sorting]);

  return (
    <div className="sorting__menu">
      <h2>Сортировка</h2>
      <div className="menu__item dates">
        <form className="date__form" onChange={handleChange}>
          <h3>Оценки</h3>
          <ul>
            <li className="grade">
              <input 
                id='high' 
                type="radio" 
                value="high"
                name="sorting"
                defaultChecked={true}
              />
              <label htmlFor='high'>Сначала высокие</label>
            </li>
            <li className="grade">
              <input 
                id='low' 
                type="radio" 
                value="low"
                name="sorting"
              />
              <label htmlFor='low'>Сначала низкие</label>
            </li>
          </ul>
          <h3>Платформы</h3>
          <ul>
            <li className="date">
              <input 
                id="new" 
                type="radio" 
                value="new" 
                name="sorting"
              />
              <label htmlFor='new'>Сначала новые</label>
            </li>
            <li className="date">
              <input 
                id="old" 
                type="radio" 
                value="old" 
                name="sorting"
              />
              <label htmlFor='old'>Сначала старые</label>
            </li>
          </ul>
        </form>
      </div>
    </div>
  )
}
