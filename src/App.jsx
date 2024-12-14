import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getPosts } from "./redux/actions"
import Table from "./components/Table"
import FilterMenu from "./components/FilterMenu"
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
        <FilterMenu/>
        <Table/>
      </div>
    </>
  )
}

export default App
