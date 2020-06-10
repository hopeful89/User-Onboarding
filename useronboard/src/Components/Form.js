import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import axios from 'axios'

const UserForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 30%;
`;

const UserLabel = styled.label`
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    p {
        color: red;
        margin: 0;
        font-size: 10px;
    }
`;

const ServerPost = styled.div`
    color: blue;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 20%;
`;

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        terms: '',
    });

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        terms: '',
    })

    const [post, setPost] = useState()

    useEffect(()=>{
        formSchema.isValid(formData).then(isFormValid => {
          setButtonDisabled(!isFormValid)
        })
      }, [formData])

      const formSchema = yup.object().shape({
        name: yup.string().required('Name is a required field'),
        email: yup.string().email("Must be a valid email address").required("Must include email"),
        password:   yup.string().required('No password provided.')
                    .min(8, 'Password is too short - should be 8 chars minimum.')
                    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        terms: yup.boolean().oneOf([true], 'You must accept the terms')
      })



    const validateChanges = (e) => {
        yup.reach(formSchema, e.target.name).validate((e.target.type === 'checkbox' ? e.target.checked : e.target.value)).then(isValid => {
            setError({
                ...error,
                [e.target.name]: "",
            })
        }).catch(err => {
            // console.log(err)
            setError({
                ...error,
                [e.target.name]: err.errors[0]
            })
        })
    }

    const onChange = (e) => {
        e.persist()
        const newFormData = {
            ...formData,
            [e.target.name]: (e.target.name === 'terms' ? e.target.checked : e.target.value)
        }

        validateChanges(e)
        setFormData(newFormData)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://reqres.in/api/users', formData).then(res => {
            setPost(res.data)
            console.log(res.data)
            setFormData({
                name: '',
                email: '',
                password: '',
                terms: '',
            })
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <UserForm onSubmit={handleSubmit}>
            <UserLabel htmlFor="name">Name:
                <input name="name" id="name" onChange={onChange} value={formData.name}></input>
                {error.name.length > 0 ? <p>error: {error.name}</p> : null}
            </UserLabel>
            <UserLabel htmlFor="email">Email:
                <input name="email" id="email" onChange={onChange} value={formData.email}></input>
                {error.email.length > 0 ? <p>error: {error.email}</p> : null}
            </UserLabel>
            <UserLabel htmlFor="password">Password:
                <input type="password" name="password" id="password" onChange={onChange} value={formData.password}></input>
                {error.password.length > 0 ? <p>error: {error.password}</p> : null}
            </UserLabel>
            <UserLabel htmlFor="terms">
                Terms of Service
                <input type="checkbox" name="terms" id="terms" onChange={onChange} ></input>
                {error.terms.length > 0 ? <p>error: {error.terms}</p> : null}
                
            </UserLabel>
            <button disabled={buttonDisabled}>Submit</button>
            <ServerPost>{JSON.stringify(post, null,2)}</ServerPost>
        </UserForm> 
    )
}

export default Form;