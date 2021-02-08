import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import db from '../initFB/firebase'
import { Formik } from 'formik';

function ModalAdd() {
  const [open, setOpen] = React.useState(false)

  // db.collection("films").get().then((res) => {
  //      res.forEach((el) => {
  //              console.log(el.data());
  //          });
  //        })


  const insertFilm = (data) => {
    console.log(data)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show44444 Modal</Button>}
    >
           <Formik
       initialValues={{}}
       onSubmit={(values, actions) => {
       alert(JSON.stringify(values, null, 2));
       actions.setSubmitting(false);
       }}
     >
             {props => (
               <>
      <Modal.Header>Добавить новый фильм</Modal.Header>
      <Modal.Content image>
        <Modal.Description>

            <Form onSubmit={props.handleSubmit}>
              <Form.Field>
                <label>Название</label>
                <input
                  name="title"
                  onChange={props.handleChange}
                  value={props.values.title}
                  placeholder='Название' />
              </Form.Field>
              <Form.Field>
                <label>Дата выпуска</label>
                <input type='date' 
                  name="year"
                  onChange={props.handleChange}
                  value={props.values.year}
                  placeholder='Год выпуска' />
              </Form.Field>
              <Form.Field>
                <label>Рижиссёр</label>
                <input 
                  name="author"
                  onChange={props.handleChange}
                  value={props.values.author}
                  placeholder='Рижиссёр' />
              </Form.Field>
              <Form.Field>
                <label>Продолжительность</label>
                <input 
                  type="time" 
                  name="duration"
                  onChange={props.handleChange}
                  value={props.values.duration}
                  placeholder='Продолжительность' />
              </Form.Field>
              <Form.Field>
                <label>Рейтинг</label>
                <input 
                  name="rating"
                  onChange={props.handleChange}
                  value={props.values.rating}
                  placeholder='Рейтинг' />
              </Form.Field>
              <Form.Field>
              </Form.Field>
              <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          type="submit"
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          //   onClick={() => (setOpen(false), insertFilm())}
          positive
        />
      </Modal.Actions>
            </Form>
    
        </Modal.Description>
      </Modal.Content>

      </>
          )}
      </Formik>
    </Modal>
  )
}

export default ModalAdd