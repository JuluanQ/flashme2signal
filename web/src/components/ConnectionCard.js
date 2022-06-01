import React, {useContext, useState} from 'react';

import '../assets/css/connectionCard.css'
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";


const ConnectionCard = () => {
    let navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    message.config({
        duration: 2,
        maxCount: 1,
        rtl: true,
    });

    const onFinish = () => {
        if (document.querySelector("input[type=text]").value === "admin" && document.querySelector("input[type=password]").value === "admin") {
            setCookie('user', 'admin', { path: '/' });
            navigate("/");
            message.success('Connexion réussie');
        } else {
            message.error('Utilisateur inconnu');
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