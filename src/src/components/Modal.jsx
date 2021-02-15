import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import db from '../initFB/firebase';
import { Formik } from 'formik';
import '../css/modal.css';
import * as Yup from 'yup';
import errorMessages from '../errorMessages';

function ModalWindow(props) {
  // Хук для открытия и закрытия модального окна
  const [open, setOpen] = React.useState(false);

  // Объект, необходимый для установки в форму начальных значений
  // Используется при редактировании, что позволяет открыть модальное окно с уже заполненными полями
  // В случае с добавлением, то начальные значения будут отсутствовать
  const data = props.data?props.data:{};
  const initialValues = {
    title: data.title,
    year: data.year,
    author: data.author,
    duration: data.duration,
    rating: data.rating,
  }

  // Далее определяются кнопки и подписи для редактирования и добавления
  const btn = props.edit?<i class="edit link icon"></i>:<Button className={'add green'}>Добавить</Button>;
  const modalTitle = props.edit?'Изменить фильм':'Добавить новый фильм';
  const btnContent = props.edit?'Изменить':'Добавить';
  
  // Функция для обновления БД
  const insertFilm = (values) => {
    // Изменение записи
    if (props.edit) {
      values.rating = values.rating.match(/\d\.0+/)?values.rating[0]:values.rating;
      db.collection("films").doc(props.data.id).update(values).then((docRef) => {
        props.data.reload();
        console.log("Document successfully updated!");
      }).catch((error) => {
        console.error("Error updating document: ", error);
      });
    } 
    // Добавление записи
    else {
      // Устанавливается время добавления записи, для возможности их сортировки от новых к старым
      values.dateAdd = new Date();
      values.rating = values.rating.match(/\d\.0+/)?values.rating[0]:values.rating;
      db.collection("films").add(values).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
      props.onClose();
    }
    setOpen(false);
  }


  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={btn}>
      <Formik
        initialValues={initialValues}
        // Валидация введенных значений
        validationSchema={Yup.object().shape({
          title: Yup.string()
          .trim()
          .min(1)
          .required('Required'),
          year: Yup.date()
          .max(new Date())
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
            <Modal.Header>{modalTitle}</Modal.Header>
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
                        content={btnContent}
                        labelPosition='right'
                        icon='checkmark'
                        positive
                        onClick={errorMessages}
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

export default ModalWindow;