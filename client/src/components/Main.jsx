import React, { useState } from "react";
import { Link } from 'react-router-dom';
import s from '../styles/Main.module.css';

const FIELDS = {
    NAME: 'name',
    ROOM: 'room',
}
const Main = () => {

    const { NAME, ROOM } = FIELDS;
    const [values, setValues] = useState({ [NAME]: '', [ROOM]: '' });
    console.log(values)

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    }

    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <h1 className={s.heading}>Join</h1>

                <form className={s.form}>
                    <div className={s.group}>
                        <input
                            className={s.input}
                            placeholder="name"
                            type='text'
                            name="name"
                            value={values[NAME]}
                            autoComplete="off"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className={s.group}>
                        <input
                            className={s.input}
                            placeholder="Room"
                            type='text'
                            name="room"
                            value={values[ROOM]}
                            autoComplete="off"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <Link to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}>
                        <button type="submit" className={s.button}>
                            Sign In
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    )

};

export default Main;