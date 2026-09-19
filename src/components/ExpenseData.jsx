import { useContext } from 'react'
import { ExpenseContext } from "../context/Expense"
import { Button, Form, Row, Col,Table } from 'react-bootstrap';
import { useState } from 'react';

const Expense = () => {
  const { expenseList, editExpense, deleteExpense } = useContext(ExpenseContext);

  const [expenseQuery, setExpenseQuery] = useState({
    sort: "",
    title: "",
    category: "",
    type: ""
  });

  const handleChange = (field, e) => {
    setExpenseQuery((prev) => {
      return {
        ...prev,
        [field]: e.target.value
      }
    })
  }
  const clearFilter = () => {
    setExpenseQuery({
      sort: "",
      title: "",
      category: "",
      type: ""
    })
  }


  // const filterList = expenseList.filter((e)=>{
  //   const titleSearch = expenseList.includes().toLowerCase()
  //   return titleSearch
  // })

  return (
    <div>
      <div className='pt-3'>
        <Form >
          <Row className="mb-3">
            <Col lg={4}>
              <Form.Group controlId="validationFormik01">
                <Form.Control
                  type="text"
                  name="title"
                  placeholder='search title'
                  value={expenseQuery.title}
                  onChange={(e) => handleChange("title", e)}
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Select aria-label="category" onChange={(e) => handleChange("category", e)} value={expenseQuery.category}>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="general">General</option>
              <option value="hospital">Hospital</option>
              <option value="school">School</option>
              <option value="clg">clg</option>
              <option value="other">other</option>
            </Form.Select>
            </Col>
            <Col lg={4}>
              <Form.Select aria-label="type" onChange={(e) => handleChange("type", e)} value={expenseQuery.type}>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </Form.Select>
            </Col>
            <Form.Select value={expenseQuery.sort} onChange={(e) => handleChange("sort", e)} >
              <option value="">Sort By </option>

              <option value="asc">Title a-z</option>

              <option value="desc">Title z-a </option>

              <option value="Money asc">Amount Low-High</option>

              <option value="Money desc">Amount High-Low </option>
            </Form.Select>
          </Row>
          <Button variant='success' onClick={clearFilter}>clear</Button>
        </Form>
      </div>
      <div className='pt-3'>
        <Table striped hover>
        <thead className='p-3'>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody >
          {
            expenseList.map((l, index) => (
              <tr key={l.id}>
                <td>{index + 1}</td>
                <td>{l.title}</td>
                <td>{l.description}</td>
                <td>{l.category}</td>
                <td>{l.amount}</td>
                <td>{l.date}</td>
                <td>{l.type}</td>
                <td><Button onClick={() => editExpense(l.id)} variant='primary'>edit</Button></td>
                <td><Button onClick={() => deleteExpense(l.id)} variant='primary'>delete</Button></td>
              </tr>
            )
            )
          }
        </tbody>
      </Table>
      </div>

    </div>
  )
}

export default Expense
