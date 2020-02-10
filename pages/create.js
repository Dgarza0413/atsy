import React, { useState, useEffect } from 'react';
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INITIAL_PRODUCT = {
    name: '',
    price: '',
    media: '',
    description: ''
}


function CreateProduct() {
    const [product, setProduct] = useState(INITIAL_PRODUCT)
    const [mediaPreview, setMediaPreview] = useState('')
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const isProduct = Object.values(product).every(el => Boolean(el))
        console.log(isProduct)
        isProduct ? setDisabled(false) : setDisabled(true)
    }, [product])

    function handleChange(event) {
        const { name, value, files } = event.target;
        if (name === "media") {
            setProduct(prevState => ({ ...prevState, media: files[0] }));
            setMediaPreview(window.URL.createObjectURL(files[0]))
        } else {
            setProduct((prevState) => ({ ...prevState, [name]: value }))
        }
    }

    async function handleImageUpload() {
        const data = new FormData()
        data.append('file', product.media)
        data.append('upload_preset', 'reactreserve')
        data.append('cloud_name', 'davidgarza')
        const response = await axios.post(process.env.CLOUDINARY_URL, data)
        const mediaUrl = response.data.url
        return mediaUrl;
    }

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            setLoading(true)
            setError('')
            const mediaUrl = await handleImageUpload();
            const url = `${baseUrl}/api/product`;
            const { name, price, description } = product;
            const payload = { name, price, description, mediaUrl }
            const response = await axios.post(url, payload)
            console.log({ response })
            setLoading(false)
            setProduct(INITIAL_PRODUCT)
            setSuccess(true)
        } catch (error) {
            catchErrors(error, setError)
            console.error("Error", error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Header as="h2" block>
                <Icon name="add" color="orange" />
                Create New Create Product
      </Header>
            <Form
                loading={loading}
                success={success}
                onSubmit={handleSubmit}
                error={Boolean(error)}
            >
                <Message
                    error
                    header="oops!"
                    content={error}
                />
                <Message
                    success
                    icon="check"
                    header="Success!"
                    content="Product has been created"
                />
                <Form.Group widths="equal">
                    <Form.Field
                        control={Input}
                        name="name"
                        label="Name"
                        placeholder="Name"
                        value={product.name}
                        onChange={handleChange}
                    />
                    <Form.Field
                        control={Input}
                        name="price"
                        label="Price"
                        placeholder="Price"
                        min="0.00"
                        step="0.01"
                        type="number"
                        value={product.price}
                        onChange={handleChange}
                    />
                    <Form.Field
                        control={Input}
                        name="media"
                        label="Media"
                        type="file"
                        accept="image/*"
                        content="Select Image"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Image src={mediaPreview} rounded centered size="small" />
                <Form.Field
                    control={TextArea}
                    name="description"
                    label="Description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />
                <Form.Field
                    control={Button}
                    disabled={disabled || loading}
                    color="blue"
                    icon="pencil alternate"
                    content="Submit"
                    type="submit"
                    onChange={handleChange}
                />
            </Form>
        </>
    );
}

export default CreateProduct;
