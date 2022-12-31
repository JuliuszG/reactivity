import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { Loading } from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/Store";

export const ActivityForm = observer(() => {

  const {activityStore} = useStore();
  const {createActivity, editActivity, loading, loadActivity, loadingInitial} = activityStore;
  const {id} = useParams();
  const navigateTo = useNavigate()

  const { setValues, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      id: "",
      title: "",
      date: "",
      description: "",
      category: "",
      city: "",
      venue: "",
  },
    onSubmit: async (values) => { 
     if(!values.id.length) {
      await createActivity(values);
     } else {
      await editActivity(values);
     }  
     navigateTo(`/activities/${id ?? ''}`)
    },
  });


  const loadFormValues = useCallback(
    () => {
      if(id) {
        loadActivity(id)
        .then(activity => {
          activity && setValues(activity)
        })
      }
      
    },
    [id, loadActivity, setValues],
  )

  useEffect(() => {
    loadFormValues()
  }, [loadFormValues])

  if(loadingInitial) {
    return <Loading />
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={values.title}
          onChange={handleChange}
          name="title"
        />
        <Form.TextArea
          placeholder="Description"
          value={values.description}
          onChange={handleChange}
          name="description"
        />
        <Form.Input
          placeholder="Category"
          value={values.category}
          onChange={handleChange}
          name="category"
        />
        <Form.Input
          placeholder="Date"
          type="date"
          value={values.date}
          onChange={handleChange}
          name="date"
        />
        <Form.Input
          placeholder="City"
          value={values.city}
          onChange={handleChange}
          name="city"
        />
        <Form.Input
          placeholder="Venue"
          value={values.venue}
          onChange={handleChange}
          name="venue"
        />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          as={Link}
          to={`/activities/${id ?? ''}`}
        />
      </Form>
    </Segment>
  );
});
