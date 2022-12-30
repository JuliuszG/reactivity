import { Dimmer, Loader } from "semantic-ui-react"

interface LoadingProps {
    inverted?: boolean,
    content?: string
}

export const Loading = ({ inverted = true, content = "Loading..." } : LoadingProps) => {
  return (
    <Dimmer active inverted={inverted}>
        <Loader content={content} />
    </Dimmer>
  )
}
