import React, { useRef } from "react";
import "./Home.css"

const Home = () => {
  const inputTitle = useRef<HTMLInputElement>(null)
  const inputDescription = useRef<HTMLInputElement>(null)
  const inputName = useRef<HTMLInputElement>(null)

  type FormDataType = {
    title: string,
    name: string
    description: string,
  }

  const formData: FormDataType = { title: "", name: "", description: "" }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.title = inputTitle.current?.value || ""
    formData.name = inputName.current?.value || ""
    formData.description = inputDescription?.current?.value || ""
    console.log(formData)
    //Form submission happens here
  }
  return (
      <div className="home__container">

        <div className="home__title">create your No-Hasba</div>

        <form className="home__form" onSubmit={onSubmitHandler}>

          <div className="home__form--group">
            <input type="text" ref={inputTitle} required />
              <span className="home__form--highlight"></span>
              <span className="home__form--bar"></span>
              <label>Title</label>
          </div>

          <div className="home__form--group">
            <input type="text" ref={inputName} required />
              <span className="home__form--highlight"></span>
              <span className="home__form--bar"></span>
              <label>Your Name</label>
          </div>

          <div className="home__form--group">
            <input type="text" ref={inputDescription} required />
              <span className="home__form--highlight"></span>
              <span className="home__form--bar"></span>
              <label>Description</label>
          </div>

          <input type="submit"/>

        </form>
      </div>
  );
};

export default Home;
