import { useState, useEffect } from "react"
import { useSelector } from "react-redux";

export default function FilterMenu() {
  const reviews = useSelector(state => state.postReducer.posts);
  const [ ratings, setRatings ] = useState([]);
  const [ platforms, setPlatforms ] = useState([]);

  const compareFn = (a, b) => b - a;

  //clean repeats
  useEffect(() => {
    const ratingsArr = [...new Set(reviews.map(item => item.rating))].sort(compareFn);
    const platformsArr = [...new Set(reviews.map(item => item.platform))].sort();
    setRatings(ratingsArr);
    setPlatforms(platformsArr);
  }, [reviews])

  return (
    <div>
      <div>{ratings.map((item) => <p>{item}</p>)}</div>
      <div>{platforms.map((item) => <p>{item}</p>)}</div>
    </div>
  )
}
