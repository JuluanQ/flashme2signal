import React, {useContext, useState} from 'react';

import '../assets/css/connectionCard.css'
import { Form, Input, Button, message } from 'antd';
import {UserContext} from "../context/UserContext";
import { useNavigate } from 'react-router-dom';


const ConnectionCard = () => {
    let navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const success = () => {
        message.success('Connexion réussie');
    };

    const error = () => {
        message.error('Utilisateur inconnu');
    };

    const onFinish = () => {
        if (document.querySelector("input[type=text]").value === "admin" && document.querySelector("input[type=password]").value === "admin") {
            setUser("admin");
            navigate("/");
            success();
        } else {
            error();
        }
    };

    return (
        <>
            <div className="connectionCardContainer">
                <h3 className='connexionHeader'>Connexion</h3>
                <div className="formContainer">
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            className="username"
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer un nom utilisateur!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className="password"
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer un mot de passe!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >

                            <Button className="submitConnexion" type="primary" htmlType="submit">
                                Se connecter
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default ConnectionCard;