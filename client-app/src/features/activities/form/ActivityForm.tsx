import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";

export const ActivityForm = observer(() => {

  const {activityStore} = useStore();
  const {selectedActivity, closeForm, createActivity, editActivity, loading} = activityStore;

  const initialValues = useMemo(
    () =>
      selectedActivity ?? {
        id: "",
        title: "",
        date: "",
        description: "",
        category: "",
        city: "",
        venue: "",
      },
    [selectedActivity]
  );

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
     if(!values.id.length) {
      createActivity(values);
     } else {
      editActivity(values);
     }
    },
  });

  return (
    <Segment clearing>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          name="title"
        />
        <Form.TextArea
          placeholder="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          name="description"
        />
        <Form.Input
          placeholder="Category"
          value={formik.values.category}
          onChange={formik.handleChange}
          name="category"
        />
        <Form.Input
          placeholder="Date"
          type="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          name="date"
        />
        <Form.Input
          placeholder="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          name="city"
        />
        <Form.Input
          placeholder="Venue"
          value={formik.values.venue}
          onChange={formik.handleChange}
          name="venue"
        />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
});
