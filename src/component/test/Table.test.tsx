import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@testing-library/jest-dom';

import CustomTable from "../Table";  

global.fetch = jest.fn();

const queryClient = new QueryClient();

beforeEach(() => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      transacciones: [
        { hora: "10:00", columnas: [10, 20, 30], total: 60 },
        { hora: "11:00", columnas: [15, 25, 35], total: 75 },
      ],
    }),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("debe renderizar la tabla correctamente con los datos de la API", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <CustomTable />
    </QueryClientProvider>
  );

  expect(screen.getByRole("progressbar")).toBeInTheDocument();

  await waitFor(() => screen.getByText("10:00"));

  expect(screen.getByText("10:00")).toBeInTheDocument();
  expect(screen.getByText("15")).toBeInTheDocument(); 
  expect(screen.getByText("20")).toBeInTheDocument(); 
  expect(screen.getByText("30.000")).toBeInTheDocument(); 
  expect(screen.getByText("60.000")).toBeInTheDocument(); 

  expect(screen.getByText("11:00")).toBeInTheDocument();
  expect(screen.getByText("15")).toBeInTheDocument(); 
  expect(screen.getByText("25")).toBeInTheDocument(); 
  expect(screen.getByText("35.000")).toBeInTheDocument();
  expect(screen.getByText("75.000")).toBeInTheDocument(); 
});

test("muestra mensaje de error si ocurre un problema al cargar los datos", async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    json: async () => ({ message: "Error al obtener datos" }),
  });

  render(
    <QueryClientProvider client={queryClient}>
      <CustomTable />
    </QueryClientProvider>
  );
  
  

});
