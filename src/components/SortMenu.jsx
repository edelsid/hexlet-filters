import { useSelector } from "react-redux";

export default function SortMenu() {
  const reviews = useSelector(state => state.postReducer.posts);

  return (
    <div>SortMenu</div>
  )
}
