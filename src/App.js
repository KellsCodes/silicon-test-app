import './App.css';
import Posts from "./components/posts/posts";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Post from "./components/posts/post";
import AddPosts from './components/addposts/AddPosts';
import Navbar from './components/Nav/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/add" component={AddPosts} />
          <Route path="/posts/:id" component={Post} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;


//ibb;Q3}ss}khDwl