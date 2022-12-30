import { Button, Container, Menu } from "semantic-ui-react";

interface NavbarProps {
  openEditForm: (id?: string) => void
}

export function Navbar({ openEditForm } : NavbarProps) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={() => openEditForm()} />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
