import React, { useRef } from "react";
import "./Home.css"
import { createGroup }   from "../../api/groups";
import { useNavigate }   from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const inputName = useRef<HTMLInputElement>(null)
  const inputDescription = useRef<HTMLInputElement>(null)
  const inputUsername = useRef<HTMLInputElement>(null)

  type FormDataType = {
    name: string,
    username: string
    description: string,
  }

  const formData: FormDataType = { name: "", username: "", description: "" }

  const onSubmitHandler = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.name = inputName.current?.value || ""
    formData.username = inputUsername.current?.value || ""
    formData.description = inputDescription?.current?.value || ""
    console.log(formData)
    //Form submission happens here
    const response = await createGroup(formData)
    navigate(`/group/${response.newGroup.id}`)
  }
  return (
      <div className="home__container">

        <div className="home__title">create your No-Hasba</div>

        <form className="home__form" onSubmit={ onSubmitHandler }>

          <div className="home__form--group">
            <input type="text" ref={ inputName } required/>
            <span className="home__form--highlight"></span>
            <span className="home__form--bar"></span>
            <label>Title</label>
          </div>

          <div className="home__form--group">
            <input type="text" ref={ inputUsername } required/>
            <span className="home__form--highlight"></span>
            <span className="home__form--bar"></span>
            <label>Your Name</label>
          </div>

          <div className="home__form--group">
            <input type="text" ref={ inputDescription } required/>
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
