import React from 'react';
import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header() {
  const router = useRouter();
  const user = false;

  function isActive(route) {
    return route === router.pathname;
  }

  return (
    <Menu fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item header active={isActive('/')}>
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ marginRight: '1em' }}
            />
            React Reserve
          </Menu.Item>
        </Link>
        <Link href="/cart">
          <Menu.Item header active={isActive('/cart')}>
            <Icon name="cart" size="large" />
            cart
          </Menu.Item>
        </Link>

        {user && (
          <Link href="/create">
            <Menu.Item header active={isActive('/create')}>
              <Icon name="add square" size="large" />
              create
            </Menu.Item>
          </Link>
        )}

        {user ? (
          <>
            <Link href="/account">
              <Menu.Item header active={isActive('/account')}>
                <Icon name="user" size="large" />
                account
              </Menu.Item>
            </Link>

            <Menu.Item header>
              <Icon name="sign out" size="large" />
              logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/login">
              <Menu.Item header active={isActive('/login')}>
                <Icon name="sign in" size="large" />
                login
              </Menu.Item>
            </Link>

            <Link href="/signup">
              <Menu.Item header active={isActive('/signup')}>
                <Icon name="signup" size="large" />
                signup
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  );
}

export default Header;
