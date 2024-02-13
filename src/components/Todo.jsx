import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Completed from './Completed'
import PendingView from './PendingView'
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addTodoListAPI, getAllTodoListAPI } from '../services/allAPI';

function Todo() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     //state hold all todo list
     const [alllist, SetAllList] = useState([])

     //state hold the value of adding data
     const [addtodo, SetAddTodo] = useState({
        title:"",
        description:""
     })
     console.log(addtodo);

     //here is the function to handle add todo list
     const addTodolist = async (e) => {
        e.preventDefault();
    
        const { title, description} = addtodo;
    
        if (!title || !description) {
          alert('Please fill in the form completely');
        } else {
          const result = await addTodoListAPI(addtodo);
         //see alert in postive case
          if (result.status === 200) {
            alert('Todo list is succesffully added');
            SetAddTodo({
                title: "",
                description: ""
            });
            //alert throw an error
          } else {
            alert(result.response.data);
          }
        }
      };

      //here is the function to get all todolist details
      const getALLTodo = async () => {
        const result = await getAllTodoListAPI();
        console.log(result.data);
        SetAddTodo(result.data);
      };
      
      //here get all list when render
      useEffect(()=>{
        getALLTodo();
      },[]);
    

  return (
    <div>
        <Row className='mt-5 shadow p-3'>
            <div className='d-flex justify-content-center align-items-center  flex-column mt-3'>
                <h1 className='' style={{color:'#CCCCFF'}}>Todo List</h1>
                <Button className='btn btn-warning btn-lg' onClick={handleShow}>Add</Button>
            </div>
        </Row>
        <Row className='mt-5'>
            <Col lg={6} sm={12}>
                {addtodo.length>0?
                //sent props stord name list
                    addtodo.map((item)=>(<Completed list={item}/>))
                :<p>No items to display</p>}
            </Col>
            <Col lg={6} sm={12}>
               <PendingView/>
            </Col>

        </Row>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
        <Form.Control
          placeholder="Title"
          aria-describedby="basic-addon1"
          value={addtodo.title} onChange={(e)=>SetAddTodo({...addtodo,title:e.target.value})}
        />
      </InputGroup>
            <FloatingLabel controlId="floatingTextarea2" label="Description">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          value={addtodo.description} onChange={(e)=>SetAddTodo({...addtodo,description:e.target.value})}

        />
      </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addTodolist}>
            Conform
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancle
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Todo