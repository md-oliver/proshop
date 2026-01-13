import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    Form,
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice.js";

const ProductScreen = () => {
    const { id: productId } = useParams();
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        data: product,
        isLoading,
        isError,
    } = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Message varient="danger">
                    {isError?.data?.message || isError.error}
                </Message>
            ) : (
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} ${
                                        product.numReviews === 1
                                            ? "review"
                                            : "reviews"
                                    }`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>$ {product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            <strong>
                                                {product.countInStock > 0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty:</Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(event) =>
                                                        setQty(
                                                            Number(
                                                                event.target
                                                                    .value
                                                            )
                                                        )
                                                    }>
                                                    {[
                                                        ...Array(
                                                            product.countInStock
                                                        ).keys(),
                                                    ].map((item) => (
                                                        <option
                                                            key={item + 1}
                                                            value={item + 1}>
                                                            {item + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCartHandler}
                                        className="btn-block"
                                        type="button"
                                        disabled={product.countInStock === 0}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default ProductScreen;
