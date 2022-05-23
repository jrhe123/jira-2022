import React from "react";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as Logo } from "assets/logo.svg";
import { Dropdown, Menu } from "antd";

export const AuthenticatedApp = () => {
  const { user, logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <Logo width={"10rem"} />
          <h3>project</h3>
          <h3>user</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <a onClick={logout}>logout</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      {/* <Nav>nav</Nav> */}
      <Main>
        <ProjectListScreen />
      </Main>
      {/* <Aside>aside</Aside> */}
      {/* <Footer>footer</Footer> */}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-areas: "header header" "main main";
  /* grid-template-rows: 6rem 1fr 6rem; */
  /* grid-template-columns: 20rem 1fr 20rem; */
  /* grid-template-areas: "header header header" "nav main aside" "footer footer footer"; */
  height: 100vh;
  /* grid-gap: 1rem; */
`;
/**
 * flex / grid
 * 1. two-dimensional: use grid
 * 2. one-dimensional: use flex
 * 3. fixed number of content: grid
 * 4. dynamic number of content: flex
 */
const Header = styled(Row)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
// const Nav = styled.nav`
//   grid-area: nav;
// `;
// const Aside = styled.aside`
//   grid-area: aside;
// `;
// const Footer = styled.footer`
//   grid-area: footer;
// `;
