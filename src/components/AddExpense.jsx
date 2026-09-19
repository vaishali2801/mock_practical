import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useContext, useEffect } from 'react';
import { ExpenseContext } from "../context/Expense"

const AddExpense = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
    amount: 0,
    date: "",
    type: "debit",
  })

  const { addExpense, editValue } = useContext(ExpenseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(input);
    console.log("data", input);
    setInput({
      title: "",
      description: "",
      category: "",
      amount: 0,
      date: "",
      type: "debit",
    });
  }
  const handleChange = (field, e) => {
    setInput((prev) => {
      return {
        ...prev,
        [field]: e.target.value
      }
    })
  }

  useEffect(() => {
    if (editValue) {
      setInput(editValue);
    }
  }, [editValue]);

  return (
    <div className='mt-2'>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="validationFormik01">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={input.title}
                onChange={(e) => handleChange("title", e)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="validationFormik02">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={input.description}
                onChange={(e) => handleChange("description", e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
          <Form.Label>Category</Form.Label>
            <Form.Select aria-label="category" onChange={(e) => handleChange("category", e)} value={input.category}>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="general">General</option>
              <option value="hospital">Hospital</option>
              <option value="school">School</option>
              <option value="clg">clg</option>
              <option value="other">other</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Group controlId="validationFormik03">
              <Form.Label>amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter amount"
                name="amount"
                value={input.amount}
                onChange={(e) => handleChange("amount", e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col md={6}>
            <Form.Group controlId="validationFormik04">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="date"
                name="date"
                value={input.date}
                onChange={(e) => handleChange("date", e)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Label>type</Form.Label>
            <Form.Select onChange={(e) => handleChange("type", e)} value={input.type}>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </Form.Select>
          </Col>
        </Row>
        <Button type="submit" variant='success'>{editValue ? "Update" : "Add"}</Button>
      </Form>
    </div>
  )
}

export default AddExpense
