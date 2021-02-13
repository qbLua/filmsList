import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import db from '../initFB/firebase';
import { Formik } from 'formik';
import '../css/modal.css';
import * as Yup from 'yup';

function ModalAdd(props) {
  const [open, setOpen] = React.useState(false);
  const insertFilm = (values) => {
    values.dateAdd = new Date();
    values.rating = values.rating.match(/\d\.0+/)?values.rating[0]:values.rating;
    db.collection("films").add(values).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
    setOpen(false);
    props.onClose();
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button className={'add green'}>Добавить</Button>}>
      <Formik
        initialValues={{}}
        validationSchema={Yup.object().shape({
          title: Yup.string()
          .trim()
          .min(1)
          .required('Required'),
          year: Yup.date()
          .min(new Date(1895, 2, 22))
          .max(new Date(Date.now() + 86400000))
          .required('Required'),
          author: Yup.string()
          .trim()
          .min(0)
          .required('Required'),
          duration: Yup.string()
          .notOneOf(
            ['00:00']
          )
          .min(1)
          .required('Required'),
          rating: Yup.number()
          .min(1)
          .max(10)
          .integer()
          .required('Required'),
          })}
        onSubmit={(values) => insertFilm(values)}>
        {props => (
          <>
            <Modal.Header>Добавить новый фильм</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Form className={'ui form'} onSubmit={props.handleSubmit}>
                  <Form.Field>
                    <label>Название</label>
                    <input
                      name="title"
                      onChange={props.handleChange}
                      value={props.values.title}
                      placeholder='Название' />
                  </Form.Field>
                  <Form.Field>
                    <label>Дата выхода</label>
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
                    <div className={'btnFlex'}>
                      <Button color='black' onClick={() => setOpen(false)}>Cancel</Button>
                      <Button
                        type="submit"
                        content="Add"
                        labelPosition='right'
                        icon='checkmark'
                        positive
                      />
                    </div>
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