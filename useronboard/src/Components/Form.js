import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import * as yup from 'yup';

const UserForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const UserLabel = styled.label`
    display: flex;
    justify-content: space-between;
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

    useEffect(()=>{
        formSchema.isValid(formData).then(isFormValid => {
          setButtonDisabled(!isFormValid)
        })
      }, [formData])

      const formSchema = yup.object().shape({
        name: yup.string().required('Name is a required field'),
        email: yup.string().email("Must be a valid email address").required("Must include email"),
        password: yup.string().min(6, `You must have 6 characters`).required(),
        terms: yup.boolean().oneOf([true])
      })



    const validateChanges = (e) => {
        yup.reach(formSchema, e.target.name).validate(e.target.value).then(isValid => {
            setError({
                ...error,
                [e.target.name]: ""
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
                <input type="checkbox" name="terms" id="terms" onChange={onChange}></input>
                Terms of Service
            </UserLabel>
            <button disabled={buttonDisabled}>Submit</button>
        </UserForm> 
    )
}

export default Form;