import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Alert  } from 'antd';
import { Button, Form } from 'semantic-ui-react'
import { useState } from 'react';
//import UploadPhoto from './UploadPhoto';
// import { useHistory } from "react-router-dom";

const EditProfile = ({user, setUser,setUsers, users}) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [age, setAge] = useState(user.age);
    const [location, setLocation] = useState(user.location);
    const [profile_photo, setPhoto] = useState(user.profile_photo);
    let navigate = useNavigate();

//Edit Profile
    const updateUser = {
    name: name || "",
    email: email || "",
    password: password || "",
    age: age || "",
    location: location || "",
    profile_photo: profile_photo || "",
    };

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updateUser),
        })
        .then((r) => r.json())
        .then((data) => {
            setUser(data);
            // console.log(data);
        });
        <Alert message="Your Profile was updated!" type="success" />;
    }
//Delete Profile
        function handleDelete() {
            fetch(`users/${user.id}`, {
            method: "DELETE"
            })
            .then(()=>{
            setUser(null)
            navigate('/')
            })
        }

    return (
    <div className="userUpdate"> 
    {/* <UploadPhoto/> // component to upload a photo*/} 
    <Form onSubmit={handleSubmit}>
        <Form.Field>
            <label>Name</label>
            <input placeholder=' Name' value={updateUser.name} onChange={(e) => setName(e.target.value)} />
        </Form.Field>
        <Form.Field>
            <label>Email</label>
            <input placeholder='Email' value={updateUser.email} onChange={(e) => setEmail(e.target.value)}  />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input placeholder='Password' value={[updateUser.password]} onChange={(e) => setPassword(e.target.value)}  />
        </Form.Field>
        <Form.Field>
            <label>Age</label>
            <input placeholder='Age' value={updateUser.age} onChange={(e) => setAge(e.target.value)}   />
        </Form.Field>
        <Form.Field>
            <label>Location</label>
            <input placeholder='Location' value={updateUser.location} onChange={(e) => setLocation(e.target.value)}   />
        </Form.Field>
        <Form.Field>
            <label>Profile Photo</label>
            <input placeholder='Profile Photo' value={updateUser.profile_photo} onChange={(e) => setPhoto(e.target.value)}  />
        </Form.Field>
        <Button type='submit'>Save</Button>
    </Form>
    <br></br>
    <Button type='submit' onClick={handleDelete}>Delete Account</Button>
    </div>
    )
}

export default EditProfile