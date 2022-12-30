import { Button, Card, Image } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"

interface ActivityDetailsProps {
    activity: Activity,
    cancelSelectedActivity: () => void,
    openEditForm: (id?: string) => void
}

export const ActivityDetails = ({ activity, cancelSelectedActivity, openEditForm }: ActivityDetailsProps) => {
  return (
    <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span>{activity.date}</span>
      </Card.Meta>
      <Card.Description>
        {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Button.Group widths='2'>
            <Button basic color="blue" content="Edit" onClick={() => openEditForm(activity.id)}/>
            <Button basic color="grey" content="Cancel" onClick={cancelSelectedActivity} />
        </Button.Group>
    </Card.Content>
  </Card>
  )
}
