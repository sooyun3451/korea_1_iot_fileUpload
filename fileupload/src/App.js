import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [ reqData, setReqData ] = useState({
    title: "",
    img: null
  });

  const [ member, setMember ] = useState({
    memberId: 0,
    name : "",
    profileImgPath: ""
  });

  const handleOnChange = (e) => {
    if(["img"].includes(e.target.name)){
      const files = Array.from(e.target.files);
      console.log(files[0]);
      setReqData(prev => ({
        ...prev,
        [e.target.name]: files[0]
      }));
      return;
    }
    setReqData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  }

  const handleOnSubmit = () => {
    const formData = new FormData();
    Object.entries(reqData).forEach(entry => {
      const [key, value] = entry;
      if(!!value) {
        formData.append(key, value);
      }
    });

    for(const entry of formData.entries()) {
      console.log(entry);
    }

    axios.post("http://localhost:8080/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }

    }).then(response => {
      const memberId = response.data.memberId;

      axios.get(`http://localhost:8080/api/member/${memberId}`)
      .then(response => {
        setMember({
          memberId: response.data.memberId,
          name: response.data.name,
          profileImgPath: response.data.profileImgPath
        });

      }).catch(error => {
        console.error(error);
      });

    }).catch(error => {
      console.error(error);
    });
  }

  return (
    <div className="App">
      <div>
        <label>이름: </label>
      <input type='text' name='title' onChange={handleOnChange} value={reqData.title} />
      </div>
      <div>
      <input type='file' name='img' onChange={handleOnChange} />
      </div>
      <button onClick={handleOnSubmit}>전송</button>

      <div>
        <h1>가입된 회원 정보</h1>
        <div>
          memberId: {member.memberId}
        </div>
        <div>
          name: {member.name}
        </div>
        <div>
          <img src={`http://localhost:8080/image/${member.profileImgPath}`} />
        </div>
      </div>
    </div>
  );
}

export default App;