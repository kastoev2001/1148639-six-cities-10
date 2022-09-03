import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ReactElement, ReactNode } from 'react';

type initialRoutes = string[];

type MemoryRouterWithInitialRoutesProps = {
  initialRoutes: initialRoutes,
  children?: ReactNode | undefined,
};

const MemoryRouterWithInitialRoutes = ({ initialRoutes, children }: MemoryRouterWithInitialRoutesProps) =>
  <MemoryRouter initialEntries={initialRoutes} >{children}</MemoryRouter>;

const customRender = (
  ui: ReactElement,
  initialRoutes: initialRoutes = ['/'],
  options?: RenderOptions): RenderResult =>
  render(ui, {
    wrapper: (children) =>
      <MemoryRouterWithInitialRoutes initialRoutes={initialRoutes} {...children}></MemoryRouterWithInitialRoutes>,
    ...options
  });

export * from '@testing-library/react';
export { customRender as render };
