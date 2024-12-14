import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getPosts, filterPosts } from "./redux/actions"
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
      {/* <FilterMenu/> */}
      <Table/>
    </>
  )
}

export default App
