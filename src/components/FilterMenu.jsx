import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterPosts } from "../redux/actions";

export default function FilterMenu() {
  const reviews = useSelector(state => state.postReducer.posts);
  const filters = useSelector(state => state.postReducer.filters);
  const sorting = useSelector(state => state.postReducer.sorting);
  const dispatch = useDispatch();
  const [ platforms, setPlatforms ] = useState([]);
  const [ ratings, setRatings ] = useState({
    min: 0,
    max: 0,
  })
  const [ formRange, setFormRange ] = useState({
    min: 0,
    max: 0,
  });
  const [ percentRange, setPercentRange ] = useState({
    left: 0,
    right: 100,
  });

  const sortGrades = (a, b) => a - b;

  useEffect(() => {
    const ratingsArr = [...new Set(reviews.map(item => item.rating))].sort(sortGrades);
    const platformsArr = [...new Set(reviews.map(item => item.platform))].sort();
    setRatings({
      min: ratingsArr[0] | 0,
      max: ratingsArr[ratingsArr.length - 1] | 0,
    })
    setFormRange({
      min: ratingsArr[0] | 0,
      max: ratingsArr[ratingsArr.length - 1] | 0,
    });
    setPlatforms(platformsArr);
  }, [reviews]);

  const handlePlatformChange = (e) => {
    dispatch(filterPosts({filter: e.target.value, reviews, formRange, sorting}));
  };

  const handleGrade = (e) => {
    const { id, value } = e.target;
    const numValue = parseInt(value);
    const percent = ((numValue - ratings.min) / (ratings.max - ratings.min)) * 100;
    if (id === "input_left" && numValue > formRange.max) return;
    if (id === "input_right" && numValue < formRange.min) return;
    setFormRange((prevForm) => ({
      ...prevForm,
      min: id === 'input_left' ? numValue : prevForm.min,
      max: id === 'input_right' ? numValue : prevForm.max,
    }));
    setPercentRange((prevForm) => ({
      ...prevForm,
      left: id === 'input_left' ? percent : prevForm.left,
      right: id === 'input_right' ? percent : prevForm.right,
    }));
  }

  useEffect(() => {
    dispatch(filterPosts({filter: null, reviews, formRange, sorting}));
  }, [formRange]);

  return (
    <div className="filters__menu">
      <h2>Фильтры</h2>
      <div className="menu__item platforms">
        <h3>Платформы</h3>
        <form className="platforms__form" onChange={handlePlatformChange}>
          <ul>
            {platforms.map((item) => 
            <li className="platform" key={Math.random()}>
              <input id={item} type="checkbox" value={item} defaultChecked={filters.includes(item)}/>
              <label htmlFor={item}>{item}</label>
            </li>)}
          </ul>
        </form>
      </div>
      <div className="menu__item grades">
        <h3>Оценки</h3>
        <div className="grades__label">
          <p>от</p>
          <p>до</p>
        </div>
        <div className="slider__multi">
          <input 
            type="range" 
            id="input_left"
            min={ratings.min} 
            max={ratings.max} 
            value={formRange.min}
            step={1}
            onChange={handleGrade}>
          </input>
          <input 
            type="range" 
            id="input_right"
            min={ratings.min} 
            max={ratings.max} 
            value={formRange.max}
            step={1}
            onChange={handleGrade}>
          </input>

          <div className="slider__multipath">
            <div className="slider__track"></div>
            <div className="slider__range" style={{left: `${percentRange.left}%`, right: `${100 - percentRange.right}%`}}></div>
            <div className="thumb left" style={{left: `${percentRange.left}%`}}></div>
            <div className="thumb right" style={{right: `${100 - percentRange.right}%`}}></div>
          </div>
        </div>
        <div className="grades__label">
          <p>{formRange.min}</p>
          <p>{formRange.max}</p>
        </div>
      </div>
    </div>
  )
}
