import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterPosts } from "../redux/actions";

export default function FilterMenu() {
  const reviews = useSelector(state => state.postReducer.posts);
  const dispatch = useDispatch();
  const [ ratings, setRatings ] = useState([]);
  const [ platforms, setPlatforms ] = useState([]);

  const compareFn = (a, b) => b - a;

  //clean repeats
  useEffect(() => {
    const ratingsArr = [...new Set(reviews.map(item => item.rating))].sort(compareFn);
    const platformsArr = [...new Set(reviews.map(item => item.platform))].sort();
    setRatings(ratingsArr);
    setPlatforms(platformsArr);
  }, [reviews]);

  const handleChange = (e) => {
    dispatch(filterPosts({filter: e.target.value, reviews}));
  }

  return (
    <aside className="filters__menu">
      <h2>Фильтры</h2>
      <div className="filters__platform">
        <h3>Платформы</h3>
        <form className="platforms__form" onChange={handleChange}>
          {platforms.map((item) => <div className="platform">
            <input id={item} type="checkbox" value={item}/>
            <label htmlFor={item}>{item}</label>
          </div>)}
        </form>
      </div>
      {/* <div>{ratings.map((item) => <p>{item}</p>)}</div> */}
    </aside>
  )
}
