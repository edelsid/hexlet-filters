import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getPosts, sortPosts } from "./redux/actions"
import Table from "./components/Table"
import FilterMenu from "./components/FilterMenu"
import SortMenu from "./components/SortMenu"
import './App.css'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [])

  return (
    <>
      <h1>Отзывы о наших сервисах</h1>
      <div className="reviews__wrapper">
        <aside className="sidemenu">
          <FilterMenu/>
          <SortMenu/>
        </aside>
        <Table/>
      </div>
    </>
  )
}

export default App
