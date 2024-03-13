import styles from "./blogForm.module.css";
import { useState, useRef, useEffect, useReducer} from "react";

function blogReducer(state,action){
    switch(action.type){
        case "ADD_BLOG":
            return [action.payload,...state]
        case "REMOVE_BLOG":
            return state.filter((blog,index)=>index!==action.payload)
        default:
            return [];
    }
}

function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
//   const [blogs, setBlogs] = useState([]);
const [blogs, dispatch] = useReducer(blogReducer,[]);
  const titleRef= useRef(null);

  useEffect(()=>{
    titleRef.current.focus();
  },[])

  useEffect(()=>{
    if(blogs.length && blogs[0].title){
        document.title= blogs[0].title;
    }else{
        document.title="Write a Blog"
    }
  },[blogs])
  let handleSubmit = (e) => {
    e.preventDefault();

    // setBlogs([{ ...formData }, ...blogs]);
    dispatch({type:"ADD_BLOG",payload:{...formData}})
    setFormData({
      title: "",
      content: "",
    });
    titleRef.current.focus();
   
  };

  //Remove blog function
  let onRemove=(i)=>{
    // setBlogs(blogs.filter((blog,index)=>index!==i))
    dispatch({type:"REMOVE_BLOG",payload:i})
  }

  return (
    <>
      <h1 className={styles.title_container}>Write a Blog</h1>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <label className={styles.form_label}>Title</label>
        <input
          className={styles.form_input}
          type="text"
          placeholder="Enter Title"
          ref={titleRef}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <hr></hr>
        <label className={styles.form_label}>Content</label>

        <textarea
          className={styles.form_textarea}
          rows={3}
          cols={30}
          placeholder="Content of the Blog goes here.."
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value }) 
          }required 
        />
        <hr></hr>
        <button className={styles.btn}>Submit</button>
      </form>

      <hr></hr>

      <h2 className={styles.blogTitle}>Blogs</h2>
      {blogs.map((blog, i) => (
        <div className={styles.blogContainer} key={i}>
         <div>
         <h3>{blog.title}</h3>
          <p>{blog.content}</p>
         </div>
          <div className={styles.imageContainer}>
            <img
              className={styles.remove} onClick={()=> onRemove(i)}
              src="https://cdn-icons-png.flaticon.com/128/1450/1450571.png"
              alt="remove"
            ></img>
          </div>
        </div>
      ))}
    </>
  );
}

export default BlogForm;
